// src/menu.ts
export interface MenuItem {
    id: number;
    name: string;
    price: number;
    category: "food" | "drink";
    available: boolean;
}

export const menu: MenuItem[] = [];

export function addItem(name: string, price: number, category: "food" | "drink"): void {
    const newItem: MenuItem = {
        id: menu.length + 1,
        name,
        price,
        category,
        available: true
    };
    menu.push(newItem);
}

export function showMenu(): void {
    menu.forEach(item => {
        console.log(`[${item.id}] ${item.name} - $${item.price} (${item.category})`);
    });
}
