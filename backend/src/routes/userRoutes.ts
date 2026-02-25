import { Router } from "express";
import {
  getAllUsers,
  approveUser,
  rejectUser,
} from "../controllers/userController";
import { authenticate, authorize } from "../middlewares/authMiddleware";

const router = Router();

// Only Admins can manage users
router.get("/", authenticate, authorize(["ADMIN"]), getAllUsers);
router.put("/:id/approve", authenticate, authorize(["ADMIN"]), approveUser);
router.delete("/:id/reject", authenticate, authorize(["ADMIN"]), rejectUser);

export default router;
