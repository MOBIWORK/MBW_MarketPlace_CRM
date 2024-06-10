# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe
from frappe import _

class CommentChild(Document):
	def after_insert(self):
		owner_parent = frappe.db.get_value('Comment', self.id_comment_parent, 'owner')
		owner_child = self.owner
		if owner_child != owner_parent and owner_parent != frappe.session.user:
			user_info = frappe.get_doc('User', owner_child)
			notification_text_comment = f"""
				<div class="mb-2 leading-5 text-gray-600">
					<span class="font-medium text-gray-900">{ user_info.username }</span>
					<span>{ _('đã đề cập đến bạn trong một bình luận/phản hồi') }</span>
				</div>
			"""
			value_notify_comment = frappe._dict(
				doctype="CRM Notification",
				from_user=owner_child,
				to_user=owner_parent,
				type="RelyComment",
				message="",
				notification_text=notification_text_comment,
				notification_type_doctype="Comment Child",
				notification_type_doc="",
				reference_doctype="Comment Child",
				reference_name=""
			)
			if frappe.db.exists("CRM Notification", value_notify_comment) is None:
				frappe.get_doc(value_notify_comment).insert()


