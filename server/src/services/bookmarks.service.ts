import { prisma } from "../lib/prisma";

export async function createBookmark(vehicleId: string) {
	// Ensure vehicle exists
	const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
	if (!vehicle) {
		const err: any = new Error("Vehicle not found");
		err.statusCode = 404;
		throw err;
	}

	// Unique constraint may throw if already bookmarked
	return prisma.bookmark.create({
		data: { vehicleId },
		include: {
			vehicle: {
				select: {
					id: true,
					brand: true,
					name: true,
					price: true,
					fuelType: true,
					thumbnail: true,
				},
			},
		},
	});
}

export async function listBookmarks() {
	return prisma.bookmark.findMany({
		orderBy: { createdAt: "desc" },
		include: {
			vehicle: {
				select: {
					id: true,
					brand: true,
					name: true,
					price: true,
					fuelType: true,
					thumbnail: true,
				},
			},
		},
	});
}

export async function deleteBookmark(bookmarkId: string) {
	const existing = await prisma.bookmark.findUnique({ where: { id: bookmarkId } });
	if (!existing) {
		const err: any = new Error("Bookmark not found");
		err.statusCode = 404;
		throw err;
	}

	return prisma.bookmark.delete({ where: { id: bookmarkId } });
}
