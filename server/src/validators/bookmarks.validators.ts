import { z } from "zod";

export const createBookmarkBodySchema = z.object({
	vehicleId: z.string().min(1),
});

export const bookmarkIdParamsSchema = z.object({
	id: z.string().min(1),
});
