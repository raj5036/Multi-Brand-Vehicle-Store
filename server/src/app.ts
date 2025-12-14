import express, { Application, Request, Response } from "express";
import cors from "cors";
import { notFoundMiddleware } from "./middleware/notFound.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
import apiRouter from "./routes/index";
import path from "node:path";

const app: Application = express();
const clientBuildPath = path.join(__dirname, "../../client/dist");

app.use(cors());
app.use(express.json());
app.use(express.static(clientBuildPath));

app.get("/health", (_req: Request, res: Response) => {
	res.status(200).json({ status: "ok" });
});
app.use("/api", apiRouter);
app.get("/{*splat}", (_req, res) => {
	res.sendFile(path.join(clientBuildPath, "index.html"));
});
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
