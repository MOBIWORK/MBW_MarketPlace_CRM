import frappe
from frappe import _
from bs4 import BeautifulSoup
from crm.api.contact import get_linked_deals
import json

def notify_owner_asign_contact(self, method):
    try:
        reference_doctype = ""
        owner = self.owner
        if "CRM-DEAL" in self.name:
            reference_doctype = "CRM Deal"
            tasker = self.deal_owner
        elif "CRM-LEAD" in self.name:
            reference_doctype = "CRM Lead"
            tasker = self.lead_owner
        doctype = reference_doctype
        if doctype.startswith("CRM "):
            doctype = doctype[4:].lower()
        user_info = frappe.get_doc('User', owner)
        if tasker is not None and tasker != "":
            if owner != tasker and tasker != frappe.session.user:
                notification_text_owner = f"""
                    <div class="mb-2 leading-5 text-gray-600">
                        <span class="font-medium text-gray-900">{ user_info.username }</span>
                        <span>{ _('đã giao cho bạn làm {0} Owner ').format(doctype.capitalize()) }</span>
                        <span class="font-medium text-gray-900"> {self.name}</span>
                    </div>
                """
                value_notify_owner = frappe._dict(
                    doctype="CRM Notification",
                    from_user=owner,
                    to_user=tasker,
                    type="Task",
                    message= _('{0} đã giao cho bạn làm {1} Owner {2}').format(user_info.username, doctype.capitalize(), self.name),
                    notification_text=notification_text_owner,
                    notification_type_doctype=reference_doctype,
                    notification_type_doc=self.name,
                    reference_doctype=reference_doctype,
                    reference_name=self.name
                )
                if frappe.db.exists("CRM Notification", value_notify_owner) is None:
                    frappe.get_doc(value_notify_owner).insert()
        if self.assign_to is not None and self.assign_to != "":
            assignTo = json.loads(self.assign_to)
            for assign in assignTo:
                if assign is not None and assign != "" and assign != tasker and assign != owner and assign != frappe.session.user:
                    notify_assign_text = f"""
                        <div class="mb-2 leading-5 text-gray-600">
                            <span class="font-medium text-gray-900">{ user_info.username }</span>
                            <span>{ _('đã giao cho bạn phụ trách {0}').format(doctype.capitalize()) }</span>
                            <span class="font-medium text-gray-900"> {self.name}</span>
                        </div>
                    """
                    value_notify_assign = frappe._dict(
                        doctype="CRM Notification",
                        from_user=owner,
                        to_user=assign,
                        type="Task",
                        message= _('{0} đã giao cho bạn phụ trách {1} {2}').format(user_info.username, doctype.capitalize(), self.name),
                        notification_text=notify_assign_text,
                        notification_type_doctype=reference_doctype,
                        notification_type_doc=self.name,
                        reference_doctype=reference_doctype,
                        reference_name=self.name
                    )
                    if frappe.db.exists("CRM Notification", value_notify_assign) is None:
                        frappe.get_doc(value_notify_assign).insert()    
    except Exception as e:
        pass

