import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import { useBookmarks, useDeleteBookmark } from "../hooks/bookmarks.hooks";
import { Link } from "react-router-dom";

export default function BookmarksPage() {
	const { data, isLoading, isError } = useBookmarks();
	const del = useDeleteBookmark();

	if (isLoading) return <Loading />;
	if (isError) return <ErrorState message="Failed to load bookmarks" />;

	return (
		<div>
			<h3 style={{ marginTop: 0 }}>Bookmarks</h3>

			{!data?.length && <div style={{ padding: 12, opacity: 0.7 }}>No bookmarks yet.</div>}

			{data?.map((b) => (
				<div
					key={b.id}
					style={{
						display: "flex",
						gap: 12,
						border: "1px solid #eee",
						padding: 12,
						borderRadius: 12,
						marginBottom: 10,
						alignItems: "center",
					}}
				>
					<img src={b.vehicle.thumbnail} alt={b.vehicle.name} style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 10 }} />
					<div style={{ flex: 1 }}>
						<Link to={`/vehicles/${b.vehicle.id}`} style={{ textDecoration: "none", color: "black" }}>
							<div style={{ fontWeight: 700 }}>{b.vehicle.brand} — {b.vehicle.name}</div>
						</Link>
						<div style={{ opacity: 0.7, fontSize: 12 }}>{b.vehicle.fuelType}</div>
						<div style={{ fontWeight: 700, marginTop: 6 }}>₹ {b.vehicle.price.toLocaleString("en-IN")}</div>
					</div>

					<button
						disabled={del.isPending}
						onClick={() => del.mutate(b.id)}
						style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", background: "white", cursor: "pointer" }}
					>
						Remove
					</button>
				</div>
			))}
		</div>
	);
}
