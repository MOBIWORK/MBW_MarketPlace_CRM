# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe
from frappe import _

class CommentReaction(Document):
	def before_save(self):
		if frappe.db.exists("Comment Reaction", self.name) is None:
			comment_child = frappe.get_doc('Comment', self.id_comment)
			if frappe.session.user != comment_child.owner:
				user_info = frappe.get_doc('User', self.owner)
				notification_text = f"""
					<div class="mb-2 leading-5 text-gray-600">
						<span class="font-medium text-gray-900">{ user_info.first_name }</span>
						<span> đã bày tỏ cảm xúc về bình luận của bạn</span>
					</div>
				"""
				values_notify = frappe._dict(
					doctype="CRM Notification",
					from_user=self.owner,
					to_user=comment_child.owner,
					type="RelyComment",
					message= "",
					notification_text=notification_text,
					notification_type_doctype="Comment Reaction",
					notification_type_doc="",
					reference_doctype=comment_child.reference_doctype,
					reference_name=comment_child.reference_name,
				)
				if frappe.db.exists("CRM Notification", values_notify) is None:
					frappe.get_doc(values_notify).insert()

