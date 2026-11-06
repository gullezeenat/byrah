// Shared helper for the stock/order functions. Keys come from Vercel environment variables.
export function supabaseConfig() {
  let url = (process.env.SUPABASE_URL || "").trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  if (!url || !key) return null;
  // Accept "xxxx.supabase.co", "https://xxxx.supabase.co/" and ".../rest/v1" pasted by mistake.
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  url = url.replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
  const headers = { apikey: key, "Content-Type": "application/json" };
  // Old-style keys are JWTs (start with "eyJ") and go in Authorization too.
  // New-style secret keys (sb_secret_...) are not JWTs and must only be sent as "apikey".
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;
  return { url, key, headers };
}

// Reads Supabase's error body so problems are visible in Vercel logs and /api/health.
export async function describeError(response) {
  let text = "";
  try { text = (await response.text()).slice(0, 300); } catch { /* ignore */ }
  return `HTTP ${response.status} ${text}`;
}