def notify_unassign_contact(self, method):
    owner = self.owner
    user_info = frappe.get_doc('User', owner)
    if self.name is not None:
        reference_doctype = ""
        if "CRM-DEAL" in self.name:
            reference_doctype = "CRM Deal"
        elif "CRM-LEAD" in self.name:
            reference_doctype = "CRM Lead"
        if frappe.db.exists(reference_doctype, self.name) is not None:
            doc_old = frappe.get_doc(reference_doctype, self.name)
            assign_to_old = json.loads(doc_old.assign_to)
            assign_to_new = json.loads(self.assign_to)
            for item in assign_to_old:
                if item not in assign_to_new and owner != item and item != frappe.session.user:
                    doctype = reference_doctype
                    if doctype.startswith("CRM "):
                        doctype = doctype[4:].lower()
                    notification_text_unassign = f"""
                        <div class="mb-2 leading-5 text-gray-600">
                            <span class="font-medium text-gray-900">{ user_info.username }</span>
                            <span>{ _('đã bỏ gán bạn khỏi {0}').format(doctype.capitalize()) }</span>
                            <span class="font-medium text-gray-900"> {self.name}</span>
                        </div>
                    """
                    values_unasign = frappe._dict(
                        doctype="CRM Notification",
                        from_user=owner,
                        to_user=item,
                        type="Task",
                        message= _('{0} đã bỏ gán bạn khỏi {1} {2}').format(user_info.username, doctype.capitalize(), self.name),
                        notification_text=notification_text_unassign,
                        notification_type_doctype=reference_doctype,
                        notification_type_doc="",
                        reference_doctype=reference_doctype,
                        reference_name="",
                    )
                    if frappe.db.exists("CRM Notification", values_unasign) is None:
                        frappe.get_doc(values_unasign).insert()
            for item in assign_to_new:
                if item not in assign_to_old and owner != item and item != frappe.session.user:
                    doctype = reference_doctype
                    if doctype.startswith("CRM "):
                        doctype = doctype[4:].lower()
                    notification_text = f"""
                        <div class="mb-2 leading-5 text-gray-600">
                            <span class="font-medium text-gray-900">{ user_info.username }</span>
                            <span>{ _('đã giao cho bạn phụ trách {0}').format(doctype.capitalize()) }</span>
                            <span class="font-medium text-gray-900"> {self.name}</span>
                        </div>
                    """
                    values_asign = frappe._dict(
                        doctype="CRM Notification",
                        from_user=owner,
                        to_user=item,
                        type="Task",
                        message= _('{0} đã giao cho bạn phụ trách {1} {2}').format(user_info.username, doctype.capitalize(), self.name),
                        notification_text=notification_text,
                        notification_type_doctype=reference_doctype,
                        notification_type_doc=self.name,
                        reference_doctype=reference_doctype,
                        reference_name=self.name,
                    )
                    if frappe.db.exists("CRM Notification", values_asign) is None:
                        frappe.get_doc(values_asign).insert()

