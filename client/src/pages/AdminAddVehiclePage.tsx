import * as React from "react";
import {
	Alert,
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	FormControl,
	FormHelperText,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import { useCreateVehicle } from "../hooks/vehicles.hooks";
import { FuelType } from "../types/vehicle";

type FormState = {
	brand: string;
	name: string;
	price: number | ""; // allow blank (fixes "0" sticking)
	fuelType: FuelType;
	thumbnail: string;
	imageUrls: string; // comma separated
	description: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
	brand: "",
	name: "",
	price: "",
	fuelType: "PETROL",
	thumbnail: "",
	imageUrls: "",
	description: "",
};

function isValidUrl(value: string) {
	try {
		const u = new URL(value);
		return u.protocol === "http:" || u.protocol === "https:";
	} catch {
		return false;
	}
}

function parseImageUrls(raw: string) {
	return raw
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);
}

export default function AdminAddVehiclePage() {
	const create = useCreateVehicle();

	const [form, setForm] = React.useState<FormState>(initialForm);
	const [touched, setTouched] = React.useState<Partial<Record<keyof FormState, boolean>>>({});
	const [errors, setErrors] = React.useState<FieldErrors>({});

	const imageUrlList = React.useMemo(() => parseImageUrls(form.imageUrls), [form.imageUrls]);

	const validate = React.useCallback(
		(next: FormState): FieldErrors => {
			const e: FieldErrors = {};

			const brand = next.brand.trim();
			const name = next.name.trim();
			const thumbnail = next.thumbnail.trim();
			const description = next.description.trim();
			const urls = parseImageUrls(next.imageUrls);

			if (!brand) e.brand = "Brand is required.";
			if (!name) e.name = "Name is required.";

			if (next.price === "") {
				e.price = "Price is required.";
			} else if (!Number.isFinite(Number(next.price)) || Number(next.price) <= 0) {
				e.price = "Price must be a positive number.";
			}

			if (!thumbnail) {
				e.thumbnail = "Thumbnail URL is required.";
			} else if (!isValidUrl(thumbnail)) {
				e.thumbnail = "Enter a valid URL (must start with http/https).";
			}

			if (!urls.length) {
				e.imageUrls = "Add at least 1 image URL (comma separated).";
			} else {
				const invalid = urls.find((u) => !isValidUrl(u));
				if (invalid) e.imageUrls = `Invalid image URL: ${invalid}`;
			}

			if (!description) e.description = "Description is required.";

			return e;
		},
		[]
	);

	// Validate live (keeps helper text accurate)
	React.useEffect(() => {
		setErrors(validate(form));
	}, [form, validate]);

	const canSubmit = React.useMemo(() => {
		return Object.keys(errors).length === 0 && !create.isPending;
	}, [errors, create.isPending]);

	const markAllTouched = () => {
		setTouched({
			brand: true,
			name: true,
			price: true,
			fuelType: true,
			thumbnail: true,
			imageUrls: true,
			description: true,
		});
	};

	const handleSubmit = async (e?: React.FormEvent) => {
		e?.preventDefault();

		const nextErrors = validate(form);
		setErrors(nextErrors);

		if (Object.keys(nextErrors).length > 0) {
			markAllTouched();
			return;
		}

		const payload = {
			brand: form.brand.trim(),
			name: form.name.trim(),
			price: Number(form.price),
			fuelType: form.fuelType,
			thumbnail: form.thumbnail.trim(),
			imageUrls: imageUrlList,
			description: form.description.trim(),
		};

		await create.mutateAsync(payload);
		setForm(initialForm);
		setTouched({});
	};

	const showError = (field: keyof FormState) => Boolean(touched[field] && errors[field]);

	return (
		<Box sx={{ maxWidth: 820, mx: "auto" }}>
			<Card
				elevation={0}
				sx={{
					borderRadius: 3,
					border: "1px solid",
					borderColor: "divider",
				}}
			>
				<CardHeader
					title={
						<Stack direction="row" alignItems="center" spacing={1}>
							<AddCircleOutlineIcon />
							<Typography variant="h6" fontWeight={900}>
								Admin: Add Vehicle
							</Typography>
						</Stack>
					}
					subheader="Fill in the details and press Enter to submit (except in multiline fields)."
					sx={{ pb: 1 }}
				/>
				<Divider />

				{/* Form wrapper enables Enter-to-submit */}
				<CardContent>
					<Box component="form" onSubmit={handleSubmit} noValidate>
						<Stack spacing={2}>
							<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
								<TextField
									label="Brand"
									placeholder="e.g. Tesla"
									value={form.brand}
									onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))}
									onBlur={() => setTouched((t) => ({ ...t, brand: true }))}
									fullWidth
									required
									error={showError("brand")}
									helperText={showError("brand") ? errors.brand : " "}
								/>

								<TextField
									label="Name"
									placeholder="e.g. Model S"
									value={form.name}
									onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
									onBlur={() => setTouched((t) => ({ ...t, name: true }))}
									fullWidth
									required
									error={showError("name")}
									helperText={showError("name") ? errors.name : " "}
								/>
							</Stack>

							<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
								<TextField
									label="Price"
									placeholder="e.g. 2500000"
									type="number"
									value={form.price}
									onChange={(e) => {
										const next = e.target.value;
										setForm((p) => ({
											...p,
											price: next === "" ? "" : Number(next),
										}));
									}}
									onBlur={() => setTouched((t) => ({ ...t, price: true }))}
									fullWidth
									required
									inputProps={{ min: 0, step: 1 }}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<CurrencyRupeeIcon fontSize="small" />
											</InputAdornment>
										),
									}}
									error={showError("price")}
									helperText={showError("price") ? errors.price : " "}
								/>

								<FormControl fullWidth required>
									<InputLabel id="fuelType-label">Fuel Type</InputLabel>
									<Select
										labelId="fuelType-label"
										label="Fuel Type"
										value={form.fuelType}
										onChange={(e) =>
											setForm((p) => ({ ...p, fuelType: e.target.value as FuelType }))
										}
										onBlur={() => setTouched((t) => ({ ...t, fuelType: true }))}
									>
										<MenuItem value="PETROL">Petrol</MenuItem>
										<MenuItem value="DIESEL">Diesel</MenuItem>
										<MenuItem value="ELECTRIC">Electric</MenuItem>
									</Select>
									<FormHelperText>{" "}</FormHelperText>
								</FormControl>
							</Stack>

							<TextField
								label="Thumbnail URL"
								placeholder="https://..."
								value={form.thumbnail}
								onChange={(e) => setForm((p) => ({ ...p, thumbnail: e.target.value }))}
								onBlur={() => setTouched((t) => ({ ...t, thumbnail: true }))}
								fullWidth
								required
								error={showError("thumbnail")}
								helperText={showError("thumbnail") ? errors.thumbnail : " "}
							/>

							<TextField
								label="Image URLs"
								placeholder="https://a.jpg, https://b.jpg, https://c.jpg"
								value={form.imageUrls}
								onChange={(e) => setForm((p) => ({ ...p, imageUrls: e.target.value }))}
								onBlur={() => setTouched((t) => ({ ...t, imageUrls: true }))}
								fullWidth
								required
								multiline
								minRows={3}
								error={showError("imageUrls")}
								helperText={
									showError("imageUrls")
										? errors.imageUrls
										: `Parsed: ${imageUrlList.length} URL(s)`
								}
							/>

							<TextField
								label="Description"
								placeholder="Write a helpful description..."
								value={form.description}
								onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
								onBlur={() => setTouched((t) => ({ ...t, description: true }))}
								fullWidth
								required
								multiline
								minRows={4}
								error={showError("description")}
								helperText={showError("description") ? errors.description : " "}
							/>

							<LoadingButton
								loading={create.isPending}
								variant="contained"
								size="large"
								type="submit"
								disabled={!canSubmit}
								sx={{
									borderRadius: 2,
									textTransform: "none",
									fontWeight: 800,
									py: 1.25,
								}}
							>
								Add Vehicle
							</LoadingButton>

							{create.isError && (
								<Alert severity="error">
									Failed to create vehicle. Check admin token and payload.
								</Alert>
							)}
							{create.isSuccess && <Alert severity="success">Vehicle created.</Alert>}
						</Stack>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
}
