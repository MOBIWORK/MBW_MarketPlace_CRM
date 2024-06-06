import frappe
from frappe import _
from crm.api.common import (gen_response)
import json
from frappe.desk.form.assign_to import add as assign

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
        query_lead_assign = (
            frappe.qb.from_(Lead)
            .select("*")
            .where(Lead._assign.like(f'%"{from_user}"%'))
        )
        leads_assign = query_lead_assign.run(as_dict=True)
        query_deal_assign = (
            frappe.qb.from_(Deal)
            .select("*")
            .where(Deal._assign.like(f'%"{from_user}"%'))
        )
        deals_assign = query_deal_assign.run(as_dict=True)
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
        for lead_assign in leads_assign:
            assign_to = []
            if lead_assign.assign_to is not None and lead_assign.assign_to != "":
                assign_to = json.loads(lead_assign.assign_to)
            if from_user in assign_to:
                assign_to.remove(from_user)
            if to_user not in assign_to:
                assign_to.append(to_user)
            frappe.db.set_value('CRM Lead', lead_assign.name, {
                'assign_to': json.dumps(assign_to),
                '_assign': json.dumps(assign_to)
            })
        for deal_assign in deals_assign:
            assign_to = []
            if deal_assign.assign_to is not None and deal_assign.assign_to != "":
                assign_to = json.loads(deal_assign.assign_to)
            if from_user in assign_to:
                assign_to.remove(from_user)
            if to_user not in assign_to:
                assign_to.append(to_user)
            frappe.db.set_value('CRM Deal', deal_assign.name, {
                'assign_to': json.dumps(assign_to),
                '_assign': json.dumps(assign_to)
            })
        return gen_response(200, "ok", "Thành công")
    except Exception as e:
        return gen_response(500, "error", str(e))
