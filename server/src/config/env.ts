export const env = {
	port: process.env.PORT ? Number(process.env.PORT) : 5000,
	adminToken: process.env.ADMIN_TOKEN || "turno_admin_token",
};
