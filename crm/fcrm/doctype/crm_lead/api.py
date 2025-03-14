import frappe
from frappe import _

from crm.api.doc import get_doctype_fields, get_assigned_users
from crm.fcrm.doctype.crm_form_script.crm_form_script import get_form_script

@frappe.whitelist()
def get_lead(name):
	Lead = frappe.qb.DocType("CRM Lead")

	query = frappe.qb.from_(Lead).select("*").where(Lead.name == name).limit(1)

	lead = query.run(as_dict=True)
	if not len(lead):
		frappe.throw(_("Lead not found"), frappe.DoesNotExistError)
	owner_name = lead[0].owner
	lead = lead.pop()

	lead["doctype_fields"], lead["all_fields"] = get_doctype_fields("CRM Lead", name)
	lead["doctype_fields"][0]["fields"].append({
		'label': _('Creator'),
		'name': 'owner',
		'hidden': 0,
		'reqd': 0,
		'read_only': 0,
		'doctype': 'User',
		'value': owner_name
	})
	lead["doctype"] = "CRM Lead"
	lead["_form_script"] = get_form_script('CRM Lead')
	lead["_assign"] = get_assigned_users("CRM Lead", lead.name)
	return lead