def notify_unasign_contact_owner(self, method):
    print("Dòng 139 ", self)
    try:
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
            if frappe.db.exists(reference_doctype, self.name) is not None:
                doctype = reference_doctype
                if doctype.startswith("CRM "):
                    doctype = doctype[4:].lower()
                doc_old = frappe.get_doc(reference_doctype, self.name)
                tasker_old = doc_old.get(field_tasker_old)
                user_info = frappe.get_doc('User', owner)
                user_info_new = frappe.get_doc('User', tasker_new)
                if tasker_new != tasker_old:
                    if tasker_old is not None and tasker_old != "" and tasker_old != owner and tasker_old != frappe.session.user:
                        notify_unasign_owner = f"""
                            <div class="mb-2 leading-5 text-gray-600">
                                <span class="font-medium text-gray-900">{ user_info.username }</span>
                                <span>{ _('đã đổi {0} Owner của {0} {1} sang {2}').format(doctype.capitalize(), self.name, user_info_new.username) }</span>
                            </div>
                        """
                        value_unasign_owner = frappe._dict(
                            doctype="CRM Notification",
                            from_user=owner,
                            to_user=tasker_old,
                            type="Task",
                            message= _('{0} đã đổi {1} Owner của {1} {2} sang {3}').format(user_info.username, doctype.capitalize(), self.name, user_info_new.username),
                            notification_text=notify_unasign_owner,
                            notification_type_doctype=reference_doctype,
                            notification_type_doc="",
                            reference_doctype=reference_doctype,
                            reference_name=""
                        )
                        if frappe.db.exists("CRM Notification", value_unasign_owner) is None:
                            frappe.get_doc(value_unasign_owner).insert()
                    if tasker_new is not None and tasker_new != "" and tasker_new != owner and tasker_new != frappe.session.user:
                        notify_assign_owner = f"""
                            <div class="mb-2 leading-5 text-gray-600">
                                <span class="font-medium text-gray-900">{ user_info.username }</span>
                                <span>{ _('đã giao cho bạn phụ trách {0}').format(doctype.capitalize()) }</span>
                                <span class="font-medium text-gray-900"> {self.name}</span>
                            </div>
                        """
                        value_assign_owner = frappe._dict(
                            doctype="CRM Notification",
                            from_user=owner,
                            to_user=tasker_new,
                            type="Task",
                            message= _('{0} đã giao cho bạn phụ trách {1} {2}').format(user_info.username, doctype.capitalize(), self.name),
                            notification_text=notify_assign_owner,
                            notification_type_doctype=reference_doctype,
                            notification_type_doc=self.name,
                            reference_doctype=reference_doctype,
                            reference_name=self.name
                        )
                        if frappe.db.exists("CRM Notification", value_assign_owner) is None:
                            frappe.get_doc(value_assign_owner).insert()
                assign_to_old = json.loads(doc_old.assign_to)
                assign_to_new = json.loads(self.assign_to)
                for item in assign_to_old:
                    if item not in assign_to_new and owner != item and item != frappe.session.user:
                        doctype = reference_doctype
                        if doctype.startswith("CRM "):
                            doctype = doctype[4:].lower()
                        notification_text_unassign = f"""
                            <div class="mb-2 leading-5 text-gray-600">
                                <span class="font-medium text-gray-900">{ user_info.username }</span>
                                <span>{ _('đã bỏ gán bạn khỏi {0}').format(doctype.capitalize()) }</span>
                                <span class="font-medium text-gray-900"> {self.name}</span>
                            </div>
                        """
                        values_unasign = frappe._dict(
                            doctype="CRM Notification",
                            from_user=owner,
                            to_user=item,
                            type="Task",
                            message= _('{0} đã bỏ gán bạn khỏi {1} {2}').format(user_info.username, doctype.capitalize(), self.name),
                            notification_text=notification_text_unassign,
                            notification_type_doctype=reference_doctype,
                            notification_type_doc="",
                            reference_doctype=reference_doctype,
                            reference_name="",
                        )
                        if frappe.db.exists("CRM Notification", values_unasign) is None:
                            frappe.get_doc(values_unasign).insert()
                for item in assign_to_new:
                    if item not in assign_to_old and owner != item and item != frappe.session.user:
                        doctype = reference_doctype
                        if doctype.startswith("CRM "):
                            doctype = doctype[4:].lower()
                        notification_text = f"""
                            <div class="mb-2 leading-5 text-gray-600">
                                <span class="font-medium text-gray-900">{ user_info.username }</span>
                                <span>{ _('đã giao cho bạn phụ trách {0}').format(doctype.capitalize()) }</span>
                                <span class="font-medium text-gray-900"> {self.name}</span>
                            </div>
                        """
                        values_asign = frappe._dict(
                            doctype="CRM Notification",
                            from_user=owner,
                            to_user=item,
                            type="Task",
                            message= _('{0} đã giao cho bạn phụ trách {1} {2}').format(user_info.username, doctype.capitalize(), self.name),
                            notification_text=notification_text,
                            notification_type_doctype=reference_doctype,
                            notification_type_doc=self.name,
                            reference_doctype=reference_doctype,
                            reference_name=self.name,
                        )
                        if frappe.db.exists("CRM Notification", values_asign) is None:
                            frappe.get_doc(values_asign).insert()
    except Exception as e:
        pass
    
