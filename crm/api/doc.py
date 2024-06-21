import frappe
from frappe import _
from frappe.model.document import get_controller
from frappe.model import no_value_fields
from pypika import Criterion

from crm.api.views import get_views
from crm.fcrm.doctype.crm_form_script.crm_form_script import get_form_script
from crm.api.common import (gen_response)
from frappe.utils.csvutils import get_csv_content_from_google_sheets, read_csv_content
from frappe.utils.xlsxutils import (
	read_xls_file_from_attached_file,
	read_xlsx_file_from_attached_file,
)
import json
from frappe.desk.reportview import delete_bulk

@frappe.whitelist()
def sort_options(doctype: str):
	fields = frappe.get_meta(doctype).fields
	fields = [field for field in fields if field.fieldtype not in no_value_fields]
	fields_without = ['salutation', 'last_name', 'naming_series', 'middle_name', 'image', 'converted', 'sla', 'sla_creation', 'sla_status', 'communication_status','response_by','first_response_time',
		'first_responded_on','full_name','google_contacts_id','sync_with_google_contacts','google_contacts','pulled_from_google_contacts','is_primary_contact','is_billing_contact','unsubscribed','organization_logo',
		'reference_doctype','reference_docname','custom_fields','id','recording_url','job_title','lead_name','website','assign_to']
	fields = [
		{
			"label": _(field.label),
			"value": field.fieldname,
		}
		for field in fields
		if field.label and field.fieldname and field.fieldname not in fields_without
	]

	standard_fields = [
		# {"label": "Name", "value": "name"},
		{"label": "Created On", "value": "creation"},
		{"label": "Last Modified", "value": "modified"},
		{"label": "Modified By", "value": "modified_by"},
		{"label": "Owner", "value": "owner"},
	]

	for field in standard_fields:
		field["label"] = _(field["label"])
		fields.append(field)

	return fields


@frappe.whitelist()
def get_filterable_fields(doctype: str):
	allowed_fieldtypes = [
		"Check",
		"Data",
		"Float",
		"Int",
		"Currency",
		"Dynamic Link",
		"Link",
		"Long Text",
		"Select",
		"Small Text",
		"Text Editor",
		"Text",
		"Duration",
		"Date",
		"Datetime",
	]

	c = get_controller(doctype)
	restricted_fields = []
	if hasattr(c, "get_non_filterable_fields"):
		restricted_fields = c.get_non_filterable_fields()

	res = []
	fields_without = ['salutation', 'last_name', 'naming_series', 'middle_name', 'image', 'converted', 'sla', 'sla_creation', 'sla_status', 'communication_status','response_by','first_response_time',
		'first_responded_on','full_name','google_contacts_id','sync_with_google_contacts','google_contacts','pulled_from_google_contacts','is_primary_contact','is_billing_contact','unsubscribed','organization_logo',
		'reference_doctype','reference_docname','custom_fields','id','recording_url','job_title','lead_name','website', 'assign_to']
	# append DocFields
	DocField = frappe.qb.DocType("DocField")
	doc_fields = get_fields_meta(DocField, doctype, allowed_fieldtypes, restricted_fields)
	doc_fields = [field for field in doc_fields if field.fieldname not in fields_without]
	res.extend(doc_fields)

	# append Custom Fields
	CustomField = frappe.qb.DocType("Custom Field")
	custom_fields = get_fields_meta(CustomField, doctype, allowed_fieldtypes, restricted_fields)
	custom_field_without = ['is_billing_contact']
	custom_fields = [custom_filed for custom_field in custom_fields if custom_field.fieldname not in custom_field_without]
	res.extend(custom_fields)

	# append standard fields (getting error when using frappe.model.std_fields)
	standard_fields = [
		{"fieldname": "name", "fieldtype": "Link", "label": "ID", "options": doctype},
		{
			"fieldname": "owner",
			"fieldtype": "Link",
			"label": "Created By",
			"options": "User"
		},
		{
			"fieldname": "modified_by",
			"fieldtype": "Link",
			"label": "Last Updated By",
			"options": "User",
		},
		# {"fieldname": "_user_tags", "fieldtype": "Data", "label": "Tags"},
		# {"fieldname": "_liked_by", "fieldtype": "Data", "label": "Liked By"},
		# {"fieldname": "_comments", "fieldtype": "Text", "label": "Comments"},
		{"fieldname": "_assign", "fieldtype": "Text", "label": "Assigned To"},
		{"fieldname": "creation", "fieldtype": "Datetime", "label": "Created On"},
		{"fieldname": "modified", "fieldtype": "Datetime", "label": "Last Updated On"},
	]
	for field in standard_fields:
		if (
			field.get("fieldname") not in restricted_fields and
			field.get("fieldtype") in allowed_fieldtypes
		):
			field["name"] = field.get("fieldname")
			res.append(field)

	for field in res:
		field["label"] = _(field.get("label"))

	return res

