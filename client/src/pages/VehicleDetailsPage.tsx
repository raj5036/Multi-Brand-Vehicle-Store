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

	// Carousel state
	const [activeStep, setActiveStep] = useState(0);

	if (isLoading) return <Loading />;
	if (isError || !vehicle) return <ErrorState message="Vehicle not found" />;

	const maxSteps = vehicle.imageUrls?.length ?? 0;
	const canSubmit =
		!!form.customerName.trim() && !!form.customerEmail.trim() && !createBooking.isPending;

	return (
		<Box sx={{ width: "100%" }}>
			<Grid container spacing={2}>
				{/* LEFT: Details */}
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

						{/* Image Carousel */}
						{maxSteps > 0 && (
							<Paper
								variant="outlined"
								sx={{
									mt: 1,
									borderRadius: 2,
									overflow: "hidden",
								}}
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

						<Box>
							<Button
								disabled={isBookmarked || createBookmark.isPending}
								onClick={() => createBookmark.mutate(vehicle.id)}
								variant={isBookmarked ? "contained" : "outlined"}
								color={isBookmarked ? "inherit" : "primary"}
								sx={{
									mt: 1,
									fontWeight: 700,
									borderRadius: 2,
								}}
							>
								{isBookmarked ? "Bookmarked" : "Bookmark"}
							</Button>
						</Box>
					</Box>
				</Grid>

				{/* RIGHT: Booking form */}
				<Grid size={{ xs: 12, md: 4 }}>
					<Card variant="outlined" sx={{ borderRadius: 2 }}>
						<CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
							<Typography variant="h6" sx={{ fontWeight: 800 }}>
								Book Now
							</Typography>

							<TextField
								label="Name"
								value={form.customerName}
								onChange={(e) => setForm({ ...form, customerName: e.target.value })}
								size="small"
								fullWidth
							/>

							<TextField
								label="Email"
								type="email"
								value={form.customerEmail}
								onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
								size="small"
								fullWidth
							/>

							<TextField
								label="Phone (optional)"
								value={form.customerPhone}
								onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
								size="small"
								fullWidth
							/>

							<TextField
								label="Note (optional)"
								value={form.note}
								onChange={(e) => setForm({ ...form, note: e.target.value })}
								size="small"
								fullWidth
								multiline
								minRows={3}
							/>

							<Button
								disabled={!canSubmit}
								onClick={async () => {
									const payload = {
										vehicleId: vehicle.id,
										customerName: form.customerName.trim(),
										customerEmail: form.customerEmail.trim(),
										customerPhone: form.customerPhone.trim() || undefined,
										note: form.note.trim() || undefined,
									};

									if (!payload.customerName || !payload.customerEmail) return;

									await createBooking.mutateAsync(payload);
									nav(`/bookings?email=${encodeURIComponent(payload.customerEmail)}`);
								}}
								variant="contained"
								sx={{ mt: 1, borderRadius: 2, py: 1.2, fontWeight: 800 }}
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
