import { supabaseConfig, describeError } from "./_supabase.js";

// GET /api/health -> tells you exactly what is (not) working. Open it in the browser:
//   https://YOUR-SITE/api/health
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const report = { ok: false, env: { SUPABASE_URL: !!process.env.SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY } };
  const config = supabaseConfig();
  if (!config) {
    report.problem = "Environment variables are missing. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel > Settings > Environment Variables (Production), then Redeploy.";
    return res.status(200).json(report);
  }
  report.keyType = config.key.startsWith("sb_publishable_") || config.key.startsWith("sb_secret_") ? config.key.split("_").slice(0, 2).join("_") : config.key.startsWith("eyJ") ? "jwt" : "unknown";
  if (report.keyType === "sb_publishable") {
    report.problem = "You pasted the PUBLISHABLE (anon) key. Use the SECRET key (or the legacy service_role key) instead.";
    return res.status(200).json(report);
  }
  try {
    report.url = config.url.replace(/^(https:\/\/)(.{3}).*(\.supabase\.co)$/, "$1$2***$3");
    const stock = await fetch(`${config.url}/rest/v1/stock?select=product_id&limit=1`, { headers: config.headers });
    report.stockTable = stock.ok ? "ok" : await describeError(stock);
    const orders = await fetch(`${config.url}/rest/v1/orders?select=id&limit=1`, { headers: config.headers });
    report.ordersTable = orders.ok ? "ok" : await describeError(orders);
    const fn = await fetch(`${config.url}/rest/v1/rpc/place_order`, { method: "POST", headers: config.headers, body: JSON.stringify({ items: [], details: {} }) });
    report.placeOrderFunction = fn.ok ? "ok" : await describeError(fn);
    if (stock.ok) {
      const count = await fetch(`${config.url}/rest/v1/stock?select=product_id`, { headers: { ...config.headers, Prefer: "count=exact", Range: "0-0" } });
      report.stockRows = count.headers.get("content-range") || null;
    }
    report.ok = stock.ok && orders.ok && fn.ok;
    if (!report.ok) report.problem = "Open supabase/setup.sql, paste the whole file in Supabase > SQL Editor and press Run again. If a table says 401/403 the key is wrong (use the secret / service_role key).";
  } catch (error) {
    report.problem = `Could not reach Supabase: ${error?.message || error}. Check SUPABASE_URL (it looks like https://xxxx.supabase.co).`;
  }
  return res.status(200).json(report);
}
