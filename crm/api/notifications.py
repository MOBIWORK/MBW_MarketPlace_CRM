import frappe
from frappe.query_builder import Order


@frappe.whitelist()
def get_notifications(type_notify=None):
    Notification = frappe.qb.DocType("CRM Notification")
    query = (
        frappe.qb.from_(Notification)
        .select("*")
        .where(Notification.to_user == frappe.session.user)
        .orderby("creation", order=Order.desc)
    )
    if type_notify is not None:
        if type_notify == "Comment":
            query = query.where(
                (Notification.type == 'Mention') |
                (Notification.type == 'RelyComment')
            )
        elif type_notify == "Task":
            query = query.where(Notification.type == 'Task')
        elif type_notify == "Remind":
            query = query.where(Notification.type == 'Remind')
    notifications = query.run(as_dict=True)

    _notifications = []
    for notification in notifications:
        reference_doctype = "deal"
        route_name = "Deal"
        if notification.reference_doctype == "CRM Lead":
            reference_doctype = "lead"
            route_name = "Lead"
        elif notification.reference_doctype == "Contact":
            reference_doctype = "contact"
            route_name = "Contact"
        elif notification.reference_doctype == "CRM Task":
            reference_doctype = "task"
        _notifications.append(
            {
                "name": notification.name,
                "creation": notification.creation,
                "from_user": {
                    "name": notification.from_user,
                    "full_name": frappe.get_value(
                        "User", notification.from_user, "full_name"
                    ),
                },
                "type": notification.type,
                "to_user": notification.to_user,
                "read": notification.read,
                "comment": notification.comment,
                "notification_text": notification.notification_text,
                "notification_type_doctype": notification.notification_type_doctype,
                "notification_type_doc": notification.notification_type_doc,
                "reference_doctype": reference_doctype,
                "reference_name": notification.reference_name,
                "route_name": route_name
            }
        )

    return _notifications


@frappe.whitelist()
def mark_as_read(user=None, doc=None):
    user = user or frappe.session.user
    filters = {"to_user": user, "read": False}
    notifications = []
    if doc:
        or_filters = [
            {"name": doc},
            {"notification_type_doc": doc},
        ]
        notifications = frappe.get_all("CRM Notification", filters=filters, or_filters=or_filters)
    else:
        notifications = frappe.get_all("CRM Notification", filters=filters)
    for n in notifications:
        d = frappe.get_doc("CRM Notification", n.name)
        d.read = True
        d.save()