import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file manually
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...values] = trimmed.split('=');
      if (key && values.length > 0) {
        process.env[key.trim()] = values.join('=').trim().replace(/^["']|["']$/g, '');
      }
    }
  });
}

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  ssl: { rejectUnauthorized: false },
});

async function runMigration() {
  console.log("Starting DB migration for product_videos & product_prices...");
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    console.log("1. Creating product_videos table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS product_videos (
          id SERIAL PRIMARY KEY,
          url TEXT NOT NULL,
          product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("2. Creating product_prices table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS product_prices (
          id SERIAL PRIMARY KEY,
          setup_fee NUMERIC DEFAULT 0,
          price NUMERIC DEFAULT 0,
          service_charge NUMERIC DEFAULT 0,
          discount NUMERIC DEFAULT 0,
          product_id INTEGER REFERENCES products(id) ON DELETE CASCADE UNIQUE,
          created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("3. Backfilling product_prices and dropping price/discount from products...");
    await client.query(`
      DO $$
      BEGIN
          IF EXISTS (
              SELECT 1 FROM information_schema.columns 
              WHERE table_name='products' AND column_name='price'
          ) THEN
              INSERT INTO product_prices (product_id, price, discount)
              SELECT id, COALESCE(price, 0), COALESCE(discount, 0)
              FROM products p
              ON CONFLICT (product_id) DO NOTHING;

              ALTER TABLE products DROP COLUMN IF EXISTS price;
              ALTER TABLE products DROP COLUMN IF EXISTS discount;
          END IF;
      END $$;
    `);

    await client.query("COMMIT");
    console.log("✅ DB Migration completed successfully!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ DB Migration failed:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
