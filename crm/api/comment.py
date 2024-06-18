from collections.abc import Iterable

import frappe
from frappe import _
from bs4 import BeautifulSoup

def on_insert_comment(self, method):
    print("Dòng 8 ", self.comment_type)
    notify_mentions(self)
    if self.comment_type == "Comment":
        notify_rely_comment(self)

def notify_rely_comment(doc):
    info_doc = frappe.get_doc(doc.reference_doctype, doc.reference_name)
    user_info = frappe.get_doc('User', doc.owner)
    owner_lead_deal = ""
    if doc.reference_doctype == "CRM Lead":
        owner_lead_deal = info_doc.lead_owner
    elif doc.reference_doctype == "CRM Deal":
        owner_lead_deal = info_doc.deal_owner
    owner_comment = doc.owner
    print("Dòng 22 ", owner_lead_deal, owner_comment, frappe.session.user)
    if owner_lead_deal != owner_comment and owner_lead_deal != frappe.session.user:
        doctype = doc.reference_doctype
        if doctype.startswith("CRM "):
            doctype = doctype[4:].lower()
        notification_text = f"""
            <div class="mb-2 leading-5 text-gray-600">
                <span class="font-medium text-gray-900">{ user_info.username }</span>
                <span>{ _('đã bình luận về {0}').format(doctype) }</span>
                <span> của bạn</span>
            </div>
        """
        values = frappe._dict(
            doctype="CRM Notification",
            from_user=owner_comment,
            to_user=owner_lead_deal,
            type="RelyComment",
            message=doc.content,
            notification_text=notification_text,
            notification_type_doctype="Comment",
            notification_type_doc=doc.name,
            reference_doctype=doc.reference_doctype,
            reference_name=doc.reference_name,
        )
        if frappe.db.exists("CRM Notification", values):
            return
        frappe.get_doc(values).insert()

def notify_mentions(doc):
    """
    Extract mentions from `content`, and notify.
    `content` must have `HTML` content.
    """
    content = getattr(doc, "content", None)
    if not content:
        return
    mentions = extract_mentions(content)
    for mention in mentions:
        owner = frappe.get_cached_value("User", doc.owner, "username")
        doctype = doc.reference_doctype
        if doctype.startswith("CRM "):
            doctype = doctype[4:].lower()
        notification_text = f"""
            <div class="mb-2 leading-5 text-gray-600">
                <span class="font-medium text-gray-900">{ owner }</span>
                <span>{ _('đã đề cập đến bạn trong một bình luận') }</span>
            </div>
        """
        values = frappe._dict(
            doctype="CRM Notification",
            from_user=doc.owner,
            to_user=mention.email,
            type="Mention",
            message=doc.content,
            notification_text=notification_text,
            notification_type_doctype="Comment",
            notification_type_doc=doc.name,
            reference_doctype=doc.reference_doctype,
            reference_name=doc.reference_name,
        )

        if frappe.db.exists("CRM Notification", values):
            return
        frappe.get_doc(values).insert()


def extract_mentions(html):
    if not html:
        return []
    soup = BeautifulSoup(html, "html.parser")
    mentions = []
    for d in soup.find_all("span", attrs={"data-type": "mention"}):
        mentions.append(
            frappe._dict(full_name=d.get("data-label"), email=d.get("data-id"))
        )
    return mentions

@frappe.whitelist()
def add_attachments(name: str, attachments: Iterable[str | dict]) -> None:
	"""Add attachments to the given Comment

	:param name: Comment name
	:param attachments: File names or dicts with keys "fname" and "fcontent"
	"""
	# loop through attachments
	for a in attachments:
		if isinstance(a, str):
			attach = frappe.db.get_value("File", {"name": a}, ["file_url", "is_private"], as_dict=1)
			file_args = {
				"file_url": attach.file_url,
				"is_private": attach.is_private,
			}
		elif isinstance(a, dict) and "fcontent" in a and "fname" in a:
			# dict returned by frappe.attach_print()
			file_args = {
				"file_name": a["fname"],
				"content": a["fcontent"],
				"is_private": 1,
			}
		else:
			continue

		file_args.update(
			{
				"attached_to_doctype": "Comment",
				"attached_to_name": name,
				"folder": "Home/Attachments",
			}
		)

		_file = frappe.new_doc("File")
		_file.update(file_args)
		_file.save(ignore_permissions=True)