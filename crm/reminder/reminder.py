import frappe

def test_reminder():
    doc_test = frappe.new_doc('Doc_Test')
    doc_test.label = "test for remind"
    doc_test.save()