def get_fields_meta(DocField, doctype, allowed_fieldtypes, restricted_fields):
	parent = "parent" if DocField._table_name == "tabDocField" else "dt"
	return (
		frappe.qb.from_(DocField)
		.select(
			DocField.fieldname,
			DocField.fieldtype,
			DocField.label,
			DocField.name,
			DocField.options,
		)
		.where(DocField[parent] == doctype)
		.where(DocField.hidden == False)
		.where(Criterion.any([DocField.fieldtype == i for i in allowed_fieldtypes]))
		.where(Criterion.all([DocField.fieldname != i for i in restricted_fields]))
		.run(as_dict=True)
	)

@frappe.whitelist()
def get_list_data(
	doctype: str,
	filters: dict,
	order_by: str,
	page_length=20,
	page_length_count=20,
	columns=None,
	rows=None,
	custom_view_name=None,
	default_filters=None,
	searchText: str = None
):
	custom_view = False
	filters = frappe._dict(filters)
	if 'assign_to' in filters:
		del filters['assign_to']
	for key in filters:
		value = filters[key]
		if isinstance(value, list):
			if "@me" in value:
				value[value.index("@me")] = frappe.session.user
			elif "%@me%" in value:
				index = [i for i, v in enumerate(value) if v == "%@me%"]
				for i in index:
					value[i] = "%" + frappe.session.user + "%"
		elif value == "@me":
			filters[key] = frappe.session.user

	or_filters = apply_search_filter(searchText,doctype)
	if default_filters:
		default_filters = frappe.parse_json(default_filters)
		filters.update(default_filters)

	is_default = True
	if columns or rows:
		custom_view = True
		is_default = False
		columns = frappe.parse_json(columns)
		rows = frappe.parse_json(rows)

	if not columns:
		columns = [
			{"label": "Name", "type": "Data", "key": "name", "width": "16rem"},
			{"label": "Last Modified", "type": "Datetime", "key": "modified", "width": "8rem"},
		]

	if not rows:
		rows = ["name"]

	if not custom_view and frappe.db.exists("CRM View Settings", doctype):
		list_view_settings = frappe.get_doc("CRM View Settings", doctype)
		columns = frappe.parse_json(list_view_settings.columns)
		rows = frappe.parse_json(list_view_settings.rows)
		is_default = False
	elif not custom_view or is_default:
		_list = get_controller(doctype)
		if hasattr(_list, "default_list_data"):
			columns = _list.default_list_data().get("columns")
			rows = _list.default_list_data().get("rows")

	columns = [column for column in columns if column.get('key') != 'assign_to']
	# check if rows has all keys from columns if not add them
	for column in columns:
		if column.get("key") not in rows:
			rows.append(column.get("key"))
		column["label"] = _(column.get("label"))
	
	data = frappe.get_list(
		doctype,
		fields=rows,
		filters=filters,
        or_filters=or_filters,
		order_by=order_by,
		page_length=page_length,
	) or []
	fields_without = ['salutation', 'last_name', 'naming_series', 'middle_name', 'image', 'converted', 'sla', 'sla_creation', 'sla_status', 'communication_status','response_by','first_response_time',
		'first_responded_on','full_name','google_contacts_id','sync_with_google_contacts','google_contacts','pulled_from_google_contacts','is_primary_contact','is_billing_contact','unsubscribed','organization_logo',
		'reference_doctype','reference_docname','custom_fields','id','recording_url','job_title','lead_name']
	fields = frappe.get_meta(doctype).fields
	fields = [field for field in fields if field.fieldtype not in no_value_fields]
	fields = [
		{
			"label": _(field.label),
			"type": field.fieldtype,
			"value": field.fieldname,
			"options": field.options,
		}
		for field in fields
		if field.label and field.fieldname and field.fieldname not in fields_without
	]

	std_fields = [
		{"label": "Name", "type": "Data", "value": "name"},
		{"label": "Created On", "type": "Datetime", "value": "creation"},
		{"label": "Last Modified", "type": "Datetime", "value": "modified"},
		{
			"label": "Modified By",
			"type": "Link",
			"value": "modified_by",
			"options": "User",
		},
		{"label": "Assigned To", "type": "Text", "value": "_assign"},
		{"label": "Owner", "type": "Link", "value": "owner", "options": "User"},
	]

	for field in std_fields:
		if field.get('value') not in rows:
			rows.append(field.get('value'))
		if field not in fields:
			field["label"] = _(field["label"])
			fields.append(field)

	if not is_default and custom_view_name:
		is_default = frappe.db.get_value("CRM View Settings", custom_view_name, "load_default_columns")

	return {
		"data": data,
		"columns": columns,
		"rows": rows,
		"fields": fields,
		"page_length": page_length,
		"page_length_count": page_length_count,
		"is_default": is_default,
		"views": get_views(doctype),
		"total_count": len(frappe.get_list(doctype, filters=filters)),
		"row_count": len(data),
		"form_script": get_form_script(doctype),
		"list_script": get_form_script(doctype, "List"),
	}

