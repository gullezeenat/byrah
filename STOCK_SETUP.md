# Live stock + saved orders (Supabase + Vercel)

Jab customer order button dabata hai:
1. Stock database mein se utni quantity **kam** ho jati hai,
2. Order (naam, phone, address, items, total) database ki **orders** table mein **save** ho jata hai,
3. phir WhatsApp khulta hai (WhatsApp wala tareeqa waisa hi hai).

Jis colour/product ka stock 0 ho jaye, website par wo **Out of stock** dikhta hai.

## Setup (ek baar)
1. supabase.com par project banayein.
2. **SQL Editor → New query**. `supabase/setup.sql` ka POORA text paste karke **Run**. (Dobara run karna bilkul safe hai, stock/orders delete nahi hote.)
3. **Project Settings → API Keys** se:
   - **Project URL** (`https://xxxx.supabase.co`)
   - **Secret key** (`sb_secret_...`) ya purani **service_role** key. **Publishable / anon key MAT use karein.**
4. Vercel → Settings → Environment Variables (Production):
   - `SUPABASE_URL` = Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = secret / service_role key
5. **Deployments → Redeploy** (variables badalne ke baad redeploy zaroori hai).

## Check karna: `/api/health`
Browser mein kholein: `https://apki-website.com/api/health`
Sab theek ho to: `"ok": true`, `stockTable`, `ordersTable`, `placeOrderFunction` teeno `"ok"`.
Agar kuch galat ho to `problem` mein likha aata hai ke kya karna hai.

## Rozana kaam
- **Stock badalna / restock:** Table Editor → `stock` → `quantity` number edit karein.
- **Orders dekhna:** Table Editor → `orders`. `status` column mein new / confirmed / delivered / cancelled likh sakte hain.
- **Order cancel hua:** `stock` mein quantity wapas barha dein, aur `orders` mein status `cancelled` kar dein.
- **Naya product:** website code mein add karein, phir `stock` mein row dalein (`product_id` = product ka id, `color` = colour ya khali).

## Zaroori baatein
- Agar stock service reach na ho to order phir bhi WhatsApp par chala jata hai (sale zaya nahi hoti), lekin us waqt stock kam / order save nahi hota. `/api/health` se check karein.
- Aakhri piece do customers ek saath order karein to sirf pehle ka order jata hai.
- Jis product ki `stock` table mein row nahi, uska stock kam nahi hota.
- `npm run dev` (local) par database nahi hota.
