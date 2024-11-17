import express from "express";
import {
  viewAssignments,
  updateAssignmentStatus,
} from "../controllers/adminController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateAssignmentStatus } from "../utils/validators.js";

const router = express.Router();

router.get("/assignments", authenticate, viewAssignments);
router.post(
  "/assignments/:id",
  authenticate,
  validateAssignmentStatus,
  updateAssignmentStatus
);

export default router;
