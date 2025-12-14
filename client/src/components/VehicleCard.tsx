import { Link as RouterLink } from "react-router-dom";
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Chip,
	IconButton,
	Stack,
	Typography,
	Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import { VehicleListItem } from "../types/vehicle";

type Props = {
	v: VehicleListItem;
	isBookmarked: boolean;
	onBookmark: (vehicleId: string) => void;
	bookmarking?: boolean;
};

export default function VehicleCard({
	v,
	isBookmarked,
	onBookmark,
	bookmarking,
}: Props) {
	return (
		<Card
			elevation={0}
			sx={{
				height: "100%",
				borderRadius: 3,
				border: "1px solid",
				borderColor: "divider",
				transition: "all 0.2s ease",
				"&:hover": {
					boxShadow: 4,
					transform: "translateY(-2px)",
				},
			}}
		>
			<CardActionArea
				component={RouterLink}
				to={`/vehicles/${v.id}`}
				sx={{ height: "100%", alignItems: "stretch" }}
			>
				{/* Image */}
				<Box sx={{ position: "relative" }}>
					<CardMedia
						component="img"
						height="160"
						image={v.thumbnail}
						alt={v.name}
						sx={{ objectFit: "cover" }}
					/>

					{/* Bookmark */}
					<Box sx={{ position: "absolute", top: 12, right: 12 }}>
						<Tooltip title={isBookmarked ? "Already bookmarked" : "Bookmark"}>
							<span>
								<IconButton
									size="small"
									disabled={isBookmarked || bookmarking}
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										onBookmark(v.id);
									}}
									sx={{
										bgcolor: "background.paper",
										border: "1px solid",
										borderColor: "divider",
										"&:hover": {
											bgcolor: "grey.50",
										},
									}}
								>
									{isBookmarked ? (
										<FavoriteIcon fontSize="small" color="error" />
									) : (
										<FavoriteBorderIcon fontSize="small" />
									)}
								</IconButton>
							</span>
						</Tooltip>
					</Box>
				</Box>

				{/* Content */}
				<CardContent sx={{ p: 2 }}>
					<Stack spacing={1.2}>
						{/* Brand + Fuel */}
						<Stack direction="row" alignItems="flex-start" justifyContent="space-between">
							<Box>
								<Typography variant="subtitle1" fontWeight={700}>
									{v.brand}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{v.name}
								</Typography>
							</Box>

							<Chip
								size="small"
								icon={<LocalGasStationIcon />}
								label={v.fuelType}
								sx={{
									bgcolor: "grey.100",
									fontWeight: 600,
								}}
							/>
						</Stack>

						{/* Price */}
						<Stack direction="row" alignItems="center" spacing={0.5}>
							<CurrencyRupeeIcon fontSize="small" />
							<Typography variant="h6" fontWeight={800}>
								{v.price.toLocaleString("en-IN")}
							</Typography>
						</Stack>
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
