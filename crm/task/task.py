import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import cint
from frappe.utils.data import add_to_date, get_datetime, now_datetime
import json
from datetime import datetime
import math


class CRMReminder(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		description: DF.SmallText
		notified: DF.Check
		remind_at: DF.Datetime
		reminder_docname: DF.DynamicLink | None
		reminder_doctype: DF.Link | None
		user: DF.Link
	# end: auto-generated types

	@staticmethod
	def clear_old_logs(days=30):
		from frappe.query_builder import Interval
		from frappe.query_builder.functions import Now
		table = frappe.qb.DocType("CRM Reminder")
		frappe.db.delete(table, filters=(table.remind_at < (Now() - Interval(days=days))))

	def validate(self):
		self.user = frappe.session.user
		if get_datetime(self.remind_at) < now_datetime():
			frappe.throw(_("Reminder cannot be created in past."))

def send_reminders():
    # Ensure that we send all reminders that might be before next job execution.
	job_freq = cint(frappe.get_conf().scheduler_interval) or 240
	upper_threshold = add_to_date(now_datetime(), seconds=job_freq, as_string=True, as_datetime=True)
	lower_threshold = add_to_date(now_datetime(), hours=-1, as_string=True, as_datetime=True)

	pending_reminders = frappe.get_all(
		"CRM Reminder",
		filters=[
			("remind_at", "<=", upper_threshold),
			("remind_at", ">=", lower_threshold),  # dont send too old reminders if failed to send
			("notified", "=", 0),
		],
		pluck="name",
	)

	for reminder_name in pending_reminders:
		send_notify_for_reminder(reminder_name)

def send_notify_for_reminder(name):
	if name is None:
		return
	frappe.db.set_value('CRM Reminder', name, 'notified', 1)
	reminder_info = frappe.get_doc('CRM Reminder', name)
	if reminder_info.reminder_doctype == "CRM Task":
		doc_task = frappe.get_doc('CRM Task', reminder_info.reminder_docname)
		date_remind_task = doc_task.remind_task
		date_due_date = doc_task.due_date
		if isinstance(date_remind_task, datetime):
			date_remind_task = date_remind_task.strftime('%Y-%m-%d %H:%M:%S')
		if isinstance(date_due_date, datetime):
			date_due_date = date_due_date.strftime('%Y-%m-%d %H:%M:%S')
		date_remind_task = datetime.strptime(date_remind_task, '%Y-%m-%d %H:%M:%S')
		date_due_date = datetime.strptime(date_due_date, '%Y-%m-%d %H:%M:%S')
		if date_remind_task <= date_due_date:
			remaining_time = cal_remaining_time(date_remind_task, date_due_date)
			notification_text_task = f"""
				<div class="mb-2 leading-5 text-gray-600">
					<span>Chỉ còn {remaining_time} để hoàn thành công việc</span>
					<span class="font-medium text-gray-900"> {doc_task.title}</span>
				</div>
			"""
			message = f'Chỉ còn {remaining_time} để hoàn thành công việc {doc_task.title}'
			values_notify_task = frappe._dict(
				doctype="CRM Notification",
				from_user=doc_task.assigned_to,
				to_user=doc_task.assigned_to,
				type="Remind",
				message=message,
				notification_text=notification_text_task,
				notification_type_doctype="CRM Task",
				notification_type_doc="",
				reference_doctype="CRM Task",
				reference_name="",
			)
			if frappe.db.exists("CRM Notification", values_notify_task) is None:
				frappe.get_doc(values_notify_task).insert()

def cal_remaining_time(start_time, end_time):
	remaining_time = end_time - start_time
	days = remaining_time.days
	seconds = remaining_time.seconds
	hours = seconds // 3600
	minutes = (seconds % 3600) // 60
	remaining_seconds = seconds % 60
	if days >= 1:
		return f"{days} ngày"
	elif hours >= 1:
		return f"{hours} giờ"
	elif minutes >= 1:
		return f"{minutes} phút"
	else:
		return f"{remaining_seconds} giây"
