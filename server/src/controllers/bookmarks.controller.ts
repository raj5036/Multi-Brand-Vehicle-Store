import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
	bookmarkIdParamsSchema,
	createBookmarkBodySchema,
} from "../validators/bookmarks.validators";
import { createBookmark, deleteBookmark, listBookmarks } from "../services/bookmarks.service";
import { Prisma } from "../generated/prisma/client";

export const createBookmarkHandler = asyncHandler(async (req: Request, res: Response) => {
	const parsed = createBookmarkBodySchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

	try {
		const created = await createBookmark(parsed.data.vehicleId);
		return res.status(201).json({ data: created });
	} catch (e: any) {
		if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
			return res.status(409).json({ error: "Vehicle already bookmarked" });
		}
		throw e;
	}
});

export const listBookmarksHandler = asyncHandler(async (_req: Request, res: Response) => {
	const bookmarks = await listBookmarks();
	res.json({ data: bookmarks });
});

export const deleteBookmarkHandler = asyncHandler(async (req: Request, res: Response) => {
	const parsed = bookmarkIdParamsSchema.safeParse(req.params);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

	const deleted = await deleteBookmark(parsed.data.id);
	res.json({ data: deleted });
});