def apply_search_filter(searchText: str, doctype=None):
    # Khởi tạo một list rỗng cho or_filters
    or_filters = []

    # Kiểm tra xem searchText có tồn tại không
    if searchText:
        # Nếu searchText tồn tại, thực hiện xử lý tạo or_filters dựa trên doctype
        if doctype == "CRM Lead":
            # Tạo các điều kiện OR cho trường "email", "first_name", "organization", "phone"
            or_filters = [
                ["email", "LIKE", f'%{searchText}%'],   
                ["first_name", "LIKE", f'%{searchText}%'],
                ["phone", "=", searchText],  
                ["mobile_no", "=", searchText]   
            ]   
        elif doctype == "CRM Deal":
            # Tạo các điều kiện OR cho trường "email", "organization", "phone"
            or_filters = [
                ["email", "LIKE", f'%{searchText}%'],
                ["organization", "LIKE", f'%{searchText}%'], 
                ["phone", "=", searchText],
                ["mobile_no", "=", searchText]  
            ]   
        elif doctype == "Contact":
            # Tạo các điều kiện OR cho trường "email", "first_name", "organization", "phone"
            or_filters = [
                ["email_id", "LIKE", f'%{searchText}%'],   
                ["first_name", "LIKE", f'%{searchText}%'],  
                ["phone", "=", searchText], 
                ["mobile_no", "=", searchText],   
            ]   
        elif doctype == "CRM Organization":
            # Tạo điều kiện OR cho trường "organization_name"
            or_filters = [
                ["organization_name", "LIKE", f'%{searchText}%']
            ] 
        elif doctype == "FCRM Note":
            # Tạo các điều kiện OR cho trường "title", "content"
            or_filters = [
                ["title", "LIKE", f'%{searchText}%'],
                ["content", "LIKE", f'%{searchText}%']
            ] 
        elif doctype == "CRM Task":
            # Tạo các điều kiện OR cho trường "title", "description"
            or_filters = [
                ["title", "LIKE", f'%{searchText}%'],
                ["description", "LIKE", f'%{searchText}%']
            ] 
        else:
            # Thêm các trường xử lý cho các doctype khác (nếu có)
            pass

    # Trả về or_filters
    return or_filters


