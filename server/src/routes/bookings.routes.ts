import { Router } from "express";
import {
	createBookingHandler,
	deleteBookingHandler,
	getBookingByIdHandler,
	listBookingsHandler,
} from "../controllers/bookings.controller";

const router = Router();

router.post("/", createBookingHandler);

router.get("/", listBookingsHandler);

router.get("/:id", getBookingByIdHandler);
router.delete("/:id", deleteBookingHandler);

export default router;
