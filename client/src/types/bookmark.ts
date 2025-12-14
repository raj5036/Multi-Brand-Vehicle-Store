import { VehicleListItem } from "./vehicle";

export type Bookmark = {
	id: string;
	vehicleId: string;
	createdAt: string;
	vehicle: VehicleListItem;
};
