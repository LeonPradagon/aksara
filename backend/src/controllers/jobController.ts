import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { activeOnly } = req.query;
    const filter = activeOnly === "true" ? { isActive: true } : {};
    
    const jobs = await prisma.jobOpening.findMany({
      where: filter,
      orderBy: { createdAt: "desc" },
    });
    
    res.json(jobs);
  } catch (error) {
    console.error("Get Jobs Error:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const job = await prisma.jobOpening.findUnique({ where: { id } });
    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }
    res.json(job);
  } catch (error) {
    console.error("Get Job By Id Error:", error);
    res.status(500).json({ message: "Failed to fetch job" });
  }
};

export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, type, location, description, isActive } = req.body;
    
    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    const job = await prisma.jobOpening.create({
      data: {
        title,
        type: type || null,
        location: location || null,
        description: description || null,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({ message: "Failed to create job" });
  }
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { title, type, location, description, isActive } = req.body;

    const job = await prisma.jobOpening.update({
      where: { id },
      data: {
        title,
        type: type !== undefined ? type : undefined,
        location: location !== undefined ? location : undefined,
        description: description !== undefined ? description : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    });

    res.json(job);
  } catch (error) {
    console.error("Update Job Error:", error);
    res.status(500).json({ message: "Failed to update job" });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    await prisma.jobOpening.delete({ where: { id } });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete Job Error:", error);
    res.status(500).json({ message: "Failed to delete job" });
  }
};
