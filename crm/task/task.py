import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import cint
from frappe.utils.data import add_to_date, get_datetime, now_datetime
import json
from datetime import datetime
import math


class Reminder(Document):
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

		table = frappe.qb.DocType("Reminder")
		frappe.db.delete(table, filters=(table.remind_at < (Now() - Interval(days=days))))

	def validate(self):
		self.user = frappe.session.user
		if get_datetime(self.remind_at) < now_datetime():
			frappe.throw(_("Reminder cannot be created in past."))

	def send_reminder(self):
		if self.notified:
			return

		self.db_set("notified", 1, update_modified=False)

		try:
            if self.reminder_doctype == "CRM Task":
                doc_task = frappe.get_doc('CRM Task', self.reminder_docname)
				date_remind_task = datetime.strptime(doc_task.remind_task, '%Y-%m-%d %H:%M:%S')
				date_due_date = datetime.strptime(doc_task.due_date, '%Y-%m-%d %H:%M:%S')
				if date_remind_task <= date_due_date:
					delta = date_due_date - date_remind_task
					minutes = delta.total_seconds() / 60
					hours = delta.total_seconds() / 3600
					days = delta.days
					notification_text_task = ''
					message = ''
					if days < 1:
						if hours < 1:
							rounded_minutes = math.ceil(minutes) if minutes < 1 else math.floor(minutes)
							notification_text_task = f"""
								<div class="mb-2 leading-5 text-gray-600">
									<span>Chỉ còn {rounded_minutes} phút để hoàn thành công việc</span>
									<span class="font-medium text-gray-900"> {doc_task.title}</span>
								</div>
							"""
							message = f'Chỉ còn {rounded_minutes} phút để hoàn thành công việc {doc_task.title}'
						else:
							rounded_hours = math.ceil(hours) if hours < 1 else math.floor(hours)
							notification_text_task = f"""
								<div class="mb-2 leading-5 text-gray-600">
									<span>Chỉ còn {rounded_hours} giờ để hoàn thành công việc</span>
									<span class="font-medium text-gray-900"> {doc_task.title}</span>
								</div>
							"""
							message = f'Chỉ còn {rounded_hours} giờ để hoàn thành công việc {doc_task.title}'
					else:
						rounded_days = math.ceil(days) if days < 1 else math.floor(days)
						notification_text_task = f"""
							<div class="mb-2 leading-5 text-gray-600">
								<span>Chỉ còn {rounded_days} ngày để hoàn thành công việc</span>
								<span class="font-medium text-gray-900"> {doc_task.title}</span>
							</div>
						"""
						message = f'Chỉ còn {rounded_days} ngày để hoàn thành công việc {doc_task.title}'
					values_notify_task = frappe._dict(
						doctype="CRM Notification",
						from_user=doc_task.assigned_to,
						to_user=doc_task.assigned_to,
						type="Task",
						message= message,
						notification_text=notification_text_task,
						notification_type_doctype="CRM Task",
						notification_type_doc="",
						reference_doctype="CRM Task",
						reference_name="",
					)
					if frappe.db.exists("CRM Notification", values_notify_task) is None:
						frappe.get_doc(values_notify_task).insert()
		except Exception:
			self.log_error("Failed to send reminder")

def send_reminders():
	# Ensure that we send all reminders that might be before next job execution.
	job_freq = cint(frappe.get_conf().scheduler_interval) or 240
	upper_threshold = add_to_date(now_datetime(), seconds=job_freq, as_string=True, as_datetime=True)

	lower_threshold = add_to_date(now_datetime(), hours=-8, as_string=True, as_datetime=True)

	pending_reminders = frappe.get_all(
		"Reminder",
		filters=[
			("remind_at", "<=", upper_threshold),
			("remind_at", ">=", lower_threshold),  # dont send too old reminders if failed to send
			("notified", "=", 0),
		],
		pluck="name",
	)
	for reminder in pending_reminders:
		frappe.get_doc("Reminder", reminder).send_reminder()

