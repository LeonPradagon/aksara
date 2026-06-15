import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap: Record<string, string> = {};
    
    settings.forEach((s: any) => {
      settingsMap[s.key] = s.value;
    });

    res.json(settingsMap);
  } catch (error) {
    console.error("Get Settings Error:", error);
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};

export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);
    let { settings } = req.body; // Expecting an object of key-value pairs
    
    if (typeof settings === "string") {
      try {
        settings = JSON.parse(settings);
      } catch (e) {
        res.status(400).json({ message: "Invalid settings JSON format" });
        return;
      }
    }

    if (!settings || typeof settings !== "object") {
      res.status(400).json({ message: "Invalid settings data" });
      return;
    }

    // We can also have files uploaded via multer in req.files
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    const updates = [];

    // Process normal text settings
    for (const [key, value] of Object.entries(settings)) {
      if (typeof value === "string") {
        updates.push(
          prisma.siteSetting.upsert({
            where: { key },
            update: { value },
            create: { key, value },
          })
        );
      }
    }

    // Process file uploads
    if (files) {
      if (files.home_hero_image_1 && files.home_hero_image_1[0]) {
        updates.push(
          prisma.siteSetting.upsert({
            where: { key: "home_hero_image_1" },
            update: { value: `/uploads/images/${files.home_hero_image_1[0].filename}` },
            create: { key: "home_hero_image_1", value: `/uploads/images/${files.home_hero_image_1[0].filename}` },
          })
        );
      }
      if (files.home_hero_image_2 && files.home_hero_image_2[0]) {
        updates.push(
          prisma.siteSetting.upsert({
            where: { key: "home_hero_image_2" },
            update: { value: `/uploads/images/${files.home_hero_image_2[0].filename}` },
            create: { key: "home_hero_image_2", value: `/uploads/images/${files.home_hero_image_2[0].filename}` },
          })
        );
      }
      if (files.about_who_we_are_image && files.about_who_we_are_image[0]) {
        updates.push(
          prisma.siteSetting.upsert({
            where: { key: "about_who_we_are_image" },
            update: { value: `/uploads/images/${files.about_who_we_are_image[0].filename}` },
            create: { key: "about_who_we_are_image", value: `/uploads/images/${files.about_who_we_are_image[0].filename}` },
          })
        );
      }
    }

    await prisma.$transaction(updates);

    res.json({ message: "Settings updated successfully" });
  } catch (error) {
    console.error("Update Settings Error:", error);
    res.status(500).json({ message: "Failed to update settings" });
  }
};
