import { supabaseConfig, describeError } from "./_supabase.js";

// POST /api/order
// { reference, customer:{name,phone,email,address,city,notes}, items:[{productId,color,quantity,name,label,price}], subtotal, delivery, total }
// Takes the pieces out of stock and saves the order in one safe step.
// 200 ok | 409 not enough stock | 400 bad request | 502/503 stock service problem.
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST." });
  const config = supabaseConfig();
  if (!config) return res.status(503).json({ error: "Stock database is not configured." });

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body;
  const raw = Array.isArray(body?.items) ? body.items : [];
  const totals = new Map();
  const lines = [];
  for (const item of raw.slice(0, 60)) {
    const productId = text(item?.productId, 120);
    const color = text(item?.color, 80);
    const quantity = Number(item?.quantity);
    if (!productId || !Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
      return res.status(400).json({ error: "Invalid order items." });
    }
    const key = `${productId}\u0000${color}`;
    totals.set(key, { productId, color, quantity: (totals.get(key)?.quantity || 0) + quantity });
    lines.push({ productId, name: text(item?.name, 160), label: text(item?.label, 160), quantity, price: whole(item?.price) });
  }
  if (!totals.size) return res.status(400).json({ error: "Your bag is empty." });
  const items = [...totals.values()].sort((a, b) => (a.productId + a.color).localeCompare(b.productId + b.color));

  const customer = body?.customer || {};
  const details = {
    reference: text(body?.reference, 40),
    name: text(customer.name, 120),
    phone: text(customer.phone, 40),
    email: text(customer.email, 160),
    address: text(customer.address, 400),
    city: text(customer.city, 80),
    notes: text(customer.notes, 600),
    lines,
    subtotal: whole(body?.subtotal),
    delivery: whole(body?.delivery),
    total: whole(body?.total),
  };

  try {
    const response = await fetch(`${config.url}/rest/v1/rpc/place_order`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({ items, details }),
    });
    if (!response.ok) {
      console.error("place_order failed:", await describeError(response));
      return res.status(502).json({ error: "Could not update stock." });
    }
    const result = await response.json();
    if (!result.ok) return res.status(409).json({ error: "Not enough stock.", shortages: result.shortages || [] });
    if (result.untracked?.length) console.warn("Products without a stock row (not deducted):", JSON.stringify(result.untracked));
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("place_order crashed:", error);
    return res.status(502).json({ error: "Could not update stock." });
  }
}

function text(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function whole(value) {
  const n = Math.round(Number(value));
  return Number.isFinite(n) && n >= 0 && n < 100000000 ? n : 0;
}
function safeParse(raw) {
  try { return JSON.parse(raw); } catch { return null; }
}
