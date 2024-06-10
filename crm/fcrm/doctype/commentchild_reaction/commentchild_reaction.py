# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe
from frappe import _

class CommentChildReaction(Document):
	def before_save(self):
		if frappe.db.exists("CommentChild Reaction", self.name) is None:
			comment_child = frappe.get_doc('Comment Child', self.id_comment)
			if comment_child.owner != frappe.session.user:
				user_info = frappe.get_doc('User', self.owner)
				notification_text = f"""
					<div class="mb-2 leading-5 text-gray-600">
						<span class="font-medium text-gray-900">{ user_info.username }</span>
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
					notification_type_doctype="CommentChild Reaction",
					notification_type_doc="",
					reference_doctype="CommentChild Reaction",
					reference_name="",
				)
				if frappe.db.exists("CRM Notification", values_notify) is None:
					frappe.get_doc(values_notify).insert()
