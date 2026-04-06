import { Request, Response } from "express";
import * as menuService from "./menu.service";
import { successResponse, errorResponse } from "../../common/responseBuilder";

export async function getMenu(req: Request, res: Response) {
    try {
        const items = await menuService.getAllMenuItems();
        res.json(successResponse(items));
    } catch (err) {
	console.error(err);
        res.status(500).json(errorResponse("Failed to fetch menu"));
    }
}

export async function addMenuItem(req: Request, res: Response) {
    try {
        const { name, category, variations } = req.body;
        const item = await menuService.createMenuItem(name, category, variations);
        res.status(201).json(successResponse(item, "Menu item created"));
    } catch (err) {
	    console.error(err);
        res.status(500).json(errorResponse("Failed to create menu item"));
    }
}

export async function toggleItem(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const item = await menuService.toggleAvailability(id);
        res.json(successResponse(item, "Availability toggled"));
    } catch (err) {
	    console.error(err);
        res.status(500).json(errorResponse("Failed to toggle availability"));
    }
}

export async function getMenuByCategory(req: Request, res: Response) {
    try {
        const category = req.params.category as any;
        const items = await menuService.getByCategory(category);
        res.json(successResponse(items));
    } catch (err) {
	    console.error(err);
        res.status(500).json(errorResponse("Failed to fetch category"));
    }
}
