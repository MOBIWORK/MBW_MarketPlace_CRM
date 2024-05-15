import frappe
from frappe import _
from bs4 import BeautifulSoup
from crm.api.contact import get_linked_deals

def notify_asign_contact(self, method):
    reference_doctype = ""
    owner = self.owner
    tasker = ""
    if "CRM-DEAL" in self.name:
        reference_doctype = "CRM Deal"
        tasker = self.deal_owner
    elif "CRM-LEAD" in self.name:
        reference_doctype = "CRM Lead"
        tasker = self.lead_owner
    if owner != tasker:
        doctype = reference_doctype
        if doctype.startswith("CRM "):
            doctype = doctype[4:].lower()
        notification_text = f"""
            <div class="mb-2 leading-5 text-gray-600">
                <span class="font-medium text-gray-900">{ owner }</span>
                <span>{ _('đã giao cho bạn làm {0} Owner cho {0}').format(doctype.capitalize()) }</span>
                <span class="font-medium text-gray-900"> {self.name}</span>
            </div>
        """
        values = frappe._dict(
            doctype="CRM Notification",
            from_user=owner,
            to_user=tasker,
            type="Task",
            message= _('{0} đã giao cho bạn làm {1} Owner cho {1} {2}').format(owner, doctype.capitalize(), self.name),
            notification_text=notification_text,
            notification_type_doctype=reference_doctype,
            notification_type_doc=self.name,
            reference_doctype=reference_doctype,
            reference_name=self.name,
        )
        if frappe.db.exists("CRM Notification", values):
            return
        frappe.get_doc(values).insert()

def notify_unasign_contact(self, method):
    if self.name is not None:
        reference_doctype = ""
        tasker_new = ""
        tasker_old = ""
        field_tasker_old = ""
        owner = self.owner
        if "CRM-DEAL" in self.name:
            reference_doctype = "CRM Deal"
            tasker_new = self.deal_owner
            field_tasker_old = "deal_owner"
        elif "CRM-LEAD" in self.name:
            reference_doctype = "CRM Lead"
            tasker_new = self.lead_owner
            field_tasker_old = "lead_owner"
        doc_old = frappe.get_doc(reference_doctype, self.name)
        tasker_old = doc_old.get(field_tasker_old)
        if tasker_new != tasker_old:
            doctype = reference_doctype
            if doctype.startswith("CRM "):
                doctype = doctype[4:].lower()
            notification_text_assign = f"""
                <div class="mb-2 leading-5 text-gray-600">
                    <span class="font-medium text-gray-900">{ owner }</span>
                    <span>{ _('đã giao cho bạn làm {0} Owner cho {0}').format(doctype.capitalize()) }</span>
                    <span class="font-medium text-gray-900"> {self.name}</span>
                </div>
            """
            values_asign = frappe._dict(
                doctype="CRM Notification",
                from_user=owner,
                to_user=tasker_new,
                type="Task",
                message= _('{0} đã giao cho bạn làm {1} Owner cho {1} {2}').format(owner, doctype.capitalize(), self.name),
                notification_text=notification_text_assign,
                notification_type_doctype=reference_doctype,
                notification_type_doc=self.name,
                reference_doctype=reference_doctype,
                reference_name=self.name,
            )
            if frappe.db.exists("CRM Notification", values_asign) is None:
                frappe.get_doc(values_asign).insert()
            notification_text_unassign = f"""
                <div class="mb-2 leading-5 text-gray-600">
                    <span>{ doctype.capitalize() }</span>
                    <span class="font-medium text-gray-900"> { self.name }</span>
                    <span>{ _(' của bạn đã được chuyển qua ') }</span>
                    <span class="font-medium text-gray-900"> {tasker_new}</span>
                </div>
            """
            values_unasign = frappe._dict(
                doctype="CRM Notification",
                from_user=owner,
                to_user=tasker_old,
                type="Task",
                message= _('{0} {1} của bạn đã được chuyển qua {2}').format(doctype.capitalize(), self.name, tasker_new),
                notification_text=notification_text_unassign,
                notification_type_doctype=reference_doctype,
                notification_type_doc="",
                reference_doctype=reference_doctype,
                reference_name="",
            )
            if frappe.db.exists("CRM Notification", values_unasign) is None:
                frappe.get_doc(values_unasign).insert()
    
