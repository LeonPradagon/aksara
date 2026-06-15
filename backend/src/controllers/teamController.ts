import { Request, Response } from "express";
import { query } from "../config/db";
import { v4 as uuidv4 } from "uuid";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getAllTeamMembers = async (req: Request, res: Response) => {
  try {
    const result = await query("SELECT * FROM team_members ORDER BY \"order\" ASC, created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTeamMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await query("SELECT * FROM team_members WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createTeamMember = async (req: AuthRequest, res: Response) => {
  const { name, titleEn, titleId, shortBioEn, shortBioId, bioEn, bioId, type, order } = req.body;
  const photo_url = req.file ? `/uploads/images/${req.file.filename}` : null;

  try {
    const memberId = uuidv4();
    const result = await query(
      `INSERT INTO team_members (
        id, name, title_en, title_id, short_bio_en, short_bio_id, 
        bio_en, bio_id, photo_url, type, "order", created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW()) RETURNING *`,
      [
        memberId, name, titleEn, titleId, shortBioEn, shortBioId, 
        bioEn, bioId, photo_url, type || "ASSOCIATE", parseInt(order) || 0
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTeamMember = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { name, titleEn, titleId, shortBioEn, shortBioId, bioEn, bioId, type, order } = req.body;

  let photo_url = req.body.photo_url;
  if (req.file) {
    photo_url = `/uploads/images/${req.file.filename}`;
  }

  try {
    const result = await query(
      `UPDATE team_members SET 
        name = $1, 
        title_en = $2, 
        title_id = $3, 
        short_bio_en = $4, 
        short_bio_id = $5,
        bio_en = $6, 
        bio_id = $7,
        photo_url = COALESCE($8, photo_url),
        type = $9,
        "order" = $10,
        updated_at = NOW() 
      WHERE id = $11 RETURNING *`,
      [
        name, titleEn, titleId, shortBioEn, shortBioId, 
        bioEn, bioId, photo_url, type || "ASSOCIATE", parseInt(order) || 0, id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Team member not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTeamMember = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const result = await query("DELETE FROM team_members WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res.json({ message: "Team member deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
