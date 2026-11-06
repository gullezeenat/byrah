import { supabaseConfig } from "./supabase.js";

// GET /api/stock -> { "<productId>": { "<colour or ''>": quantity } }
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const config = supabaseConfig();
  if (!config) return res.status(503).json({ error: "Stock database is not configured." });
  try {
    const response = await fetch(`${config.url}/rest/v1/stock?select=product_id,color,quantity&limit=5000`, { headers: config.headers });
    if (!response.ok) return res.status(502).json({ error: "Could not read stock." });
    const rows = await response.json();
    const map = {};
    for (const row of rows) {
      (map[row.product_id] ||= {})[row.color] = row.quantity;
    }
    return res.status(200).json(map);
  } catch {
    return res.status(502).json({ error: "Could not read stock." });
  }
}
