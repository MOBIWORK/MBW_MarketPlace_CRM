# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class CRMNotification(Document):
    def on_update(self):
        frappe.publish_realtime("crm_notification")
        if self.read == False:
            frappe.publish_realtime("web_notification", message=self)
