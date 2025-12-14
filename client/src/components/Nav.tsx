import * as React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

type NavItem = {
	label: string;
	to: string;
	icon: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
	{ label: "Catalog", to: "/", icon: <DirectionsCarIcon fontSize="small" /> },
	{ label: "Bookmarks", to: "/bookmarks", icon: <BookmarkBorderIcon fontSize="small" /> },
	{ label: "Bookings", to: "/bookings", icon: <EventSeatIcon fontSize="small" /> },
	{ label: "Dashboard", to: "/dashboard", icon: <DashboardIcon fontSize="small" /> },
	{ label: "Admin", to: "/admin", icon: <AdminPanelSettingsIcon fontSize="small" /> },
];

export default function Nav() {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
	const location = useLocation();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const menuOpen = Boolean(anchorEl);

	const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);

	const isSelected = (to: string) => {
		if (to === "/") return location.pathname === "/";
		return location.pathname.startsWith(to);
	};

	return (
		<AppBar
			position="sticky"
			elevation={0}
			sx={{
				bgcolor: "background.paper",
				color: "text.primary",
				borderBottom: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Container maxWidth="lg">
				<Toolbar disableGutters sx={{ minHeight: 64, gap: 1 }}>
					<Typography
						variant="h6"
						component={RouterLink}
						to="/"
						sx={{
							textDecoration: "none",
							color: "inherit",
							fontWeight: 900,
							letterSpacing: 0.2,
							mr: 1,
						}}
					>
						Vehicle Booking
					</Typography>

					<Box sx={{ flexGrow: 1 }} />

					{/* Desktop links */}
					{isDesktop ? (
						<Box sx={{ display: "flex", gap: 1 }}>
							{NAV_ITEMS.map((item) => (
								<Button
									key={item.to}
									component={RouterLink}
									to={item.to}
									startIcon={item.icon}
									disableElevation
									variant={isSelected(item.to) ? "contained" : "text"}
									sx={{
										textTransform: "none",
										fontWeight: 700,
										borderRadius: 2,
									}}
								>
									{item.label}
								</Button>
							))}
						</Box>
					) : (
						<>
							{/* Mobile hamburger */}
							<IconButton onClick={handleMenuOpen} aria-label="open navigation menu">
								<MenuIcon />
							</IconButton>

							<Menu
								anchorEl={anchorEl}
								open={menuOpen}
								onClose={handleMenuClose}
								anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
								transformOrigin={{ vertical: "top", horizontal: "right" }}
								PaperProps={{
									sx: { mt: 1, borderRadius: 2, minWidth: 220 },
								}}
							>
								{NAV_ITEMS.map((item) => (
									<MenuItem
										key={item.to}
										component={RouterLink}
										to={item.to}
										selected={isSelected(item.to)}
										onClick={handleMenuClose}
										sx={{ gap: 1.25 }}
									>
										{item.icon}
										{item.label}
									</MenuItem>
								))}
							</Menu>
						</>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
