import { Request, Response } from "express";
import * as orderService from "./order.service";
import { successResponse, errorResponse } from "../../common/responseBuilder";

export async function getOrders(req: Request, res: Response) {
    try {
        const orders = await orderService.getAllOrders();
        res.json(successResponse(orders));
    } catch (err) {
        res.status(500).json(errorResponse("Failed to fetch orders"));
    }
}

export async function placeOrder(req: Request, res: Response) {
    try {
        const { type, items } = req.body;
        const order = await orderService.createOrder(type, items);
        res.status(201).json(successResponse(order, "Order placed"));
    } catch (err) {
        res.status(500).json(errorResponse("Failed to place order"));
    }
}

export async function updateStatus(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const { status } = req.body;
        const order = await orderService.updateOrderStatus(id, status);
        res.json(successResponse(order, "Status updated"));
    } catch (err) {
        res.status(500).json(errorResponse("Failed to update status"));
    }
}

export async function togglePriority(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const order = await orderService.togglePriority(id);
        res.json(successResponse(order, "Priority toggled"));
    } catch (err) {
        res.status(500).json(errorResponse("Failed to toggle priority"));
    }
}

export async function kitchenQueue(req: Request, res: Response) {
    try {
        const queue = await orderService.getKitchenQueue();
        res.json(successResponse(queue));
    } catch (err) {
        res.status(500).json(errorResponse("Failed to fetch kitchen queue"));
    }
}
