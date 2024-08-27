# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe
from frappe import _

class CommentChild(Document):
	def after_insert(self):
		owner_parent = ""
		if self.reply_for is not None and self.reply_for != "":
			owner_parent = self.reply_for
		else:
			owner_parent = frappe.db.get_value('Comment', self.id_comment_parent, 'owner')
		owner_child = self.owner
		doc_commnet_parent = frappe.get_doc('Comment', self.id_comment_parent)
		if owner_child != owner_parent and owner_parent != frappe.session.user:
			user_info = frappe.get_doc('User', owner_child)
			notification_text_comment = f"""
				<div class="mb-2 leading-5 text-gray-600">
					<span class="font-medium text-gray-900">{ user_info.first_name }</span>
					<span>{ _('đã nhắc đến bạn trong một bình luận') }</span>
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
				reference_doctype=doc_commnet_parent.reference_doctype,
				reference_name=doc_commnet_parent.reference_name
			)
			if frappe.db.exists("CRM Notification", value_notify_comment) is None:
				frappe.get_doc(value_notify_comment).insert()
		doc_info = frappe.get_doc(doc_commnet_parent.reference_doctype, doc_commnet_parent.reference_name)
		to_user = ""
		dict_doc = ""
		if doc_commnet_parent.reference_doctype == "CRM Lead":
			to_user = doc_info.lead_owner
			dict_doc = "lead"
		elif doc_commnet_parent.reference_doctype == "CRM Deal":
			to_user = doc_info.deal_owner
			dict_doc = "deal"
		if to_user != owner_child and to_user != owner_parent and to_user != frappe.session.user:
			user_info = frappe.get_doc('User', owner_child)
			notification_txt_owner = f"""
				<div class="mb-2 leading-5 text-gray-600">
					<span class="font-medium text-gray-900">{ user_info.first_name }</span>
					<span>{ _('đã bình luận về ') } {dict_doc} của bạn</span>
				</div>
			"""
			value_notify_owner = frappe._dict(
				doctype="CRM Notification",
				from_user=owner_child,
				to_user=to_user,
				type="RelyComment",
				message="",
				notification_text=notification_txt_owner,
				notification_type_doctype="Comment Child",
				notification_type_doc="",
				reference_doctype=doc_commnet_parent.reference_doctype,
				reference_name=doc_commnet_parent.reference_name
			)
			if frappe.db.exists("CRM Notification", value_notify_owner) is None:
				frappe.get_doc(value_notify_owner).insert()


