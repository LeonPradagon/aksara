require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  const result = await pool.query("SELECT * FROM site_settings");
  
  for (const row of result.rows) {
    if (row.value.startsWith("/uploads/") && !row.value.startsWith("/uploads/images/")) {
      const newValue = row.value.replace("/uploads/", "/uploads/images/");
      console.log(`Fixing ${row.key}: ${row.value} -> ${newValue}`);
      await pool.query("UPDATE site_settings SET value = $1 WHERE key = $2", [newValue, row.key]);
    }
  }
  
  console.log("Done fixing URLs in DB.");
  pool.end();
}

main();
