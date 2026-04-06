import { MenuItem } from './menu';

interface OrderItem {
	menuItem: MenuItem;
	quantity: number;
}


interface Order {
	id: number;
	tableNumber: number;
	items: OrderItem[];
	status: "pending" | "preparing" | "served" | "paid";
	createdAt: Date;
}

// memory store
const orders: Order[] = [];

// place new order
function placeOrder(tableNumber: number, items: OrderItem[]): Order{
	const newOrder: Order = {
		id: orders.length + 1,
		tableNumber,
		items,
		status: "pending",
		createdAt: new Date()
	}
	orders.push(newOrder);
	return newOrder;
}

// update order
function updateStatus(orderId: number, status: String): order {
	const order = orders.find(item => item.id === orderId);
	
	if (!order){
		console.log("Order not found");
		return;
	}

	order.status = status;
}


// calculate totalBill of Order
function calculateTotalBill(order: Order): number {
	return order.items.reduce((total, orderItem) => {
		return total + (orderItem.quantity * orderItem.menuItem.price);
	}, 0) 
}

// showall Orders 
function showAllOrders(): void {
	orders.forEach( order => {
			const orderTotal = calculateTotalBill(order);
			console.log(`Total: ${orderTotal}`);
			console.log(`${order.tableNumber} | ${order.status} | ${order.createdAt}`);
			order.items.forEach(item => {
				console.log(`${item.menuItem.name} || ${item.menuItem.price} || ${item.menuItem.category}`)
			})
		}
	)
}

export {Order, OrderItem, placeOrder, updateStatus, calculateTotalBill, showAllOrders}
