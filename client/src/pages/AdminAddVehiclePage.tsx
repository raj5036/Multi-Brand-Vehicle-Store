import { useState } from "react";
import { useCreateVehicle } from "../hooks/vehicles.hooks";
import { FuelType } from "../types/vehicle";

export default function AdminAddVehiclePage() {
	const create = useCreateVehicle();

	const [form, setForm] = useState({
		brand: "",
		name: "",
		price: 0,
		fuelType: "PETROL" as FuelType,
		thumbnail: "",
		imageUrls: "",
		description: "",
	});

	return (
		<div style={{ maxWidth: 720 }}>
			<h3 style={{ marginTop: 0 }}>Admin: Add Vehicle</h3>

			<div style={{ display: "grid", gap: 10 }}>
				<input
					placeholder="Brand (e.g. Tesla)"
					value={form.brand}
					onChange={(e) => setForm({ ...form, brand: e.target.value })}
					style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
				/>
				<input
					placeholder="Name (e.g. Model S)"
					value={form.name}
					onChange={(e) => setForm({ ...form, name: e.target.value })}
					style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
				/>
				<input
					type="number"
					placeholder="Price"
					value={form.price}
					onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
					style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
				/>
				<select
					value={form.fuelType}
					onChange={(e) => setForm({ ...form, fuelType: e.target.value as FuelType })}
					style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
				>
					<option value="PETROL">Petrol</option>
					<option value="DIESEL">Diesel</option>
					<option value="ELECTRIC">Electric</option>
				</select>

				<input
					placeholder="Thumbnail URL"
					value={form.thumbnail}
					onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
					style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
				/>

				<textarea
					placeholder="Image URLs (comma separated)"
					value={form.imageUrls}
					onChange={(e) => setForm({ ...form, imageUrls: e.target.value })}
					rows={3}
					style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
				/>

				<textarea
					placeholder="Description"
					value={form.description}
					onChange={(e) => setForm({ ...form, description: e.target.value })}
					rows={4}
					style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
				/>

				<button
					disabled={create.isPending}
					onClick={async () => {
						const payload = {
							brand: form.brand.trim(),
							name: form.name.trim(),
							price: Number(form.price),
							fuelType: form.fuelType,
							thumbnail: form.thumbnail.trim(),
							imageUrls: form.imageUrls
								.split(",")
								.map((s) => s.trim())
								.filter(Boolean),
							description: form.description.trim(),
						};

						if (!payload.brand || !payload.name || !payload.thumbnail || !payload.description || !payload.imageUrls.length) return;

						await create.mutateAsync(payload);
						setForm({ brand: "", name: "", price: 0, fuelType: "PETROL", thumbnail: "", imageUrls: "", description: "" });
					}}
					style={{
						padding: 12,
						borderRadius: 10,
						border: "1px solid #ddd",
						background: "black",
						color: "white",
						cursor: "pointer",
						fontWeight: 700,
					}}
				>
					{create.isPending ? "Saving..." : "Add Vehicle"}
				</button>

				{create.isError && (
					<div style={{ color: "crimson" }}>
						Failed to create vehicle. Check admin token and payload.
					</div>
				)}
				{create.isSuccess && <div style={{ color: "green" }}>Vehicle created.</div>}
			</div>
		</div>
	);
}
