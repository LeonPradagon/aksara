import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settingsController";
import { uploadImage } from "../middlewares/uploadMiddleware";

const router = Router();

router.get("/", getSettings);

router.put(
  "/",
  uploadImage.fields([
    { name: "home_hero_image_1", maxCount: 1 },
    { name: "home_hero_image_2", maxCount: 1 },
    { name: "about_who_we_are_image", maxCount: 1 },
  ]),
  updateSettings
);

export default router;
