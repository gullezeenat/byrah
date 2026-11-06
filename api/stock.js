import { supabaseConfig, describeError } from "./_supabase.js";

// GET /api/stock -> { "<productId>": { "<colour or ''>": quantity } }
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  const config = supabaseConfig();
  if (!config) return res.status(503).json({ error: "Stock database is not configured." });
  try {
    let rows = null;
    let detail = "";
    // Preferred: the get_stock() database function (works with any key).
    const viaFunction = await fetch(`${config.url}/rest/v1/rpc/get_stock`, { method: "POST", headers: config.headers, body: "{}" });
    if (viaFunction.ok) {
      rows = await viaFunction.json();
    } else {
      detail = `get_stock: ${await describeError(viaFunction)}`;
      // Fallback: read the table directly.
      const viaTable = await fetch(`${config.url}/rest/v1/stock?select=product_id,color,quantity&limit=5000`, { headers: config.headers });
      if (viaTable.ok) rows = await viaTable.json();
      else detail += ` | table: ${await describeError(viaTable)}`;
    }
    if (!Array.isArray(rows)) {
      console.error("stock read failed:", detail);
      return res.status(502).json({ error: "Could not read stock.", detail });
    }
    const map = {};
    for (const row of rows) {
      const bucket = (map[row.product_id] ||= {});
      bucket[row.color] = (bucket[row.color] || 0) + Number(row.quantity || 0);
    }
    return res.status(200).json(map);
  } catch (error) {
    console.error("stock read crashed:", error);
    return res.status(502).json({ error: "Could not read stock.", detail: String(error?.message || error) });
  }
}
