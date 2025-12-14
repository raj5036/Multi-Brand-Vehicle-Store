import { FuelType } from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";

type ListFilters = {
	brand?: string;
	fuelType?: FuelType;
	minPrice?: number;
	maxPrice?: number;
	page: number;
	limit: number;
};

export async function listVehicles(filters: ListFilters) {
	const where: any = {};

	if (filters.brand) where.brand = filters.brand;
	if (filters.fuelType) where.fuelType = filters.fuelType;

	if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
		where.price = {};
		if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
		if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
	}

	const skip = (filters.page - 1) * filters.limit;
	const take = filters.limit;

	const [items, total] = await prisma.$transaction([
		prisma.vehicle.findMany({
			where,
			orderBy: { createdAt: "desc" },
			skip,
			take,
			select: {
				id: true,
				brand: true,
				name: true,
				price: true,
				fuelType: true,
				thumbnail: true,
			},
		}),
		prisma.vehicle.count({ where }),
	]);

	const totalPages = Math.max(1, Math.ceil(total / filters.limit));

	return {
		items,
		meta: {
			page: filters.page,
			limit: filters.limit,
			total,
			totalPages,
			hasNextPage: filters.page < totalPages,
			hasPrevPage: filters.page > 1,
		},
	}
}

	export async function getVehicleById(id: string) {
		return prisma.vehicle.findUnique({
			where: { id },
		});
	}

	export async function createVehicle(data: {
		brand: string;
		name: string;
		price: number;
		fuelType: FuelType;
		thumbnail: string;
		imageUrls: string[];
		description: string;
	}) {
		return prisma.vehicle.create({ data });
	}

	export async function getVehicleSummary() {
		const rows = await prisma.vehicle.groupBy({
			by: ["brand", "fuelType"],
			_count: { _all: true },
		});

		const summary: Record<string, Record<string, number>> = {};

		for (const r of rows) {
			if (!summary[r.brand]) summary[r.brand] = {};
			summary[r.brand][r.fuelType] = r._count._all;
		}

		return summary;
	}
