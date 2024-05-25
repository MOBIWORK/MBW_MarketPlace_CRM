# Copyright (c) 2023, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class CRMTask(Document):

	def before_save(self):
		task_exists = frappe.get_list("CRM Task", filters={"name": self.name}, limit=1)
		if task_exists:
			#Update remind
			pass
		else:
			self.insert_remind()

	def insert_remind():
		reminder = frappe.new_doc("Reminder")
		reminder.description = "Bạn phải hoàn thành công việc"
		reminder.remind_at = self.remind_task
		reminder.user = self.assigned_to
		reminder.reminder_doctype = "CRM Task"
		reminder.reminder_docname = ""
		reminder.insert()

	
	@staticmethod
	def default_list_data():
		columns = [
			{
				'label': 'Title',
				'type': 'Data',
				'key': 'title',
				'width': '16rem',
			},
			{
				'label': 'Status',
				'type': 'Select',
				'key': 'status',
				'width': '8rem',
			},
			{
				'label': 'Priority',
				'type': 'Select',
				'key': 'priority',
				'width': '8rem',
			},
			{
				'label': 'Due Date',
				'type': 'Date',
				'key': 'due_date',
				'width': '8rem',
			},
			{
				'label': 'Remind Task',
				'type': 'Date',
				'key': 'remind_task',
				'width': '8rem',
			},
			{
				'label': 'Assigned To',
				'type': 'Link',
				'key': 'assigned_to',
				'width': '10rem',
			},
			{
				'label': 'Last Modified',
				'type': 'Datetime',
				'key': 'modified',
				'width': '8rem',
			},
		]

		rows = [
			"name",
			"title",
			"description",
			"assigned_to",
			"due_date",
			"remind_task",
			"status",
			"priority",
			"reference_doctype",
			"reference_docname",
			"modified",
		]
		return {'columns': columns, 'rows': rows}