def notify_change_info_lead(self, method):
    if self.name is not None:
        doc_old = frappe.get_doc("CRM Lead", self.name)
        owner = self.owner
        tasker = self.deal_owner
        field_change = ""
        value_old = ""
        value_new = ""
        type_action = "update"
        arr_field_check = ["organization", "website", "territory", "industry", "job_title", "source", "salutation", "first_name", "email", "mobile_no"]
        for field_check in arr_field_check:
            if self.get(field_check) != doc_old.get(field_check):
                field_change = _(field_check)
                value_old = doc_old.get(field_check)
                value_new = self.get(field_check)
                if doc_old.get(field_check) is None or doc_old.get(field_check) == "":
                    type_action = "add"
        notification_text = ""
        message = ""
        if type_action == "add":
            notification_text = f"""
                <div class="mb-2 leading-5 text-gray-600">
                    <span class="font-medium text-gray-900"> { owner }</span>
                    <span>{ _(' đã thêm ') }</span>
                    <span class="font-medium text-gray-900"> {field_change}</span>
                    <span>{ _(' thành ') }</span>
                    <span class="font-medium text-gray-900"> {value_new}</span>
                </div>
            """
            message = _('{0} đã thêm {1} thành {2}'.format(owner, field_change, value_new))
        elif type_action == "update":
            notification_text = f"""
                <div class="mb-2 leading-5 text-gray-600">
                    <span class="font-medium text-gray-900"> { owner }</span>
                    <span>{ _(' đã thay đổi  ') }</span>
                    <span class="font-medium text-gray-900"> {field_change}</span>
                    <span>{ _(' từ ') }</span>
                    <span class="font-medium text-gray-900"> {value_old}</span>
                    <span>{ _(' thành ') }</span>
                    <span class="font-medium text-gray-900"> {value_new}</span>
                </div>
            """
            message = _('{0} đã thay đổi {1} từ {2} thành {3}'.format(owner, field_change, value_old, value_new))
        doc_notify = frappe._dict(
            doctype="CRM Notification",
            from_user=owner,
            to_user=tasker,
            type="Task",
            message= message,
            notification_text=notification_text,
            notification_type_doctype="CRM Lead",
            notification_type_doc=self.name,
            reference_doctype="CRM Lead",
            reference_name=self.name,
        )
        if frappe.db.exists("CRM Notification", doc_notify) is None:
            frappe.get_doc(doc_notify).insert()

def notify_change_info_deal(self, method):
    if self.name is not None:
        doc_old = frappe.get_doc("CRM Deal", self.name)
        owner = self.owner
        tasker = self.deal_owner
        field_change = ""
        value_old = ""
        value_new = ""
        type_action = "update"
        arr_field_check = ["organization", "website", "territory", "industry", "annual_revenue", "close_date", "probability", "next_step"]
        for field_check in arr_field_check:
            if self.get(field_check) != doc_old.get(field_check):
                field_change = _(field_check)
                value_old = doc_old.get(field_check)
                value_new = self.get(field_check)
                if doc_old.get(field_check) is None or doc_old.get(field_check) == "":
                    type_action = "add"
        notification_text = ""
        message = ""
        if type_action == "add":
            notification_text = f"""
                <div class="mb-2 leading-5 text-gray-600">
                    <span class="font-medium text-gray-900"> { owner }</span>
                    <span>{ _(' đã thêm ') }</span>
                    <span class="font-medium text-gray-900"> {field_change}</span>
                    <span>{ _(' thành ') }</span>
                    <span class="font-medium text-gray-900"> {value_new}</span>
                </div>
            """
            message = _('{0} đã thêm {1} thành {2}'.format(owner, field_change, value_new))
        elif type_action == "update":
            notification_text = f"""
                <div class="mb-2 leading-5 text-gray-600">
                    <span class="font-medium text-gray-900"> { owner }</span>
                    <span>{ _(' đã thay đổi  ') }</span>
                    <span class="font-medium text-gray-900"> {field_change}</span>
                    <span>{ _(' từ ') }</span>
                    <span class="font-medium text-gray-900"> {value_old}</span>
                    <span>{ _(' thành ') }</span>
                    <span class="font-medium text-gray-900"> {value_new}</span>
                </div>
            """
            message = _('{0} đã thay đổi {1} từ {2} thành {3}'.format(owner, field_change, value_old, value_new))
        doc_notify = frappe._dict(
            doctype="CRM Notification",
            from_user=owner,
            to_user=tasker,
            type="Task",
            message= message,
            notification_text=notification_text,
            notification_type_doctype="CRM Deal",
            notification_type_doc=self.name,
            reference_doctype="CRM Deal",
            reference_name=self.name,
        )
        if frappe.db.exists("CRM Notification", doc_notify) is None:
            frappe.get_doc(doc_notify).insert()

def notify_change_contact_deal(self, method):
    if self.name is not None:
        deals = get_linked_deals(self.name)
        arr_deal_owners = []
        for deal in deals:
            if deal.get('deal_owner') not in arr_deal_owners:
                arr_deal_owners.append(deal.get('deal_owner'))
        for deal_owner in arr_deal_owners:
            if deal_owner != self.get('owner'):
                notification_text = f"""
                    <div class="mb-2 leading-5 text-gray-600">
                        <span class="font-medium text-gray-900"> { self.get('owner') }</span>
                        <span>{ _(' đã cập nhật thông tin cho liên hệ ') }</span>
                        <span class="font-medium text-gray-900"> {self.name}</span>
                    </div>
                """
                message = _('{0} đã cập nhật thông tin cho liên hệ {1}'.format(self.get('owner'), self.name))
                doc_notify = frappe._dict(
                    doctype="CRM Notification",
                    from_user=self.get('owner'),
                    to_user=deal_owner,
                    type="Task",
                    message= message,
                    notification_text=notification_text,
                    notification_type_doctype="Contact",
                    notification_type_doc=self.name,
                    reference_doctype="Contact",
                    reference_name=self.name,
                )
                if frappe.db.exists("CRM Notification", doc_notify) is None:
                    frappe.get_doc(doc_notify).insert()

