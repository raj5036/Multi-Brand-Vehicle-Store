import { Link, NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
	`px-3 py-2 rounded ${isActive ? "bg-black text-white" : "text-black"}`;

export default function Layout() {
	return (
		<div style={{ fontFamily: "system-ui", maxWidth: 1100, margin: "0 auto", padding: 16 }}>
			<header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Link to="/" style={{ textDecoration: "none", color: "black" }}>
					<h2 style={{ margin: 0 }}>Turno Vehicles</h2>
				</Link>

				<nav style={{ display: "flex", gap: 8 }}>
					<NavLink to="/" className={linkClass} end>Catalog</NavLink>
					<NavLink to="/bookmarks" className={linkClass}>Bookmarks</NavLink>
					<NavLink to="/bookings" className={linkClass}>My Bookings</NavLink>
					<NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
					<NavLink to="/admin" className={linkClass}>Admin</NavLink>
				</nav>
			</header>

			<div style={{ height: 16 }} />
			<Outlet />
		</div>
	);
}
