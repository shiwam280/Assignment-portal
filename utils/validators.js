import { body, validationResult } from "express-validator";

export const validateRegistration = [
  body("username").isString().notEmpty().withMessage("Username is required."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  body("role")
    .isIn(["User", "Admin"])
    .withMessage("Role must be either 'User' or 'Admin'."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  body("username").isString().notEmpty().withMessage("Username is required."),
  body("password").notEmpty().withMessage("Password is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateAssignment = [
  body("task").isString().notEmpty().withMessage("Task is required."),
  body("adminId").isMongoId().withMessage("Valid admin ID is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateAssignmentStatus = [
  body("status")
    .isIn(["Accepted", "Rejected"])
    .withMessage("Status must be either 'Accepted' or 'Rejected'."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
