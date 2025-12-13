import { Router } from "express";
import vehiclesRoutes from "./vehicles.routes";
import bookmarksRoutes from "./bookmarks.routes";
// import bookingsRoutes from "./bookings.routes";

const router = Router();

router.use("/vehicles", vehiclesRoutes);
router.use("/bookmarks", bookmarksRoutes);
// router.use("/bookings", bookingsRoutes);

export default router;
