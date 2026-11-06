import { supabaseConfig } from "./_supabase.js";

// POST /api/order  { items: [{ productId, color, quantity }] }
// Takes the pieces out of stock in one safe step. 409 = not enough stock.
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST." });
  const config = supabaseConfig();
  if (!config) return res.status(503).json({ error: "Stock database is not configured." });

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body;
  const raw = Array.isArray(body?.items) ? body.items : [];
  const totals = new Map();
  for (const item of raw.slice(0, 60)) {
    const productId = typeof item?.productId === "string" ? item.productId.slice(0, 120) : "";
    const color = typeof item?.color === "string" ? item.color.slice(0, 80) : "";
    const quantity = Number(item?.quantity);
    if (!productId || !Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
      return res.status(400).json({ error: "Invalid order items." });
    }
    const key = `${productId}\u0000${color}`;
    totals.set(key, { productId, color, quantity: (totals.get(key)?.quantity || 0) + quantity });
  }
  if (!totals.size) return res.status(400).json({ error: "Your bag is empty." });
  const items = [...totals.values()].sort((a, b) => (a.productId + a.color).localeCompare(b.productId + b.color));

  try {
    const response = await fetch(`${config.url}/rest/v1/rpc/reserve_stock`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({ items }),
    });
    if (!response.ok) return res.status(502).json({ error: "Could not update stock." });
    const result = await response.json();
    if (!result.ok) return res.status(409).json({ error: "Not enough stock.", shortages: result.shortages || [] });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: "Could not update stock." });
  }
}

function safeParse(text) {
  try { return JSON.parse(text); } catch { return null; }
}
