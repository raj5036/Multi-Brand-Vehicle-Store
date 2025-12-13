import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
	bookingIdParamsSchema,
	createBookingBodySchema,
	listBookingsQuerySchema,
} from "../validators/bookings.validators";
import {
	createBooking,
	deleteBooking,
	getBookingById,
	listBookings,
} from "../services/bookings.service";

export const createBookingHandler = asyncHandler(async (req: Request, res: Response) => {
	const parsed = createBookingBodySchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

	const created = await createBooking(parsed.data);
	res.status(201).json({ data: created });
});

export const listBookingsHandler = asyncHandler(async (req: Request, res: Response) => {
	const parsed = listBookingsQuerySchema.safeParse(req.query);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

	const bookings = await listBookings(parsed.data);
	res.json({ data: bookings });
});

export const getBookingByIdHandler = asyncHandler(async (req: Request, res: Response) => {
	const parsed = bookingIdParamsSchema.safeParse(req.params);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

	const booking = await getBookingById(parsed.data.id);
	if (!booking) return res.status(404).json({ error: "Booking not found" });

	res.json({ data: booking });
});

export const deleteBookingHandler = asyncHandler(async (req: Request, res: Response) => {
	const parsed = bookingIdParamsSchema.safeParse(req.params);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

	const deleted = await deleteBooking(parsed.data.id);
	res.json({ data: deleted });
});
