import express from "express";      
import { bookSession, updateSessionStatus, getStudentSessions, getMentorSessions } from "../controllers/sessionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";


const router = express.Router();

// Student books a session
router.post("/book", protect, authorizeRoles("student"), bookSession);

router.get("/me", protect, authorizeRoles("student"), getStudentSessions);
// Mentor updates session status

// Get sessions for logged-in student

// Get sessions for logged-in mentor
router.get("/mentor", protect, authorizeRoles("mentor"), getMentorSessions);
router.put("/:id", protect, authorizeRoles("mentor"), updateSessionStatus);

export default router;