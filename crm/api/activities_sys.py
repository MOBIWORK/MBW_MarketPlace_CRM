import frappe
from frappe import _

@frappe.whitelist(methods=["POST"])
def convert_task_customer(from_user, to_user):
    pass