def get_doctype_fields(doctype, name):
	not_allowed_fieldtypes = [
		"Section Break",
		"Column Break",
	]

	fields = frappe.get_meta(doctype).fields
	fields = [field for field in fields if field.fieldtype not in not_allowed_fieldtypes]

	sections = {}
	section_fields = []
	last_section = None
	doc = frappe.get_cached_doc(doctype, name)

	has_high_permlevel_fields = any(df.permlevel > 0 for df in fields)
	if has_high_permlevel_fields:
		has_read_access_to_permlevels = doc.get_permlevel_access("read")
		has_write_access_to_permlevels = doc.get_permlevel_access("write")

	for field in fields:
		if field.fieldtype == "Tab Break" and last_section:
			sections[last_section]["fields"] = section_fields
			last_section = None
			if field.read_only:
				section_fields = []
				continue
		if field.fieldtype == "Tab Break":
			if field.read_only:
				section_fields = []
				continue
			section_fields = []
			last_section = field.fieldname
			sections[field.fieldname] = {
				"label": field.label,
				"name": field.fieldname,
				"opened": True,
				"fields": [],
			}
		else:
			if field.permlevel > 0:
				field_has_write_access = field.permlevel in has_write_access_to_permlevels
				field_has_read_access = field.permlevel in has_read_access_to_permlevels
				if not field_has_write_access and field_has_read_access:
					field.read_only = 1
				if not field_has_read_access and not field_has_write_access:
					field.hidden = 1
			section_fields.append(get_field_obj(field))

	section_fields = []
	for section in sections:
		section_fields.append(sections[section])

	fields = [field for field in fields if field.fieldtype not in "Tab Break"]
	fields_meta = {}
	for field in fields:
		fields_meta[field.fieldname] = field

	return section_fields, fields_meta


def get_field_obj(field):
	obj = {
		"label": field.label,
		"type": get_type(field),
		"name": field.fieldname,
		"hidden": field.hidden,
		"reqd": field.reqd,
		"read_only": field.read_only,
		"all_properties": field,
	}

	obj["placeholder"] = "Add " + field.label + "..."

	if field.fieldtype == "Link":
		obj["placeholder"] = "Select " + field.label + "..."
		obj["doctype"] = field.options
	elif field.fieldtype == "Select" and field.options:
		obj["options"] = [{"label": option, "value": option} for option in field.options.split("\n")]

	if field.read_only:
		obj["tooltip"] = "This field is read only and cannot be edited."

	return obj


def get_type(field):
	if field.fieldtype == "Data" and field.options == "Phone":
		return "phone"
	elif field.fieldtype == "Data" and field.options == "Email":
		return "email"
	elif field.fieldtype == "Check":
		return "checkbox"
	elif field.fieldtype == "Int":
		return "number"
	elif field.fieldtype in ["Small Text", "Text", "Long Text"]:
		return "textarea"
	elif field.read_only:
		return "read_only"
	return field.fieldtype.lower()

def get_assigned_users(doctype, name):
	assigned_users = frappe.get_all(
		"ToDo",
		fields=["allocated_to"],
		filters={
			"reference_type": doctype,
			"reference_name": name,
			"status": ("!=", "Cancelled"),
		},
		pluck="allocated_to",
	)

	return list(set(assigned_users))


@frappe.whitelist()
def get_fields(doctype: str):
	not_allowed_fieldtypes = list(frappe.model.no_value_fields) + ["Read Only"]
	fields = frappe.get_meta(doctype).fields

	_fields = []

	for field in fields:
		if (
			field.fieldtype not in not_allowed_fieldtypes
			and not field.hidden
			and not field.read_only
			and not field.is_virtual
			and field.fieldname
			and field.fieldname != "assign_to"
		):
			_fields.append({
				"label": _(field.label),
				"type": field.fieldtype,
				"value": field.fieldname,
				"options": field.options,
			})

	return _fields

