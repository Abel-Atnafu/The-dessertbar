-- ============================================================
--  THE DESSERT BAR — Fix ALL image URLs
--  Patches by item name — safe to run anytime, works regardless
--  of whether the DB was seeded via Prisma (CUIDs) or neon-setup.sql (fixed IDs)
--  Run this in Neon SQL Editor
-- ============================================================

-- ── MENU ITEMS ────────────────────────────────────────────────────────────────

-- Whole Cakes
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Torta Chocolate Cake';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Torta Cheese Cake';

-- Slices
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Chocolate Cake Slice';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Cheese Cake Slice';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Brownie Cake Slice';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Lemon Cake Slice';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Tiramisu';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Fasting Chocolate Cake';

-- Desserts
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Brownie with Ice Cream';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop' WHERE "name" ILIKE '%Cookie Skillet%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Freak Shake';

-- Pastries
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Croissant Sandwich';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Cinnamon Oats%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Fasting Donut';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Fasting Cinnamon Roll';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Cheese Donut';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Chocolate Chip Cookies';

-- Drinks
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Mango Smoothie';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Strawberry Mojito';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Frozen Lemonade';

-- Specials
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Afternoon Tea';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop' WHERE "name" ILIKE 'Waffle Omelette';

-- ── GALLERY IMAGES ────────────────────────────────────────────────────────────
-- Fix local /images/* paths that won't load on production

UPDATE "GalleryImage" SET "url" = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop'
  WHERE "url" LIKE '/images/cafe-interior%' OR "caption" ILIKE '%elegant dining%' OR "caption" ILIKE '%interior%';

UPDATE "GalleryImage" SET "url" = 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop'
  WHERE "url" LIKE '/images/cookie-skillet%' OR "caption" ILIKE '%Cookie Skillet%';

UPDATE "GalleryImage" SET "url" = 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop'
  WHERE "url" LIKE '/images/mango%' OR "caption" ILIKE '%Mango Smoothie%';
