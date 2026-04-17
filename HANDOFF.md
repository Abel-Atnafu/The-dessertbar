# The Dessert Bar — Developer Handoff Document

**Last updated:** April 2026  
**Current branch:** `claude/merge-admin-fixes-production-xxedf`  
**Production (admin):** the-dessertbar-admin.vercel.app ← still running old code until merge  
**Production (web):** the-dessertbar.vercel.app  
**Preview (admin):** the-dessertbar-admin-34jsczr2y-abel-atnafus-projects.vercel.app ← has all recent fixes

---

## Architecture

```
┌─────────────────┐     ┌──────────────────────┐
│  apps/web        │     │  apps/admin           │
│  port 3000       │     │  port 3001            │
│  Next.js 14      │     │  Next.js 14           │
│  Customer site   │     │  Admin dashboard      │
└────────┬────────┘     └──────────┬────────────┘
         │                          │
         └──────────┬───────────────┘
                    │
           ┌────────▼────────┐
           │  packages/db     │
           │  Prisma ORM      │
           │  @dessertbar/db  │
           └────────┬────────┘
                    │
           ┌────────▼────────┐
           │  Neon PostgreSQL │
           │  (cloud DB)      │
           └─────────────────┘

Hosting: Vercel (two separate projects)
Auth:    JWT in httpOnly cookie — admin only, no customer accounts
Payments: Manual verification (Telebirr screenshot upload)
```

**Tech stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma ORM · PostgreSQL (Neon) · JWT (jose) · bcryptjs · Radix UI · Framer Motion (web only)

---

## Monorepo Structure

```
/
├── apps/
│   ├── admin/          Next.js admin dashboard (port 3001)
│   └── web/            Next.js customer site (port 3000)
├── packages/
│   └── db/             Shared Prisma client (@dessertbar/db)
├── neon-setup.sql      Run once in Neon console to bootstrap DB
├── fix-all-images.sql  One-time image URL fix
└── update-images.sql   One-time image update
```

---

## Local Development Setup

```bash
# 1. Install all dependencies (run from repo root)
npm install

# 2. Set up environment variables
cp apps/admin/.env.example apps/admin/.env.local
cp apps/web/.env.example apps/web/.env.local
# Fill in DATABASE_URL and JWT_SECRET in both files

# 3. Generate Prisma client
npx prisma generate --schema=packages/db/prisma/schema.prisma

# 4. Push schema to your database
npx prisma db push --schema=packages/db/prisma/schema.prisma

# 5. (Optional) Seed with sample data
npm run db:seed

# 6. Run apps
npm run dev:web     # → http://localhost:3000
npm run dev:admin   # → http://localhost:3001

# Prisma visual editor
npm run db:studio   # → http://localhost:5555
```

---

## Environment Variables

| Variable | Used by | Required | Notes |
|---|---|---|---|
| `DATABASE_URL` | Both apps, packages/db | Yes | Neon pooler URL — never commit |
| `JWT_SECRET` | apps/admin | Yes | Set in Vercel as `dessertbar-secret-key-2026-addis` — keep private |

Both apps need `DATABASE_URL`. Only admin needs `JWT_SECRET`.

---

## Database Schema (Prisma)

**Location:** `packages/db/prisma/schema.prisma`

| Model | Key fields |
|---|---|
| `MenuItem` | name, price, category, image, available, featured |
| `Order` | customerName, email, phone, total, status, paymentMethod, paymentReference, paymentScreenshot |
| `OrderItem` | orderId, menuItemId, quantity, price |
| `Reservation` | name, email, phone, date, time, guests, status |
| `GalleryImage` | url, caption, sortOrder |
| `Admin` | email (unique), password (bcrypt hash) |
| `ContactMessage` | name, email, message, read |

**Order statuses:** `pending` → `confirmed` → `ready` → `completed` (or `cancelled`)

### Database commands

```bash
# Push schema changes without a migration file (preferred for quick fixes)
npx prisma db push --schema=packages/db/prisma/schema.prisma

# Create a named migration
npm run db:migrate

# Open visual editor
npm run db:studio
```

---

## What Was Done (Verified Against Code)