@frappe.whitelist(methods=["POST"])
def import_data_leads(source_leads, fields_dict):
	try:
		for lead in source_leads:
			doc_lead = frappe.new_doc('CRM Lead')
			for field_dict in fields_dict:
				if field_dict.get('field_dict') != "none":
					field_name = field_dict.get('field_dict')
					field_value = None
					if field_name == "gender":
						gender_info = frappe.db.exists('Gender', {'gender': lead.get(field_dict.get('key'))})
						if gender_info is not None:
							if isinstance(gender_info, str):
								field_value = gender_info
							else:
								field_value = gender_info.name
					elif field_name == "lead_owner":
						user_info = frappe.db.exists('User', {'email': lead.get(field_dict.get('key'))})
						if user_info is not None:
							if isinstance(user_info, str):
								field_value = user_info
							else:
								field_value = user_info.name
							#setattr(doc_lead, "assign_to", json.dumps([field_value]))
					elif field_name == "assign_to":
						print("Dòng 496 ", lead.get(field_dict.get('key')))
						print(json.loads(lead.get(field_dict.get('key'))))
						field_value = lead.get(field_dict.get('key'))
					elif field_name == "source":
						source_info = frappe.db.exists('CRM Lead Source', {'source_name': lead.get(field_dict.get('key'))})
						if source_info is not None:
							if isinstance(source_info, str):
								field_value = source_info
							else:
								field_value = source_info.Name
					elif field_name == "status":
						status_info = frappe.db.exists('CRM Lead Status', {'lead_status': lead.get(field_dict.get('key'))})
						if status_info is not None:
							if isinstance(status_info, str):
								field_value = status_info
							else:
								field_value = status_info.name
					elif field_name == "territory":
						territory_info = frappe.db.exists('CRM Territory', {'territory_name': lead.get(field_dict.get('key'))})
						if territory_info is not None:
							if isinstance(territory_info, str):
								field_value = territory_info
							else:
								field_value = territory_info.name
					elif field_name == "industry":
						industry_info = frappe.db.exists('CRM Industry', {'industry': lead.get(field_dict.get('key'))})
						if industry_info is not None:
							if isinstance(industry_info, str):
								field_value = industry_info
							else:
								field_value = industry_info.name
					else:
						field_value = lead.get(field_dict.get('key'))
					if field_value is not None and field_value != "":
						setattr(doc_lead, field_name, field_value)
			if doc_lead.status is None:
				doc_lead.status = "Mới"
			if doc_lead.assign_to is None or doc_lead.assign_to == "":
				if doc_lead.lead_owner is not None and doc_lead.lead_owner != "":
					doc_lead.assign_to = json.dumps([doc_lead.lead_owner])
			doc_lead.insert()
		return gen_response(200, "ok", "Thành công")
	except Exception as e:
		return gen_response(500, "error", str(e))

@frappe.whitelist(methods=["POST"])
def delete_items_for_leads_deals():
	try:
		items = sorted(json.loads(frappe.form_dict.get("items")), reverse=True)
		doctype = frappe.form_dict.get("doctype")
		for item in items:
			lst_task = frappe.db.get_list('CRM Task',
				filters={
					'reference_doctype': doctype,
					'reference_docname': item
				},
				fields=['custom_fields']
			)
			for item_task in lst_task:
				custom_field = item_task.custom_fields
				if custom_field is not None and custom_field != "":
					custom_field = json.loads(custom_field)
					id_reminder = custom_field.get('id_reminder')
					if id_reminder is not None and id_reminder != "":
						frappe.db.delete("Reminder", {"name": id_reminder})
			frappe.db.delete("CRM Task", {
				"reference_doctype": doctype,
				"reference_docname": item
			})
			frappe.db.delete("FCRM Note", {"reference_doctype": doctype, "reference_docname": item})
			frappe.db.delete("CRM Notification", {"reference_doctype": doctype, "reference_name": item})
		if len(items) > 10:
			frappe.enqueue("frappe.desk.reportview.delete_bulk", doctype=doctype, items=items)
		else:
			delete_bulk(doctype, items)
		return gen_response(200, "ok", "Thành công")
	except Exception as e:
		return gen_response(500, "error", str(e))

@frappe.whitelist(methods=["POST"])
def get_content_by_google_sheet(google_sheet_url):
	content = get_csv_content_from_google_sheets(google_sheet_url)
	extension = "csv"
	if content:
		return read_content(content, extension)

def read_content(content, extension):
	error_title = _("Template Error")
	if extension not in ("csv", "xlsx", "xls"):
		frappe.throw(_("Import template should be of type .csv, .xlsx or .xls"), title=error_title)
	if extension == "csv":
		data = read_csv_content(content)
	elif extension == "xlsx":
		data = read_xlsx_file_from_attached_file(fcontent=content)
	elif extension == "xls":
		data = read_xls_file_from_attached_file(content)
	return data