import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Divider,
	MobileStepper,
	Paper,
	TextField,
	Typography,
	Grid
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import { useVehicle } from "../hooks/vehicles.hooks";
import { useBookmarks, useCreateBookmark } from "../hooks/bookmarks.hooks";
import { useCreateBooking } from "../hooks/bookings.hooks";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

type FormState = {
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	note: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const isValidEmail = (email: string) => {
	// Reasonable, UI-level email validation (not RFC-perfect, but practical)
	return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim());
};

const isValidPhone = (phone: string) => {
	// Optional field. If present: allow + and digits only, 10–15 digits total.
	const p = phone.trim();
	if (!p) return true;
	if (!/^\+?[0-9]+$/.test(p)) return false;
	const digits = p.replace(/\D/g, "");
	return digits.length >= 10 && digits.length <= 15;
};

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

	const [form, setForm] = useState<FormState>({
		customerName: "",
		customerEmail: "",
		customerPhone: "",
		note: "",
	});

	const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
	const [submitError, setSubmitError] = useState<string>("");

	// Carousel state
	const [activeStep, setActiveStep] = useState(0);

	if (isLoading) return <Loading />;
	if (isError || !vehicle) return <ErrorState message="Vehicle not found" />;

	const maxSteps = vehicle.imageUrls?.length ?? 0;

	const validate = (f: FormState): FormErrors => {
		const errors: FormErrors = {};

		const name = f.customerName.trim();
		const email = f.customerEmail.trim();
		const phone = f.customerPhone.trim();

		if (!name) errors.customerName = "Name is required.";
		else if (name.length < 2) errors.customerName = "Name must be at least 2 characters.";

		if (!email) errors.customerEmail = "Email is required.";
		else if (!isValidEmail(email)) errors.customerEmail = "Enter a valid email address.";

		// phone optional; validate only if provided
		if (phone && !isValidPhone(phone)) {
			errors.customerPhone = "Enter a valid phone number (10–15 digits, optional +).";
		}

		// note optional (no validation)

		return errors;
	};
	
	const errors = validate(form);
	const isFormValid = Object.keys(errors).length === 0;

	const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
		setForm((prev) => ({ ...prev, [key]: value }));
	};

	const markTouched = (key: keyof FormState) => {
		setTouched((prev) => ({ ...prev, [key]: true }));
	};

	const showError = (key: keyof FormState) => !!touched[key] && !!errors[key];

	const onSubmit = async () => {
		setSubmitError("");

		// Mark required fields touched so errors show
		setTouched((prev) => ({
			...prev,
			customerName: true,
			customerEmail: true,
			customerPhone: prev.customerPhone ?? false,
		}));

		if (!isFormValid) return;

		const payload = {
			vehicleId: vehicle.id,
			customerName: form.customerName.trim(),
			customerEmail: form.customerEmail.trim(),
			customerPhone: form.customerPhone.trim() || undefined,
			note: form.note.trim() || undefined,
		};

		try {
			await createBooking.mutateAsync(payload);
			nav(`/bookings?email=${encodeURIComponent(payload.customerEmail)}`);
		} catch (e: any) {
			// Keep it generic; your errorMiddleware likely formats API errors.
			setSubmitError(e?.message || "Booking failed. Please try again.");
		}
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Grid container spacing={2}>
				{/* Details */}
				<Grid size={{ xs: 12, md: 8 }}>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
						<Typography variant="h5" sx={{ fontWeight: 800 }}>
							{vehicle.brand} — {vehicle.name}
						</Typography>

						<Typography variant="h6" sx={{ fontWeight: 800 }}>
							₹ {vehicle.price.toLocaleString("en-IN")}
						</Typography>

						<Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
							<Chip size="small" label={vehicle.fuelType} variant="outlined" />
						</Box>

						{/* Carousel */}
						{maxSteps > 0 && (
							<Paper
								variant="outlined"
								sx={{ mt: 1, borderRadius: 2, overflow: "hidden" }}
							>
								<Box
									sx={{
										width: "100%",
										aspectRatio: { xs: "16 / 10", sm: "16 / 9" },
										bgcolor: "background.default",
									}}
								>
									<Box
										component="img"
										src={vehicle.imageUrls[activeStep]}
										alt={`vehicle-${activeStep + 1}`}
										sx={{
											width: "100%",
											height: "100%",
											display: "block",
											objectFit: "cover",
										}}
									/>
								</Box>

								<MobileStepper
									steps={maxSteps}
									position="static"
									activeStep={activeStep}
									sx={{ borderTop: "1px solid", borderColor: "divider" }}
									nextButton={
										<Button
											size="small"
											onClick={() => setActiveStep((s) => Math.min(s + 1, maxSteps - 1))}
											disabled={activeStep === maxSteps - 1}
											endIcon={<KeyboardArrowRight />}
										>
											Next
										</Button>
									}
									backButton={
										<Button
											size="small"
											onClick={() => setActiveStep((s) => Math.max(s - 1, 0))}
											disabled={activeStep === 0}
											startIcon={<KeyboardArrowLeft />}
										>
											Back
										</Button>
									}
								/>
							</Paper>
						)}

						<Divider sx={{ my: 1 }} />

						<Typography variant="body1" sx={{ lineHeight: 1.7 }}>
							{vehicle.description}
						</Typography>

						<Button
							disabled={isBookmarked || createBookmark.isPending}
							onClick={() => createBookmark.mutate(vehicle.id)}
							variant={isBookmarked ? "contained" : "outlined"}
							color={isBookmarked ? "inherit" : "primary"}
							sx={{ mt: 1, fontWeight: 700, borderRadius: 2, width: "fit-content" }}
						>
							{isBookmarked ? "Bookmarked" : "Bookmark"}
						</Button>
					</Box>
				</Grid>

				{/* Booking form (below on mobile, right on desktop) */}
				<Grid size={{ xs: 12, md: 4 }}>
					<Card variant="outlined" sx={{ borderRadius: 2 }}>
						<CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
							<Typography variant="h6" sx={{ fontWeight: 800 }}>
								Book Now
							</Typography>

							<TextField
								label="Name"
								value={form.customerName}
								onChange={(e) => setField("customerName", e.target.value)}
								onBlur={() => markTouched("customerName")}
								size="small"
								fullWidth
								error={showError("customerName")}
								helperText={showError("customerName") ? errors.customerName : " "}
							/>

							<TextField
								label="Email"
								type="email"
								value={form.customerEmail}
								onChange={(e) => setField("customerEmail", e.target.value)}
								onBlur={() => markTouched("customerEmail")}
								size="small"
								fullWidth
								error={showError("customerEmail")}
								helperText={showError("customerEmail") ? errors.customerEmail : " "}
							/>

							<TextField
								label="Phone (optional)"
								value={form.customerPhone}
								onChange={(e) => setField("customerPhone", e.target.value)}
								onBlur={() => markTouched("customerPhone")}
								size="small"
								fullWidth
								error={showError("customerPhone")}
								helperText={showError("customerPhone") ? errors.customerPhone : " "}
							/>

							<TextField
								label="Note (optional)"
								value={form.note}
								onChange={(e) => setField("note", e.target.value)}
								size="small"
								fullWidth
								multiline
								minRows={3}
							/>

							{submitError ? (
								<Typography variant="body2" color="error">
									{submitError}
								</Typography>
							) : null}

							<Button
								disabled={!isFormValid || createBooking.isPending}
								onClick={onSubmit}
								variant="contained"
								sx={{ mt: 0.5, borderRadius: 2, py: 1.2, fontWeight: 800 }}
							>
								{createBooking.isPending ? "Booking..." : "Confirm Booking"}
							</Button>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
}
