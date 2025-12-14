import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import { Container } from "@mui/material";

export default function Layout() {
	return (
		<>
			<Nav />
			<Container maxWidth="lg" sx={{ py: 3 }}>
				<Outlet />
			</Container>
		</>
	);
}
