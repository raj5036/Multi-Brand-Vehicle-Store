import { Request, Response } from "express";
import {
	createVehicleBodySchema,
	listVehiclesQuerySchema,
	vehicleIdParamsSchema,
} from "../validators/vehicles.validators";
import {
	createVehicle,
	getVehicleById,
	getVehicleSummary,
	listVehicles,
} from "../services/vehicles.service";
import { asyncHandler } from "../utils/asyncHandler";

export const listVehiclesHandler = asyncHandler(async (req: Request, res: Response) => {
	const parsed = listVehiclesQuerySchema.safeParse(req.query);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

	const { page, limit, ...rest } = parsed.data;

	const result = await listVehicles({
		...rest,
		page,
		limit,
	} as any);

	res.json({ data: result.items, meta: result.meta });
});

export const getVehicleByIdHandler = asyncHandler(async (req: Request, res: Response) => {
	const parsed = vehicleIdParamsSchema.safeParse(req.params);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

	const vehicle = await getVehicleById(parsed.data.id);
	if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

	res.json({ data: vehicle });
});

export const createVehicleHandler = asyncHandler(async (req: Request, res: Response) => {
	const parsed = createVehicleBodySchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

	const created = await createVehicle(parsed.data as any);
	res.status(201).json({ data: created });
});

export const getVehicleSummaryHandler = asyncHandler(async (_req: Request, res: Response) => {
	const summary = await getVehicleSummary();
	res.json({ data: summary });
});
