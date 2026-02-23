const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function updateDb() {
  try {
    await client.connect();
    console.log("Adding pdf_url column to articles table...");
    await client.query(
      "ALTER TABLE articles ADD COLUMN IF NOT EXISTS pdf_url TEXT;",
    );
    console.log("Column added successfully!");
    await client.end();
  } catch (err) {
    console.error("Database update error:", err.stack);
    process.exit(1);
  }
}

updateDb();
