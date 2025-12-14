export default function VehicleCardSkeleton() {
	return (
		<div className="rounded-2xl border border-zinc-200 overflow-hidden bg-white shadow-sm">
			<div className="h-40 bg-zinc-100 animate-pulse" />
			<div className="p-4 space-y-3">
				<div className="h-4 w-24 bg-zinc-100 animate-pulse rounded" />
				<div className="h-4 w-40 bg-zinc-100 animate-pulse rounded" />
				<div className="h-5 w-28 bg-zinc-100 animate-pulse rounded" />
			</div>
		</div>
	);
}
