-- ============================================================
--  THE DESSERT BAR — Patch images for ALL menu items by name
--  Handles both the original menu AND any other seeded data
--  Run this in Neon SQL Editor
-- ============================================================

-- ── BY ITEM NAME (case-insensitive) ──────────────────────────

-- Cakes
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%chocolate cake%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%red velvet%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%cheese cake%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%cheesecake%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%strawberry cake%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%lemon cake%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1550461716-dbf266b328a4?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%tiramisu%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%brownie%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%fasting%' AND "name" ILIKE '%cake%';

-- Chocolate Lava / Molten
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%lava%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%molten%';

-- Creme Brulee
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%creme brulee%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%crème brûlée%';

-- Ice Cream & Sundaes
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%sundae%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%ice cream%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1594803294810-c860e5d29e07?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%gelato%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%freak shake%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%milkshake%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%shake%';

-- Waffles & Crepes
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%waffle%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%crepe%';

-- Pastries & Donuts
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%croissant%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%donut%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%doughnut%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1620921568956-c44f4bc71d72?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%cinnamon roll%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%cookie%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%oat%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%bread%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%muffin%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%scone%';

-- Drinks
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%mango%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%mojito%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%strawberry%' AND "category" ILIKE '%drink%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%lemonade%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%juice%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%coffee%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%latte%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%cappuccino%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%smoothie%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%lemon%';

-- Specials
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%afternoon tea%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%omelette%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "name" ILIKE '%omelet%';

-- ── CATEGORY FALLBACKS (for any still-missing images) ────────

UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "category" ILIKE '%cake%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "category" ILIKE '%slice%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "category" ILIKE '%classic%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "category" ILIKE '%ice cream%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "category" ILIKE '%waffle%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "category" ILIKE '%crepe%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "category" ILIKE '%pastry%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "category" ILIKE '%pastries%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "category" ILIKE '%drink%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "category" ILIKE '%dessert%';
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop' WHERE "image" IS NULL AND "category" ILIKE '%special%';

-- ── ABSOLUTE FALLBACK (anything still null) ───────────────────
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop' WHERE "image" IS NULL OR "image" = '';

-- Done — verify results:
SELECT "name", "category", LEFT("image", 60) AS "image_preview" FROM "MenuItem" ORDER BY "category", "name";
