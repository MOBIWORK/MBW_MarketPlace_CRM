# Copyright (c) 2022, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt
from __future__ import unicode_literals
import click
import frappe

from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

def before_install():
	pass

def after_install():
	add_default_lead_statuses()
	add_default_deal_statuses()
	add_default_communication_statuses()
	add_property_setter()
	add_email_template_custom_fields()
	add_default_salutation()
	add_default_gender()
	frappe.db.commit()

def add_default_lead_statuses():
	statuses = {
		"Mới": {
			"color": "gray",
			"position": 1,
		},
		"Đã liên hệ": {
			"color": "orange",
			"position": 2,
		},
		"Đang chăm sóc": {
			"color": "blue",
			"position": 3,
		},
		"Chất lượng": {
			"color": "green",
			"position": 4,
		},
		"Không chất lượng": {
			"color": "red",
			"position": 5,
		},
		"Trùng": {
			"color": "purple",
			"position": 6,
		},
	}

	for status in statuses:
		if frappe.db.exists("CRM Lead Status", status):
			continue

		doc = frappe.new_doc("CRM Lead Status")
		doc.lead_status = status
		doc.color = statuses[status]["color"]
		doc.position = statuses[status]["position"]
		doc.insert()

def add_default_deal_statuses():
	statuses = {
		"Chất lượng": {
			"color": "gray",
			"position": 1,
		},
		"Demo": {
			"color": "orange",
			"position": 2,
		},
		"Đề xuất/Báo giá": {
			"color": "blue",
			"position": 3,
		},
		"Đàm phán": {
			"color": "yellow",
			"position": 4,
		},
		"Sẵn sàng chốt": {
			"color": "purple",
			"position": 5,
		},
		"Thắng": {
			"color": "green",
			"position": 6,
		},
		"Thua": {
			"color": "red",
			"position": 7,
		},
	}

	for status in statuses:
		if frappe.db.exists("CRM Deal Status", status):
			continue

		doc = frappe.new_doc("CRM Deal Status")
		doc.deal_status = status
		doc.color = statuses[status]["color"]
		doc.position = statuses[status]["position"]
		doc.insert()

def add_default_communication_statuses():
	statuses = ["Mở", "Đã trả lời"]

	for status in statuses:
		if frappe.db.exists("CRM Communication Status", status):
			continue

		doc = frappe.new_doc("CRM Communication Status")
		doc.status = status
		doc.insert()

def add_property_setter():
	if not frappe.db.exists("Property Setter", {"name": "Contact-main-search_fields"}):
		doc = frappe.new_doc("Property Setter")
		doc.doctype_or_field = "DocType"
		doc.doc_type = "FCRM Contact"
		doc.property = "search_fields"
		doc.property_type = "Data"
		doc.value = "email_id"
		doc.insert()

def add_email_template_custom_fields():
	if not frappe.get_meta("Email Template").has_field("enabled"):
		click.secho("* Installing Custom Fields in Email Template")

		create_custom_fields(
			{
				"Email Template": [
					{
						"default": "0",
						"fieldname": "enabled",
						"fieldtype": "Check",
						"label": "Enabled",
						"insert_after": "",
					},
					{
						"fieldname": "reference_doctype",
						"fieldtype": "Link",
						"label": "Doctype",
						"options": "DocType",
						"insert_after": "enabled",
					},
				]
			}
		)

		frappe.clear_cache(doctype="Email Template")

def add_default_salutation():
	click.secho("init default salutation")
	salutations_sys = ["Prof", "Master", "Miss", "Madam", "Mrs", "Dr", "Mx", "Ms", "Mr"]
	salutations = frappe.db.get_list('Salutation',
		fields = ['name', 'salutation']
	)
	is_edited = False
	for salutation in salutations:
		click.secho(f"Dòng 159 : {salutation.salutation}")
		click.secho(f"Dòng 160 : {salutation.salutation is not salutations_sys}")
		if salutation.salutation is not salutations_sys:
			is_edited = True
			break
	if not is_edited:
		try:
			for salutation_sys in salutations_sys:
				click.secho(f"Dòng 163 {salutation_sys}")
				click.secho("Dòng 164 {salutation_sys is not ["Mr", "Madam", "Prof", "Miss"]}")
				if salutation_sys is not ["Mr", "Madam", "Prof", "Miss"]:
					salutation_doc = frappe.get_doc('Salutation', salutation_sys)
					salutation_doc.delete()
			for salutation_sys in ["Mr", "Madam", "Prof", "Miss"]:
				if frappe.db.exists("Salutation", salutation_sys):
					continue
				
				salutation_doc = frappe.new_doc("Salutation")
				salutation_doc.salutation = salutation_sys
				salutation_doc.insert()
			frappe.db.commit()
		except Exception as e:
			pass

def add_default_gender():
	click.secho("init default gender")
	genders_sys = ["Prefer not to say", "Non-Conforming", "Genderqueer", "Transgender", "Other", "Female", "Male"]
	genders = frappe.db.get_list('Gender',
		fields = ['name', 'gender']
	)
	is_edited = False
	for gender in genders:
		if gender.gender is not genders_sys:
			is_edited = True
			break
	if not is_edited:
		try:
			for gender_sys in genders_sys:
				click.secho(f"Dòng 192 {gender_sys}")
				if gender_sys is not ["Female", "Male", "Other"]:
					gender_doc = frappe.get_doc('Gender', gender_sys)
					gender_doc.delete()
			for gender_sys in ["Female", "Male", "Other"]:
				if frappe.db.exists("Gender", gender_sys):
					continue
				
				gender_doc = frappe.new_doc("Gender")
				gender_doc.gender = gender_sys
				gender_doc.insert()
			frappe.db.commit()
		except Exception as e:
			pass
