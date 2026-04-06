import { menu, addItem, showMenu } from './menu';
import { Order, OrderItem, placeOrder, updateStatus, calculateTotalBill, showAllOrders }  from './order';


// need to add variations in menuItems like small, medium, large
// setup menu
addItem("burger", 500,  "food");
addItem("pizza", 2000,"food");
addItem("pasta", 1000,  "food");
addItem("pepsi", 50,  "drink");

// place Order
const order = placeOrder(3, [
    { menuItem: menu[0], quantity: 2 },  // 2 Burgers
    { menuItem: menu[1], quantity: 1 },  // 1 Coke
]);

console.log("--- Menu ---");
showMenu();

console.log("\n--- Orders ---");
showAllOrders();

// update status
updateStatus(order.id, "preparing");

console.log("\n--- Updated Orders ---");
showAllOrders();
