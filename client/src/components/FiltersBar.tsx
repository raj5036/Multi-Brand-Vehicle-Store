import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
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
		<Box sx={{ mb: 2 }}>
			<Grid container spacing={2} alignItems="flex-end">
				<Grid item xs={12} sm={6} md={3}>
					<TextField
						label="Brand"
						placeholder="Tesla, Toyota..."
						value={filters.brand || ""}
						onChange={(e) => set({ brand: e.target.value || undefined })}
						size="small"
						fullWidth
					/>
				</Grid>

				<Grid item xs={12} sm={6} md={2}>
					<FormControl size="small" fullWidth>
						<InputLabel id="fuel-label">Fuel</InputLabel>
						<Select
							labelId="fuel-label"
							label="Fuel"
							value={filters.fuelType || ""}
							onChange={(e) =>
								set({ fuelType: (e.target.value || undefined) as FuelType | undefined })
							}
						>
							<MenuItem value="">All</MenuItem>
							<MenuItem value="PETROL">Petrol</MenuItem>
							<MenuItem value="DIESEL">Diesel</MenuItem>
							<MenuItem value="ELECTRIC">Electric</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={6} md={2}>
					<TextField
						label="Min Price"
						type="number"
						value={filters.minPrice ?? ""}
						onChange={(e) => set({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
						size="small"
						fullWidth
					/>
				</Grid>

				<Grid item xs={12} sm={6} md={2}>
					<TextField
						label="Max Price"
						type="number"
						value={filters.maxPrice ?? ""}
						onChange={(e) => set({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
						size="small"
						fullWidth
					/>
				</Grid>

				<Grid item xs={12} md={3}>
					<Button
						onClick={() => setFilters({})}
						variant="contained"
						color="info"
						fullWidth
						sx={{ height: 40 }}
					>
						Reset
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}
