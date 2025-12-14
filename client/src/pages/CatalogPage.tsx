import { useState } from "react";
import { useVehicles } from "../hooks/vehicles.hooks";
import { VehicleFilters } from "../types/vehicle";
import FiltersBar from "../components/FiltersBar";
import VehicleCard from "../components/VehicleCard";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

export default function CatalogPage() {
	const [filters, setFilters] = useState<VehicleFilters>({});
	const { data, isLoading, isError } = useVehicles(filters);

	return (
		<div>
			<h3 style={{ marginTop: 0 }}>Vehicle Catalog</h3>
			<FiltersBar filters={filters} setFilters={setFilters} />

			<div style={{ height: 16 }} />

			{isLoading && <Loading />}
			{isError && <ErrorState message="Failed to load vehicles" />}

			{data && (
				<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
					{data.map((v) => <VehicleCard key={v.id} v={v} />)}
				</div>
			)}
		</div>
	);
}
