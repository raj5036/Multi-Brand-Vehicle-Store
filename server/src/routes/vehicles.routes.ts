import { Router } from "express";
import {
	createVehicleHandler,
	getVehicleByIdHandler,
	getVehicleSummaryHandler,
	listVehiclesHandler,
} from "../controllers/vehicles.controller";
import { adminGuard } from "../middleware/admin.middleware";

const router = Router();

router.get("/summary", getVehicleSummaryHandler);

router.get("/", listVehiclesHandler);
router.get("/:id", getVehicleByIdHandler);
router.post("/", adminGuard, createVehicleHandler);

export default router;