| Fix | File | Verified |
|---|---|---|
| React key bug on Orders page | apps/admin/src/app/orders/OrdersClient.tsx | Yes |
| Admin email removed from login page | apps/admin/src/app/login/page.tsx | Yes |
| Revenue no longer counts cancelled orders | apps/admin/src/app/page.tsx | Yes |
| Error handling on client fetch calls | OrdersClient.tsx, MenuClient.tsx | Yes |
| `window.confirm()` replaced with inline UI | apps/admin/src/app/messages/MessagesClient.tsx | Yes |
| CSS `@import` order fixed | apps/admin/src/app/globals.css | Yes |
| All admin pages crash-protected on DB error | apps/admin/src/app/*/page.tsx | Yes |
| Prisma singleton reused across requests | packages/db/src/index.ts | Yes |
| Telebirr payment + screenshot upload | apps/web/src/app/order/OrderClient.tsx | Yes |
| Contact form inbox added to admin | apps/admin/src/app/messages/ | Yes |

---

## Open Issues (Still Need Fixing)

### Security — CRITICAL

**Admin API routes are still unprotected.**

`apps/admin/src/middleware.ts` line 12:
```typescript
if (pathname.startsWith("/login") || pathname.startsWith("/api")) {
  return NextResponse.next();  // ← all /api/* bypass JWT check
}
```

Any unauthenticated request can call `/api/orders`, `/api/menu`, `/api/gallery`, etc. and read or mutate data. The middleware was partially fixed (UI pages are protected) but API routes were left out.

**Fix options:**
1. Remove `/api` from the bypass in middleware, and handle CORS/public routes explicitly
2. Add `verifyToken()` at the top of each API route handler individually

| Issue | Severity | File | Status |
|---|---|---|---|
| All /api routes bypass JWT auth | Critical | apps/admin/src/middleware.ts:12 | OPEN |
| No rate limiting on login | Medium | apps/admin/src/app/api/auth/login/route.ts | OPEN |
| JWT_SECRET fallback `"dessertbar-secret"` | Medium | apps/admin/src/middleware.ts:5 | OK if env var is set in Vercel |

### Deployment — `prisma db push` Missing from Build

`apps/admin/vercel.json` current buildCommand:
```json
"buildCommand": "cd ../.. && npx prisma generate --schema=packages/db/prisma/schema.prisma && cd apps/admin && npm run build"
```

`prisma db push` is **not** there yet. New DB tables won't be created on redeploy unless added.

**Fix:** Update buildCommand to:
```json
"buildCommand": "cd ../.. && npx prisma generate --schema=packages/db/prisma/schema.prisma && npx prisma db push --schema=packages/db/prisma/schema.prisma --accept-data-loss && cd apps/admin && npm run build"
```

### Other Known Limitations

- OrdersClient, MessagesClient: No user-visible error feedback when API calls fail (silent failures)
- No order confirmation email or SMS to customers after ordering
- Menu items with `available: false` can still be ordered (no frontend guard)
- No customer accounts — all orders are guest orders
- Telebirr payment is manual verification only (no API integration)

---

## Deployment Runbook

Follow these steps in order to get production up to date:

1. Fix `prisma db push` in `apps/admin/vercel.json` (see above)
2. Fix admin API security in `apps/admin/src/middleware.ts` (see above)
3. Merge `claude/merge-admin-fixes-production-xxedf` → `main`
4. Verify Vercel environment variables for both projects:
   - `DATABASE_URL` (Neon pooler URL)
   - `JWT_SECRET` (admin project only)
5. Redeploy both Vercel projects (or they will auto-deploy on merge)
6. Verify admin login works at the-dessertbar-admin.vercel.app/login
7. Verify customer site at the-dessertbar.vercel.app
8. Place a test order on the web app and confirm it appears in admin Orders page
9. Check Neon console that all 7 tables exist (MenuItem, Order, OrderItem, Reservation, GalleryImage, Admin, ContactMessage)

---

## Feature Backlog

Features are sorted by business priority for an Addis Ababa dessert bar.

### P1 — Deal-breakers (high revenue impact)

| Feature | Effort | Notes |
|---|---|---|
| Custom cake order form | 3–4 days | New page + DB model: size, flavor, design notes, delivery/pickup date. Admin view to manage requests. |
| Amharic language toggle | 2–3 days | Use `next-intl` or a simple React context with a JSON translation file. Toggle in Navbar. |
| Order confirmation email | 1 day | Use Resend (free tier). Send on order creation in `apps/web/src/app/api/orders/route.ts`. |
| Order status tracking page | 2 days | `/track/[orderId]` on web app. Polls or static page showing current status. |
| CBE Birr / HelloCash payment | 2 days | Same manual screenshot pattern as Telebirr. Add to payment method options in OrderClient. |

### P2 — Important differentiators

| Feature | Effort | Notes |
|---|---|---|
| WhatsApp floating button | 2 hours | Single fixed-position component with business phone number. |
| Scheduled pickup time | 1 day | Add date + time picker to order form. Store on Order model. |
| Out-of-stock label on menu | 2 hours | Check `available` flag in MenuClient and show badge / disable add-to-cart. |
| Real customer reviews | 1 day | New `Review` DB model + admin approval toggle + display on homepage. |
| Daily specials banner | 1 day | Admin toggle on a MenuItem + prominent banner on web homepage. |

### P3 — Nice to have

| Feature | Effort | Notes |
|---|---|---|
| WhatsApp order button | 3 hours | Pre-filled WhatsApp message with cart contents. |
| Instagram feed on homepage | 3 hours | Instagram Basic Display API embed. |
| Dietary labels (vegan, gluten-free) | 2 hours | Add boolean flags to MenuItem schema + display on menu. |
| Catering / events inquiry | 1 day | Simple form → ContactMessage with category field. |
| Loyalty stamp card | 3 days | Requires customer accounts first. |
| Gift cards | 3 days | Voucher codes + redemption logic on checkout. |

---

## Admin Panel Pages

| Route | File | Description |
|---|---|---|
| `/` | apps/admin/src/app/page.tsx | Dashboard: revenue, order stats, recent orders |
| `/login` | apps/admin/src/app/login/page.tsx | Email/password login |
| `/menu` | apps/admin/src/app/menu/ | Add/edit/delete menu items |
| `/orders` | apps/admin/src/app/orders/ | View/update order status, see payment proof |
| `/reservations` | apps/admin/src/app/reservations/ | View/manage table reservations |
| `/gallery` | apps/admin/src/app/gallery/ | Upload/manage gallery images |
| `/messages` | apps/admin/src/app/messages/ | Contact form inbox (mark read, delete) |

All pages are protected by JWT middleware except `/login`.

## Customer Site Pages

| Route | File | Description |
|---|---|---|
| `/` | apps/web/src/app/page.tsx | Homepage: hero, featured items, about, testimonials |
| `/menu` | apps/web/src/app/menu/ | Browse full menu, add to cart |
| `/order` | apps/web/src/app/order/ | Checkout with Telebirr / cash on pickup |
| `/reservations` | apps/web/src/app/reservations/ | Book a table |
| `/gallery` | apps/web/src/app/gallery/ | Photo gallery |
| `/about` | apps/web/src/app/about/ | About page |
| `/contact` | apps/web/src/app/contact/ | Contact form (goes to admin Messages inbox) |

---

## Useful Commands

```bash
# Development
npm run dev:web          # Customer site on :3000
npm run dev:admin        # Admin panel on :3001

# Database
npm run db:generate      # Regenerate Prisma client after schema change
npm run db:migrate       # Create + run a named migration
npm run db:seed          # Seed menu items and admin account
npm run db:studio        # Open Prisma Studio on :5555

# Build
npm run build:web
npm run build:admin
```

---

## Key Source Files

| File | Purpose |
|---|---|
| `packages/db/prisma/schema.prisma` | Single source of truth for DB schema |
| `packages/db/src/index.ts` | Prisma singleton (imported as `@dessertbar/db`) |
| `apps/admin/src/middleware.ts` | JWT auth guard — needs security fix |
| `apps/admin/src/lib/auth.ts` | `signToken()` / `verifyToken()` helpers |
| `apps/admin/src/lib/utils.ts` | `cn()`, `formatPrice()` (ETB), `formatDate()` |
| `apps/admin/vercel.json` | Build command — needs `prisma db push` |
| `apps/web/src/context/CartContext.tsx` | Cart state (quantity, add/remove) |
| `neon-setup.sql` | One-time DB bootstrap SQL (run in Neon console) |