def notify_change_info_lead(self, method):
    try:
        if self.name is not None:
            if frappe.db.exists('CRM Lead', self.name) is not None:
                doc_old = frappe.get_doc("CRM Lead", self.name)
                owner = self.owner
                tasker = self.lead_owner
                field_change = ""
                value_old = ""
                value_new = ""
                type_action = "update"
                if doc_old.get('lead_owner') is None or doc_old.get('lead_owner') == "":
                    if doc_old.get('lead_owner') != self.get('lead_owner') and tasker != frappe.session.user:
                        owner_info = frappe.get_doc('User', owner)
                        notification_text = f"""
                            <div class="mb-2 leading-5 text-gray-600">
                                <span class="font-medium text-gray-900">{ owner_info.username }</span>
                                <span>{ _('đã giao cho bạn làm Lead Owner cho Lead')}</span>
                                <span class="font-medium text-gray-900"> {self.name}</span>
                            </div>
                        """
                        values = frappe._dict(
                            doctype="CRM Notification",
                            from_user=owner,
                            to_user=tasker,
                            type="Task",
                            message= _('{0} đã giao cho bạn làm Lead Owner cho Lead {1}').format(owner_info.username, self.name),
                            notification_text=notification_text,
                            notification_type_doctype="CRM Lead",
                            notification_type_doc=self.name,
                            reference_doctype="CRM Lead",
                            reference_name=self.name,
                        )
                        if frappe.db.exists("CRM Notification", values):
                            return
                        frappe.get_doc(values).insert()
                else:
                    owner_info = frappe.get_doc('User', owner)
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
                    if field_change == "organization":
                        field_change = _('Organization')
                    elif field_change == "website":
                        field_change = _('Website')
                    elif field_change == "territory":
                        field_change = _('Territory')
                    elif field_change == "industry":
                        field_change = _('Industry')
                    elif field_change == "job_title":
                        field_change = _('Job Title')
                    elif field_change == "source":
                        field_change = _('Source')
                    elif field_change == "salutation":
                        field_change = _('Salutation')
                    elif field_change == "first_name":
                        field_change = _('First Name')
                    elif field_change == "email":
                        field_change = _('Email')
                    elif field_change == "mobile_no":
                        field_change = _('Mobile No')
                    if type_action == "add":
                        notification_text = f"""
                            <div class="mb-2 leading-5 text-gray-600">
                                <span class="font-medium text-gray-900"> { owner_info.username }</span>
                                <span>{ _(' đã thêm ') }</span>
                                <span class="font-medium text-gray-900"> {field_change}</span>
                                <span>{ _(' thành ') }</span>
                                <span class="font-medium text-gray-900"> {value_new}</span>
                            </div>
                        """
                        message = _('{0} đã thêm {1} thành {2}'.format(owner_info.username, field_change, value_new))
                    elif type_action == "update":
                        if value_old == "" and value_new == "":
                            return
                        notification_text = f"""
                            <div class="mb-2 leading-5 text-gray-600">
                                <span class="font-medium text-gray-900"> { owner_info.username }</span>
                                <span>{ _(' đã thay đổi  ') }</span>
                                <span class="font-medium text-gray-900"> {field_change}</span>
                                <span>{ _(' từ ') }</span>
                                <span class="font-medium text-gray-900"> {value_old}</span>
                                <span>{ _(' thành ') }</span>
                                <span class="font-medium text-gray-900"> {value_new}</span>
                            </div>
                        """
                        message = _('{0} đã thay đổi {1} từ {2} thành {3}'.format(owner_info.username, field_change, value_old, value_new))
                        if value_new == "":
                            notification_text = f"""
                                <div class="mb-2 leading-5 text-gray-600">
                                    <span class="font-medium text-gray-900"> { owner_info.username }</span>
                                    <span>{ _(' đã xóa thông tin  ') }</span>
                                    <span class="font-medium text-gray-900"> {field_change}</span>
                                </div>
                            """
                            message = _('{0} đã xóa thông tin {1}'.format(owner_info.username, field_change))
                    if owner != tasker and tasker != frappe.session.user:
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
    except Exception as e:
        pass

