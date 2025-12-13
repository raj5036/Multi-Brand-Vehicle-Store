import { z } from "zod";

export const createBookingBodySchema = z.object({
	vehicleId: z.string().min(1),
	customerName: z.string().min(2, "Name must be at least 2 characters"),
	customerEmail: z.string().email("Invalid email"),
	customerPhone: z
		.string()
		.min(7, "Phone too short")
		.max(20, "Phone too long")
		.optional(),
	note: z.string().max(500, "Note too long").optional(),
});

export const bookingIdParamsSchema = z.object({
	id: z.string().min(1),
});

export const listBookingsQuerySchema = z.object({
	email: z.string().email().optional(),
	vehicleId: z.string().min(1).optional(),
	brand: z.string().min(1).optional(),
});
