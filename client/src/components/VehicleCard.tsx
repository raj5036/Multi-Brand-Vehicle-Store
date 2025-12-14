import { Link } from "react-router-dom";
import { VehicleListItem } from "../types/vehicle";

export default function VehicleCard({ v }: { v: VehicleListItem }) {
	return (
		<Link
			to={`/vehicles/${v.id}`}
			style={{
				textDecoration: "none",
				color: "inherit",
				border: "1px solid #eee",
				borderRadius: 12,
				overflow: "hidden",
				display: "block",
			}}
		>
			<img src={v.thumbnail} alt={v.name} style={{ width: "100%", height: 160, objectFit: "cover" }} />
			<div style={{ padding: 12 }}>
				<div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
					<strong>{v.brand}</strong>
					<span style={{ fontSize: 12, opacity: 0.7 }}>{v.fuelType}</span>
				</div>
				<div style={{ marginTop: 6 }}>{v.name}</div>
				<div style={{ marginTop: 10, fontWeight: 700 }}>₹ {v.price.toLocaleString("en-IN")}</div>
			</div>
		</Link>
	);
}
