# Live stock setup (Supabase + Vercel)

Order dabate hi stock database mein kam ho jata hai, phir WhatsApp khulta hai.
Ye sirf **ek baar** setup karna hai (10-15 minute).

## 1. Supabase project banayein
1. https://supabase.com par free account banayein, **New project** dabayein.
2. Naam: `rah-store`, ek database password likh kar rakh lein, region apke qareeb wala chunein, **Create**.

## 2. Stock table banayein
1. Left menu mein **SQL Editor** kholein, **New query**.
2. Is project ki file `supabase/setup.sql` ka poora text copy karke paste karein aur **Run** dabayein.
3. "Success" aana chahiye. Ab left menu **Table Editor → stock** mein sab products ka stock nazar aayega.

## 3. Do keys copy karein
**Project Settings → API** (ya "Data API") mein se:
- **Project URL** (https://xxxx.supabase.co)
- **service_role** key (secret). Ye kisi ko mat dikhayein aur kabhi code mein na likhein.

## 4. Vercel mein keys daalein
Vercel project → **Settings → Environment Variables**, do variables add karein (Production + Preview):
- `SUPABASE_URL` = Project URL
- `SUPABASE_SERVICE_ROLE_KEY` = service_role key

Phir **Deployments → (latest) → Redeploy** karein.

## 5. Check karein
- Website kholen aur ek product ka order dein (WhatsApp wala button). Supabase **Table Editor → stock** mein us product ka number kam ho jana chahiye.
- Jis colour ka quantity 0 ho wo website par "Out of stock" dikhega.

## Rozana kaam
- **Naya maal aaya / order cancel hua:** Table Editor → stock mein us row ka `quantity` number badal dein. Website par kuch minute (ya page refresh) mein update ho jata hai.
- **Naya product add kiya:** pehle website code mein product add karein, phir `stock` table mein nayi row dalein (`product_id` = product ka id, `color` = colour ka naam ya khali chhor dein agar sirf aik colour hai).

## Zaroori baatein
- Agar stock service band ho ya reach na ho to order phir bhi WhatsApp par chala jata hai (sale zaya nahi hoti), lekin us waqt stock kam nahi hota.
- Agar do customers aik hi aakhri piece ek saath order karein, to sirf pehle ka order jata hai, doosre ko "only N left" ka message milta hai.
- `npm run dev` (local) par stock service nahi hoti, to code mein likhe numbers hi chalte hain.
- Code wali `inventory` list (`src/data/catalog.ts`) ab sirf starting/backup numbers hain. Asli stock Supabase mein hai.
