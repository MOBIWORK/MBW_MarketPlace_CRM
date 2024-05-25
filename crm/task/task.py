import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import cint
from frappe.utils.data import add_to_date, get_datetime, now_datetime


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
                notification_text_task = f"""
                    <div class="mb-2 leading-5 text-gray-600">
                        <span>Chỉ còn 30 phút để hoàn thành công việc</span>
                        <span class="font-medium text-gray-900"> {doc_task.title}</span>
                    </div>
                """
                values_notify_task = frappe._dict(
                    doctype="CRM Notification",
                    from_user=doc_task.assigned_to,
                    to_user=doc_task.assigned_to,
                    type="Task",
                    message= _('Chỉ còn {0} để hoàn thành công việc {1}').format('30 phút', doc_task.title),
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

