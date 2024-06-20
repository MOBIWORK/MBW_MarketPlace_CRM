# Copyright (c) 2023, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe
from frappe import _
import json
from datetime import datetime
import math

class CRMTask(Document):

	def after_insert(self):
		self.insert_remind()
		self.insert_notify()

	def on_update(self):
		self.update_remind()
	
	def before_save(self):
		self.change_notify_to_user()
	
	def insert_notify(self):
		if self.owner != self.assigned_to:
			user_info = frappe.get_doc('User', self.owner)
			notification_text = f"""
				<div class="mb-2 leading-5 text-gray-600">
					<span class="font-medium text-gray-900">{ user_info.username }</span>
					<span>{ _('đã giao cho bạn công việc')}</span>
					<span class="font-medium text-gray-900"> {self.title}</span>
				</div>
			"""
			values = frappe._dict(
				doctype="CRM Notification",
				from_user=self.owner,
				to_user=self.assigned_to,
				type="Task",
				message= _('{0} đã giao cho bạn công việc {1}').format(user_info.username, self.title),
				notification_text=notification_text,
				notification_type_doctype="CRM Task",
				notification_type_doc="",
				reference_doctype="CRM Task",
				reference_name=""
			)
			if frappe.db.exists("CRM Notification", values):
				return
			frappe.get_doc(values).insert()

	def change_notify_to_user(self):
		if frappe.db.exists('CRM Task', self.name) is None:
			return
		task_info = frappe.get_doc('CRM Task', self.name)
		user_info = frappe.get_doc('User', self.owner)
		if task_info is not None and self.owner != self.assigned_to and task_info.assigned_to != self.assigned_to:
			notification_text = f"""
				<div class="mb-2 leading-5 text-gray-600">
					<span class="font-medium text-gray-900">{ user_info.username }</span>
					<span>{ _('đã giao cho bạn công việc')}</span>
					<span class="font-medium text-gray-900"> {self.title}</span>
				</div>
			"""
			values = frappe._dict(
				doctype="CRM Notification",
				from_user=self.owner,
				to_user=self.assigned_to,
				type="Task",
				message= _('{0} đã giao cho bạn công việc {1}').format(user_info.username, self.title),
				notification_text=notification_text,
				notification_type_doctype="CRM Task",
				notification_type_doc="",
				reference_doctype="CRM Task",
				reference_name=""
			)
			if frappe.db.exists("CRM Notification", values):
				return
			frappe.get_doc(values).insert()

	def insert_remind(self):
		if self.remind_task is None or self.remind_task == '':
			return
		if self.due_date is None or self.due_date == '':
			return
		if isinstance(self.remind_task, str):
			date_remind_task = datetime.strptime(self.remind_task, '%Y-%m-%d %H:%M:%S')
		else:
			date_remind_task = self.remind_task

		if isinstance(self.due_date, str):
			date_due_date = datetime.strptime(self.due_date, '%Y-%m-%d %H:%M:%S')
		else:
			date_due_date = self.due_date
		
		if date_remind_task <= date_due_date and date_remind_task > datetime.now():
			remaining_time = self.calculate_remaining_time(date_remind_task, date_due_date)
			description = f"Chỉ còn {remaining_time} để hoàn thành công việc {self.title}"
			reminder = frappe.new_doc("Reminder")
			reminder.description = description
			reminder.remind_at = self.remind_task
			reminder.user = self.assigned_to
			reminder.reminder_doctype = "CRM Task"
			reminder.reminder_docname = self.name
			reminder.notified = 0
			reminder.insert()
			custom_field = {'id_reminder': reminder.name}
			frappe.db.set_value('CRM Task', self.name, 'custom_fields', json.dumps(custom_field))

	def update_remind(self):
		if self.remind_task is None or self.remind_task == '':
			return
		if self.due_date is None or self.due_date == '':
			return
		if isinstance(self.remind_task, str):
			date_remind_task = datetime.strptime(self.remind_task, '%Y-%m-%d %H:%M:%S')
		else:
			date_remind_task = self.remind_task

		if isinstance(self.due_date, str):
			date_due_date = datetime.strptime(self.due_date, '%Y-%m-%d %H:%M:%S')
		else:
			date_due_date = self.due_date
		if date_remind_task <= date_due_date and self.get('custom_fields') is not None and date_remind_task > datetime.now():
			obj_customer = json.loads(self.get('custom_fields'))
			id_reminder = obj_customer.get('id_reminder')
			doc_reminder = frappe.get_doc('Reminder', id_reminder)
			remaining_time = self.calculate_remaining_time(date_remind_task, date_due_date)
			description = f"Chỉ còn {remaining_time} để hoàn thành công việc {self.title}"
			doc_reminder.description = description
			doc_reminder.remind_at = self.remind_task
			doc_reminder.user = self.assigned_to
			doc_reminder.save()

	def calculate_remaining_time(self, start_time, end_time):
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
