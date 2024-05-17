import frappe
from frappe import _
from crm.api.common import (gen_response)

@frappe.whitelist(methods=["POST"])
def convert_task_customer(from_user, to_user):
    try:
        Lead = frappe.qb.DocType("CRM Lead")
        query_lead = (
            frappe.qb.from_(Lead)
            .select("*")
            .where(Lead.lead_owner == from_user)
        )
        leads = query_lead.run(as_dict=True)
        Deal = frappe.qb.DocType("CRM Deal")
        query_deal = (
            frappe.qb.from_(Deal)
            .select("*")
            .where(Deal.deal_owner == from_user)
        )
        deals = query_deal.run(as_dict=True)
        Task = frappe.qb.DocType("CRM Task")
        query_task = (
            frappe.qb.from_(Task)
            .select("*")
            .where(Task.assigned_to == from_user)
        )
        tasks = query_task.run(as_dict=True)
        for lead in leads:
            doc_lead = frappe.get_doc('CRM Lead', lead.name)
            doc_lead.lead_owner = to_user
            doc_lead.save()
        for deal in deals:
            doc_deal = frappe.get_doc('CRM Deal', deal.name)
            doc_deal.deal_owner = to_user
            doc_deal.save()
        for task in tasks:
            doc_task = frappe.get_doc('CRM Task', task.name)
            doc_task.assigned_to = to_user
            doc_task.save()
        return gen_response(200, "ok", "Thành công")
    except Exception as e:
        return gen_response(500, "error", str(e))
