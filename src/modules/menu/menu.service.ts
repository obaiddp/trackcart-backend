import { prisma } from '../../lib/prisma';
import { Category } from '../../generated/prisma/client';

// ======= For Customer


/*
read sinle menu items
read by category wise
* */

export async function getAllMenuItems() {
	return prisma.menuItem.findMany({
		include: { variations: true }
	})
}

export async function getByCategory(category: Category) {
    return prisma.menuItem.findMany({
        where: { category, available: true },
        include: { variations: true }
    });
}

// ======= For Restaurant

/*

Let say restaurant manager manages the menu items

- create he menuItem{
	- name
	- price
	- category
	- picture		<--------
	- discounted price 	<--------
}

- update menuItem {
	- name, price, image
}

- update menuItem {
	- availibility
}

- delete menuItem{
	- id
}

* */

export async function createMenuItem(
    name: string,
    category: Category,
    variations: { size: any; price: number }[]
) {
    return prisma.menuItem.create({
        data: {
            name,
            category,
            variations: { create: variations }
        },
        include: { variations: true }
    });
}

export async function toggleAvailability(id: number) {
    const item = await prisma.menuItem.findUnique({ where: { id } });
    if (!item) throw new Error("MenuItem not found");
    return prisma.menuItem.update({
        where: { id },
        data: { available: !item.available }
    });
}
