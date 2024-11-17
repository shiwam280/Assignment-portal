import express from "express";
import { register, login, admins } from "../controllers/userController.js";
import { upload } from "../controllers/assignmentController.js";
import { authenticate } from "../middlewares/authenticate.js";
import {
  validateAssignment,
  validateLogin,
  validateRegistration,
} from "../utils/validators.js";

const router = express.Router();

router.get("/admins", authenticate, admins);
router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.post("/upload", validateAssignment, authenticate, upload);

export default router;
