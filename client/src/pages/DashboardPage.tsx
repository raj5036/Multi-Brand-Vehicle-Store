import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import { useSummary } from "../hooks/summary.hooks";

export default function DashboardPage() {
	const { data, isLoading, isError } = useSummary();

	if (isLoading) return <Loading />;
	if (isError || !data) return <ErrorState message="Failed to load summary" />;

	const brands = Object.keys(data);

	return (
		<div>
			<h3 style={{ marginTop: 0 }}>Inventory Summary</h3>

			<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
				{brands.map((brand) => {
					const fuels = data[brand];
					const total = Object.values(fuels).reduce((a, b) => a + b, 0);

					return (
						<div key={brand} style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
							<div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
								<div style={{ fontWeight: 800, fontSize: 16 }}>{brand}</div>
								<div style={{ fontWeight: 800 }}>{total}</div>
							</div>

							<div style={{ height: 10 }} />
							{Object.entries(fuels).map(([fuel, count]) => (
								<div key={fuel} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: "1px solid #f2f2f2" }}>
									<div style={{ opacity: 0.8 }}>{fuel}</div>
									<div style={{ fontWeight: 700 }}>{count}</div>
								</div>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
}
