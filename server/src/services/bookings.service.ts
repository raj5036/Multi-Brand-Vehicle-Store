import { prisma } from "../lib/prisma";

export async function createBooking(data: {
	vehicleId: string;
	customerName: string;
	customerEmail: string;
	customerPhone?: string;
	note?: string;
}) {
	const vehicle = await prisma.vehicle.findUnique({
		where: { id: data.vehicleId },
		select: { id: true },
	});

	if (!vehicle) {
		const err: any = new Error("Vehicle not found");
		err.statusCode = 404;
		throw err;
	}

	return prisma.booking.create({
		data: {
			vehicleId: data.vehicleId,
			customerName: data.customerName,
			customerEmail: data.customerEmail,
			customerPhone: data.customerPhone,
			note: data.note,
		},
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

export async function listBookings(filters: {
	email?: string;
	vehicleId?: string;
	brand?: string;
}) {
	const where: any = {};

	if (filters.email) where.customerEmail = filters.email;
	if (filters.vehicleId) where.vehicleId = filters.vehicleId;
	if (filters.brand) where.vehicle = { brand: filters.brand };

	return prisma.booking.findMany({
		where,
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

export async function getBookingById(id: string) {
	return prisma.booking.findUnique({
		where: { id },
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

export async function deleteBooking(id: string) {
	const existing = await prisma.booking.findUnique({ where: { id }, select: { id: true } });
	if (!existing) {
		const err: any = new Error("Booking not found");
		err.statusCode = 404;
		throw err;
	}

	return prisma.booking.delete({ where: { id } });
}
