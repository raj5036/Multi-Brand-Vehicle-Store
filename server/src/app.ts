import express, { Application, Request, Response } from "express";
import cors from "cors";
import { notFoundMiddleware } from "./middleware/notFound.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
import apiRouter from "./routes/index";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
	res.status(200).json({ status: "ok" });
});
app.use("/api", apiRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
