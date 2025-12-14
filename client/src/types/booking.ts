import { VehicleListItem } from "./vehicle";

export type Booking = {
	id: string;
	vehicleId: string;
	customerName: string;
	customerEmail: string;
	customerPhone?: string;
	note?: string;
	createdAt: string;
	vehicle: VehicleListItem;
};
