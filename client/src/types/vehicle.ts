export type FuelType = "PETROL" | "DIESEL" | "ELECTRIC";

export type VehicleListItem = {
	id: string;
	brand: string;
	name: string;
	price: number;
	fuelType: FuelType;
	thumbnail: string;
};

export type Vehicle = VehicleListItem & {
	imageUrls: string[];
	description: string;
	createdAt: string;
	updatedAt: string;
};

export type VehicleFilters = {
	brand?: string;
	fuelType?: FuelType;
	minPrice?: number;
	maxPrice?: number;
};
