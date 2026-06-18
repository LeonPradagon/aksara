import { Router } from "express";
import { getAuditLogs } from "../controllers/auditController";
import { authenticate, authorize } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticate, authorize(["ADMIN"]), getAuditLogs);

export default router;
