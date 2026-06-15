import { Router } from "express";
import {
  getAllTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamController";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { uploadImage } from "../middlewares/uploadMiddleware";

const router = Router();

router.get("/", getAllTeamMembers);
router.get("/:id", getTeamMember);

// Admin-only routes
router.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  uploadImage.single("photo"),
  createTeamMember,
);
router.put(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  uploadImage.single("photo"),
  updateTeamMember,
);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteTeamMember);

export default router;
