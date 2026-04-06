import { prisma } from "../../lib/prisma";
import { Type, Status } from "../../generated/prisma/client";

export async function getAllOrders() {
    return prisma.order.findMany({
        include: {
            items: {
                include: {
                    menuItem: true,
                    menuVariation: true
                }
            }
        }
    });
}

export async function createOrder(
    type: Type,
    items: { menuItemId: number; menuVariationId: number; quantity: number }[]
) {
    return prisma.order.create({
        data: {
            type,
            status: "PENDING",
            items: { create: items }
        },
        include: { items: true }
    });
}

export async function updateOrderStatus(id: number, status: Status) {
    return prisma.order.update({
        where: { id },
        data: { status }
    });
}

export async function togglePriority(id: number) {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) throw new Error("Order not found");
    return prisma.order.update({
        where: { id },
        data: { priority: !order.priority }
    });
}

export async function getKitchenQueue() {
    return prisma.order.findMany({
        where: { status: { in: ["PENDING", "PREPARING"] } },
        orderBy: { priority: "desc" },
        include: {
            items: {
                include: { menuItem: true, menuVariation: true }
            }
        }
    });
}
