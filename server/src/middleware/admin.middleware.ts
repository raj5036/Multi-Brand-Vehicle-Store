import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

export function adminGuard(req: Request, res: Response, next: NextFunction) {
	const token = req.header("x-admin-token");
	if (token !== env.adminToken) return res.status(401).json({ error: "Unauthorized" });
	next();
}
