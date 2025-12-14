import { Link, NavLink, Outlet } from "react-router-dom";

const navCls = ({ isActive }: { isActive: boolean }) =>
	[
		"px-3 py-2 rounded-xl text-sm font-semibold transition",
		isActive ? "bg-black text-white" : "text-zinc-700 hover:bg-zinc-100",
	].join(" ");

export default function Layout() {
	return (
		<div className="min-h-screen bg-zinc-50">
			<div className="max-w-6xl mx-auto px-4 py-5">
				<header className="flex items-center justify-between">
					<Link to="/" className="text-zinc-900 no-underline">
						<div className="text-lg font-extrabold">Turno Vehicles</div>
						<div className="text-xs text-zinc-600">Multi-brand vehicle store</div>
					</Link>

					<nav className="flex gap-2">
						<NavLink to="/" className={navCls} end>Catalog</NavLink>
						<NavLink to="/bookmarks" className={navCls}>Bookmarks</NavLink>
						<NavLink to="/bookings" className={navCls}>My Bookings</NavLink>
						<NavLink to="/dashboard" className={navCls}>Dashboard</NavLink>
						<NavLink to="/admin" className={navCls}>Admin</NavLink>
					</nav>
				</header>

				<main className="mt-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
