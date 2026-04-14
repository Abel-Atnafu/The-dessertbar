-- ============================================================
--  THE DESSERT BAR — Update Menu Item Images
--  Run this in Neon SQL Editor if you already ran neon-setup.sql
-- ============================================================

-- Fix Croissant Sandwich (was wrongly showing mango image)
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop' WHERE "id" = 'm12';

-- Fix Mango Smoothie (use proper smoothie photo)
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop' WHERE "id" = 'm18';

-- Differentiate Fasting Chocolate Cake from Torta
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop' WHERE "id" = 'm08';

-- Differentiate Cheese Donut from Fasting Donut
UPDATE "MenuItem" SET "image" = 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop' WHERE "id" = 'm16';
