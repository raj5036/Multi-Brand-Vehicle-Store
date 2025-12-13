import { Router } from "express";
import {
	createBookmarkHandler,
	deleteBookmarkHandler,
	listBookmarksHandler,
} from "../controllers/bookmarks.controller";

const router = Router();

router.post("/", createBookmarkHandler);
router.get("/", listBookmarksHandler);
router.delete("/:id", deleteBookmarkHandler);

export default router;
