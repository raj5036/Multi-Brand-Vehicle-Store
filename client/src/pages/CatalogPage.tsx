import { useMemo, useState } from "react";
import { VehicleFilters } from "../types/vehicle";
import FiltersBar from "../components/FiltersBar";
import VehicleCard from "../components/VehicleCard";
import VehicleCardSkeleton from "../components/VehicleCardSkeleton";
import ErrorState from "../components/ErrorState";
import { useVehiclesInfinite } from "../hooks/vehicles.hooks";
import { useBookmarks, useCreateBookmark } from "../hooks/bookmarks.hooks";
import { Typography } from "@mui/material";

export default function CatalogPage() {
	const [filters, setFilters] = useState<VehicleFilters>({});
	const vehiclesQ = useVehiclesInfinite({ ...filters, limit: 12 });

	const { data: bookmarks } = useBookmarks();
	const createBookmark = useCreateBookmark();

	const bookmarkedIds = useMemo(() => {
		const s = new Set<string>();
		bookmarks?.forEach((b) => s.add(b.vehicleId));
		return s;
	}, [bookmarks]);

	const allVehicles = useMemo(() => {
		return vehiclesQ.data?.pages.flatMap((p) => p.data) ?? [];
	}, [vehiclesQ.data]);

	return (
		<div className="space-y-4">
			<div>
				<Typography variant="h3">Vehicle Catalog</Typography>
				<Typography sx={{ marginBottom: 2 }}>Explore, filter, bookmark, and book vehicles.</Typography>
			</div>

			<FiltersBar filters={filters} setFilters={setFilters} />

			{vehiclesQ.isError && <ErrorState message="Failed to load vehicles" />}

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
				{vehiclesQ.isLoading &&
					Array.from({ length: 8 }).map((_, i) => <VehicleCardSkeleton key={i} />)}

				{!vehiclesQ.isLoading &&
					allVehicles.map((v) => (
						<VehicleCard
							key={v.id}
							v={v}
							isBookmarked={bookmarkedIds.has(v.id)}
							bookmarking={createBookmark.isPending}
							onBookmark={(id) => createBookmark.mutate(id)}
						/>
					))}
			</div>

			<div className="flex items-center justify-between pt-2">
				<button
					disabled={!vehiclesQ.hasNextPage || vehiclesQ.isFetchingNextPage}
					onClick={() => vehiclesQ.fetchNextPage()}
					className={[
						"px-4 py-2 rounded-xl border transition font-semibold",
						vehiclesQ.hasNextPage
							? "bg-black text-white border-black hover:opacity-90"
							: "bg-zinc-100 text-zinc-500 border-zinc-200 cursor-not-allowed",
					].join(" ")}
				>
					{vehiclesQ.isFetchingNextPage ? "Loading..." : vehiclesQ.hasNextPage ? "Load More" : ""}
				</button>
			</div>
		</div>
	);
}