def notify_change_info_deal(self, method):
    try:
        if self.name is not None:
            if frappe.db.exists('CRM Deal', self.name) is not None:
                doc_old = frappe.get_doc("CRM Deal", self.name)
                owner = self.owner
                tasker = self.deal_owner
                field_change = ""
                value_old = ""
                value_new = ""
                type_action = "update"
                if doc_old.get('deal_owner') is None or doc_old.get('deal_owner') == "":
                    if doc_old.get('deal_owner') != self.get('deal_owner') and tasker != frappe.session.user:
                        owner_info = frappe.get_doc('User', owner)
                        notification_text = f"""
                            <div class="mb-2 leading-5 text-gray-600">
                                <span class="font-medium text-gray-900">{ owner_info.username }</span>
                                <span>{ _('đã giao cho bạn làm Deal Owner cho Deal')}</span>
                                <span class="font-medium text-gray-900"> {self.name}</span>
                            </div>
                        """
                        values = frappe._dict(
                            doctype="CRM Notification",
                            from_user=owner,
                            to_user=tasker,
                            type="Task",
                            message= _('{0} đã giao cho bạn làm Deal Owner cho Deal {1}').format(owner_info.username, self.name),
                            notification_text=notification_text,
                            notification_type_doctype="CRM Deal",
                            notification_type_doc=self.name,
                            reference_doctype="CRM Deal",
                            reference_name=self.name,
                        )
                        if frappe.db.exists("CRM Notification", values):
                            return
                        frappe.get_doc(values).insert()
                else:
                    owner_info = frappe.get_doc('User', owner)
                    arr_field_check = ["organization", "website", "territory", "annual_revenue", "close_date", "probability", "next_step"]
                    for field_check in arr_field_check:
                        if self.get(field_check) != doc_old.get(field_check):
                            field_change = field_check
                            value_old = doc_old.get(field_check)
                            value_new = self.get(field_check)
                            if doc_old.get(field_check) is None or doc_old.get(field_check) == "":
                                type_action = "add"
                    notification_text = ""
                    message = ""
                    if field_change == "organization":
                        field_change = _('Organization')
                    elif field_change == "website":
                        field_change = _('Website')
                    elif field_change == "territory":
                        field_change = _('Territory')
                    elif field_change == "annual_revenue":
                        field_change = _('Amount')
                    elif field_change == "close_date":
                        field_change = _('Close Date')
                    elif field_change == "probability":
                        field_change = _('Probability')
                    elif field_change == "next_step":
                        field_change = _('Next Step')
                    if type_action == "add":
                        notification_text = f"""
                            <div class="mb-2 leading-5 text-gray-600">
                                <span class="font-medium text-gray-900"> { owner_info.username }</span>
                                <span>{ _(' đã thêm ') }</span>
                                <span class="font-medium text-gray-900"> {field_change}</span>
                                <span>{ _(' thành ') }</span>
                                <span class="font-medium text-gray-900"> {value_new}</span>
                            </div>
                        """
                        message = _('{0} đã thêm {1} thành {2}'.format(owner_info.username, field_change, value_new))
                    elif type_action == "update":
                        if value_old == "" and value_new == "":
                            return
                        notification_text = f"""
                            <div class="mb-2 leading-5 text-gray-600">
                                <span class="font-medium text-gray-900"> { owner_info.username }</span>
                                <span>{ _(' đã thay đổi  ') }</span>
                                <span class="font-medium text-gray-900"> {field_change}</span>
                                <span>{ _(' từ ') }</span>
                                <span class="font-medium text-gray-900"> {value_old}</span>
                                <span>{ _(' thành ') }</span>
                                <span class="font-medium text-gray-900"> {value_new}</span>
                            </div>
                        """
                        message = _('{0} đã thay đổi {1} từ {2} thành {3}'.format(owner_info.username, field_change, value_old, value_new))
                        if value_new == "":
                            notification_text = f"""
                                <div class="mb-2 leading-5 text-gray-600">
                                    <span class="font-medium text-gray-900"> { owner_info.username }</span>
                                    <span>{ _(' đã xóa thông tin  ') }</span>
                                    <span class="font-medium text-gray-900"> {field_change}</span>
                                </div>
                            """
                            message = _('{0} đã xóa thông tin {1}'.format(owner_info.username, field_change))
                    if owner != tasker and tasker != frappe.session.user:
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
    except Exception as e:
        pass

def notify_change_contact_deal(self, method):
    if self.name is not None:
        deals = get_linked_deals(self.name)
        arr_deal_owners = []
        for deal in deals:
            if deal.get('deal_owner') not in arr_deal_owners:
                arr_deal_owners.append(deal.get('deal_owner'))
        for deal_owner in arr_deal_owners:
            if deal_owner != self.get('owner') and deal_owner != frappe.session.user:
                owner_info = frappe.get_doc('User', self.get('owner'))
                notification_text = f"""
                    <div class="mb-2 leading-5 text-gray-600">
                        <span class="font-medium text-gray-900"> { owner_info.username }</span>
                        <span>{ _(' đã cập nhật thông tin cho liên hệ ') }</span>
                        <span class="font-medium text-gray-900"> {self.name}</span>
                    </div>
                """
                message = _('{0} đã cập nhật thông tin cho liên hệ {1}'.format(owner_info.username, self.name))
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

