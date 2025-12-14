import { useSearchParams } from "react-router-dom";
import { useBookings } from "../hooks/bookings.hooks";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

export default function BookingsPage() {
	const [sp, setSp] = useSearchParams();
	const email = sp.get("email") || "";

	const { data, isLoading, isError } = useBookings(email ? { email } : undefined);

	return (
		<div>
			<h3 style={{ marginTop: 0 }}>My Bookings</h3>

			<div style={{ display: "flex", gap: 10, alignItems: "end", marginBottom: 12 }}>
				<div style={{ flex: 1 }}>
					<label style={{ fontSize: 12, opacity: 0.7 }}>Email to fetch bookings</label>
					<input
						value={email}
						onChange={(e) => setSp(e.target.value ? { email: e.target.value } : {})}
						placeholder="raj@example.com"
						style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
					/>
				</div>
			</div>

			{isLoading && <Loading />}
			{isError && <ErrorState message="Failed to load bookings" />}
			{!isLoading && !isError && !data?.length && (
				<div style={{ padding: 12, opacity: 0.7 }}>No bookings found.</div>
			)}

			{data?.map((b) => (
				<div key={b.id} style={{ border: "1px solid #eee", padding: 12, borderRadius: 12, marginBottom: 10 }}>
					<div style={{ fontWeight: 700 }}>
						{b.vehicle.brand} — {b.vehicle.name}
					</div>
					<div style={{ marginTop: 6, opacity: 0.75 }}>
						Booked by: {b.customerName} ({b.customerEmail})
					</div>
					<div style={{ marginTop: 6, fontWeight: 700 }}>₹ {b.vehicle.price.toLocaleString("en-IN")}</div>
					<div style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>
						Created: {new Date(b.createdAt).toLocaleString()}
					</div>
					{b.note && <div style={{ marginTop: 8 }}>Note: {b.note}</div>}
				</div>
			))}
		</div>
	);
}
