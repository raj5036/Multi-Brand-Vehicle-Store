import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVehicle } from "../hooks/vehicles.hooks";
import { useBookmarks, useCreateBookmark } from "../hooks/bookmarks.hooks";
import { useCreateBooking } from "../hooks/bookings.hooks";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

export default function VehicleDetailsPage() {
	const { id } = useParams();
	const nav = useNavigate();

	const { data: vehicle, isLoading, isError } = useVehicle(id);
	const { data: bookmarks } = useBookmarks();
	const createBookmark = useCreateBookmark();
	const createBooking = useCreateBooking();

	const isBookmarked = useMemo(() => {
		if (!bookmarks || !vehicle) return false;
		return bookmarks.some((b) => b.vehicleId === vehicle.id);
	}, [bookmarks, vehicle]);

	const [form, setForm] = useState({
		customerName: "",
		customerEmail: "",
		customerPhone: "",
		note: "",
	});

	if (isLoading) return <Loading />;
	if (isError || !vehicle) return <ErrorState message="Vehicle not found" />;

	return (
		<div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 16 }}>
			<div>
				<h3 style={{ marginTop: 0 }}>
					{vehicle.brand} — {vehicle.name}
				</h3>

				<div style={{ fontWeight: 700, fontSize: 18 }}>₹ {vehicle.price.toLocaleString("en-IN")}</div>
				<div style={{ marginTop: 6, opacity: 0.7 }}>{vehicle.fuelType}</div>

				<div style={{ height: 12 }} />

				<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
					{vehicle.imageUrls.map((u) => (
						<img key={u} src={u} alt="vehicle" style={{ width: 240, height: 160, objectFit: "cover", borderRadius: 12, border: "1px solid #eee" }} />
					))}
				</div>

				<div style={{ height: 12 }} />
				<p style={{ lineHeight: 1.6 }}>{vehicle.description}</p>

				<button
					disabled={isBookmarked || createBookmark.isPending}
					onClick={() => createBookmark.mutate(vehicle.id)}
					style={{
						padding: "10px 14px",
						borderRadius: 10,
						border: "1px solid #ddd",
						background: isBookmarked ? "#f3f3f3" : "white",
						cursor: isBookmarked ? "not-allowed" : "pointer",
						fontWeight: 600,
					}}
				>
					{isBookmarked ? "Bookmarked" : "Bookmark"}
				</button>
			</div>

			<div style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
				<h4 style={{ marginTop: 0 }}>Book Now</h4>

				<label style={{ fontSize: 12, opacity: 0.7 }}>Name</label>
				<input
					value={form.customerName}
					onChange={(e) => setForm({ ...form, customerName: e.target.value })}
					style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd", marginBottom: 10 }}
				/>

				<label style={{ fontSize: 12, opacity: 0.7 }}>Email</label>
				<input
					value={form.customerEmail}
					onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
					style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd", marginBottom: 10 }}
				/>

				<label style={{ fontSize: 12, opacity: 0.7 }}>Phone (optional)</label>
				<input
					value={form.customerPhone}
					onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
					style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd", marginBottom: 10 }}
				/>

				<label style={{ fontSize: 12, opacity: 0.7 }}>Note (optional)</label>
				<textarea
					value={form.note}
					onChange={(e) => setForm({ ...form, note: e.target.value })}
					rows={3}
					style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd", marginBottom: 10 }}
				/>

				<button
					disabled={createBooking.isPending}
					onClick={async () => {
						const payload = {
							vehicleId: vehicle.id,
							customerName: form.customerName.trim(),
							customerEmail: form.customerEmail.trim(),
							customerPhone: form.customerPhone.trim() || undefined,
							note: form.note.trim() || undefined,
						};

						// Minimal client-side validation to avoid obvious bad requests
						if (!payload.customerName || !payload.customerEmail) return;

						await createBooking.mutateAsync(payload);
						nav(`/bookings?email=${encodeURIComponent(payload.customerEmail)}`);
					}}
					style={{
						width: "100%",
						padding: 12,
						borderRadius: 10,
						border: "1px solid #ddd",
						background: "black",
						color: "white",
						cursor: "pointer",
						fontWeight: 700,
					}}
				>
					{createBooking.isPending ? "Booking..." : "Confirm Booking"}
				</button>
			</div>
		</div>
	);
}
