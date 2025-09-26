import express from "express";
import { getMentors} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/mentors", protect, getMentors);

export default router;