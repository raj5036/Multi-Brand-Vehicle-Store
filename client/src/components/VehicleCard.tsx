import { Link } from "react-router-dom";
import { VehicleListItem } from "../types/vehicle";

export default function VehicleCard({
	v,
	isBookmarked,
	onBookmark,
	bookmarking,
}: {
	v: VehicleListItem;
	isBookmarked: boolean;
	onBookmark: (vehicleId: string) => void;
	bookmarking?: boolean;
}) {
	return (
		<div className="group rounded-2xl border border-zinc-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition">
			<Link to={`/vehicles/${v.id}`} className="block">
				<div className="relative">
					<img src={v.thumbnail} alt={v.name} className="h-40 w-full object-cover" />
					<div className="absolute top-3 right-3">
						<button
							type="button"
							disabled={isBookmarked || bookmarking}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onBookmark(v.id);
							}}
							className={[
								"h-10 w-10 rounded-full flex items-center justify-center border transition",
								isBookmarked
									? "bg-zinc-100 border-zinc-200 cursor-not-allowed"
									: "bg-white border-zinc-200 hover:bg-zinc-50",
							].join(" ")}
							aria-label="Bookmark vehicle"
							title={isBookmarked ? "Already bookmarked" : "Bookmark"}
						>
							<span className={isBookmarked ? "text-zinc-500" : "text-zinc-900"}>
								{isBookmarked ? "♥" : "♡"}
							</span>
						</button>
					</div>
				</div>

				<div className="p-4">
					<div className="flex items-start justify-between gap-3">
						<div>
							<div className="font-semibold text-zinc-900">{v.brand}</div>
							<div className="text-sm text-zinc-600">{v.name}</div>
						</div>
						<span className="text-xs px-2 py-1 rounded-full bg-zinc-100 text-zinc-700">
							{v.fuelType}
						</span>
					</div>

					<div className="mt-3 font-bold text-zinc-900">
						₹ {v.price.toLocaleString("en-IN")}
					</div>
				</div>
			</Link>
		</div>
	);
}
