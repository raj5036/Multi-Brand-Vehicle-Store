import { Button } from "@mui/material";
import { FuelType, VehicleFilters } from "../types/vehicle";

export default function FiltersBar({
	filters,
	setFilters,
}: {
	filters: VehicleFilters;
	setFilters: (f: VehicleFilters) => void;
}) {
	const set = (patch: Partial<VehicleFilters>) => setFilters({ ...filters, ...patch });

	return (
		<div className="flex justify-start items-center gap-[40px] mb-[16px]">
			<div>
				<label style={{ fontSize: 12, opacity: 0.7 }}>Brand</label>
				<input
					value={filters.brand || ""}
					onChange={(e) => set({ brand: e.target.value || undefined })}
					placeholder="Tesla, Toyota..."
					style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
				/>
			</div>

			<div>
				<label style={{ fontSize: 12, opacity: 0.7 }}>Fuel</label>
				<select
					value={filters.fuelType || ""}
					onChange={(e) => set({ fuelType: (e.target.value || undefined) as FuelType | undefined })}
					style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
				>
					<option value="">All</option>
					<option value="PETROL">Petrol</option>
					<option value="DIESEL">Diesel</option>
					<option value="ELECTRIC">Electric</option>
				</select>
			</div>

			<div>
				<label style={{ fontSize: 12, opacity: 0.7 }}>Min Price</label>
				<input
					type="number"
					value={filters.minPrice ?? ""}
					onChange={(e) => set({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
					style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
				/>
			</div>

			<div>
				<label style={{ fontSize: 12, opacity: 0.7 }}>Max Price</label>
				<input
					type="number"
					value={filters.maxPrice ?? ""}
					onChange={(e) => set({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
					style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
				/>
			</div>

			<Button
				onClick={() => setFilters({})}
				// className="rounded-[10px] bg-white cursor-pointer p-[10px] border border-solid border-[#ddd] mt-[17px]"
				size="small"
				variant="contained"
				color="info"
			>
				Reset
			</Button>
		</div>
	);
}
