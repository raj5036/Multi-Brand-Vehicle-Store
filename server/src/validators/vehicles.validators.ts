import { z } from "zod";

export const listVehiclesQuerySchema = z.object({
	brand: z.string().min(1).optional(),
	fuelType: z.enum(["PETROL", "DIESEL", "ELECTRIC"]).optional(),
	minPrice: z.coerce.number().int().nonnegative().optional(),
	maxPrice: z.coerce.number().int().nonnegative().optional(),
});

export const vehicleIdParamsSchema = z.object({
	id: z.string().min(1),
});

export const createVehicleBodySchema = z.object({
	brand: z.string().min(1),
	name: z.string().min(1),
	price: z.number().int().nonnegative(),
	fuelType: z.enum(["PETROL", "DIESEL", "ELECTRIC"]),
	thumbnail: z.string().url(),
	imageUrls: z.array(z.string().url()).min(1),
	description: z.string().min(1),
});
