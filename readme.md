
=== Role based access
Admin
Customer
Staff



=== Database

Order {
    id
    orderItem
    status
    createdAt
}

OrderItem {
    menuItem,
    quantity
}

MenuItem{
    id
    name,
    price,
}
