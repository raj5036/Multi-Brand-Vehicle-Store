export default function ErrorState({ message }: { message?: string }) {
	return <div style={{ padding: 12, color: "crimson" }}>{message || "Something went wrong"}</div>;
}
