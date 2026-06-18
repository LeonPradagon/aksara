import { query } from "../config/db";
import { v4 as uuidv4 } from "uuid";

export const logAction = async (
  action: string,
  entity_type: string,
  entity_id: string,
  user_name: string = "System",
  details: string = ""
) => {
  try {
    const id = uuidv4();
    await query(
      "INSERT INTO audit_logs (id, action, entity_type, entity_id, user_name, details) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, action, entity_type, entity_id, user_name, details]
    );
  } catch (error) {
    console.error("Failed to log audit action:", error);
  }
};
