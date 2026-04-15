-- ============================================================
--  THE DESSERT BAR — Full Database Setup
--  Paste this entire script into Neon SQL Editor and click Run
-- ============================================================

-- 1. CREATE TABLES
CREATE TABLE IF NOT EXISTS "Admin" (
  "id"        TEXT PRIMARY KEY,
  "email"     TEXT UNIQUE NOT NULL,
  "password"  TEXT NOT NULL,
  "name"      TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "MenuItem" (
  "id"          TEXT PRIMARY KEY,
  "name"        TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "price"       DOUBLE PRECISION NOT NULL,
  "category"    TEXT NOT NULL,
  "image"       TEXT,
  "available"   BOOLEAN DEFAULT TRUE,
  "featured"    BOOLEAN DEFAULT FALSE,
  "createdAt"   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Order" (
  "id"           TEXT PRIMARY KEY,
  "customerName" TEXT NOT NULL,
  "email"        TEXT NOT NULL,
  "phone"        TEXT NOT NULL,
  "total"        DOUBLE PRECISION NOT NULL,
  "status"       TEXT DEFAULT 'pending',
  "notes"        TEXT,
  "createdAt"    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "OrderItem" (
  "id"         TEXT PRIMARY KEY,
  "orderId"    TEXT NOT NULL REFERENCES "Order"("id"),
  "menuItemId" TEXT NOT NULL REFERENCES "MenuItem"("id"),
  "quantity"   INTEGER NOT NULL,
  "price"      DOUBLE PRECISION NOT NULL
);

CREATE TABLE IF NOT EXISTS "Reservation" (
  "id"        TEXT PRIMARY KEY,
  "name"      TEXT NOT NULL,
  "email"     TEXT NOT NULL,
  "phone"     TEXT NOT NULL,
  "date"      TEXT NOT NULL,
  "time"      TEXT NOT NULL,
  "guests"    INTEGER NOT NULL,
  "notes"     TEXT,
  "status"    TEXT DEFAULT 'pending',
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "ContactMessage" (
  "id"        TEXT PRIMARY KEY,
  "name"      TEXT NOT NULL,
  "email"     TEXT NOT NULL,
  "message"   TEXT NOT NULL,
  "read"      BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "GalleryImage" (
  "id"        TEXT PRIMARY KEY,
  "url"       TEXT NOT NULL,
  "caption"   TEXT,
  "sortOrder" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- 2. ADMIN USER (password: 209211)
INSERT INTO "Admin" ("id","email","password","name") VALUES
('admin01','admin@thedessertbar.com','$2a$12$tIGt6fTW7UJ0nOYf.r7KlOrk7yO4Qvqi39219oX9BQ.upjxZDM8de','Admin')
ON CONFLICT ("email") DO UPDATE SET "password" = EXCLUDED."password";

-- 3. MENU ITEMS (real menu, prices in ETB)
INSERT INTO "MenuItem" ("id","name","description","price","category","image","available","featured") VALUES
-- Whole Cakes
('m01','Torta Chocolate Cake','A full, celebration-sized chocolate torte — rich dark chocolate layers with silky ganache. Perfect for birthdays and special occasions. Serves 8–10.',2483,'Whole Cakes','https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop',true,false),
('m02','Torta Cheese Cake','A full New York-style cheesecake — thick, creamy, and impossibly smooth on a buttery biscuit base. Serves 8–10.',2483,'Whole Cakes','https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop',true,false),
-- Slices
('m03','Chocolate Cake Slice','A generous slice of our signature chocolate cake — dense, moist layers of cocoa sponge with velvety chocolate buttercream.',373,'Slices','https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop',true,true),
('m04','Cheese Cake Slice','A thick, creamy slice of classic cheesecake on a golden biscuit crust. Perfectly set, lightly tangy, utterly indulgent.',373,'Slices','https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop',true,true),
('m05','Brownie Cake Slice','A thick, fudgy brownie slice — crispy on the outside, soft and gooey within, with chunks of dark chocolate throughout.',300,'Slices','https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop',true,false),
('m06','Lemon Cake Slice','A bright, citrusy lemon sponge with zesty lemon curd filling and a delicate white glaze. Light yet satisfying.',355,'Slices','https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800&auto=format&fit=crop',true,false),
('m07','Tiramisu','Classic Italian tiramisu — layers of espresso-soaked ladyfingers, mascarpone cream, and a dusting of premium cocoa.',355,'Slices','https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop',true,true),
('m08','Fasting Chocolate Cake','Our most talked-about item. A rich, indulgent chocolate cake made entirely without animal products — perfect during fasting season.',391,'Slices','https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop',true,true),
-- Desserts
('m09','Brownie with Ice Cream','A warm, gooey brownie served with a generous scoop of vanilla ice cream and a drizzle of hot chocolate sauce.',537,'Desserts','https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&auto=format&fit=crop',true,true),
('m10','Cookie Skillet & Ice Cream','A loaded cookie waffle skillet topped with scoops of chocolate and vanilla ice cream, an Oreo cookie, rainbow sprinkles, and a chocolate drizzle.',537,'Desserts','https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop',true,true),
('m11','Freak Shake','The ultimate dessert experience — a towering thick shake loaded with a slice of chocolate cake, whipped cream, and chocolate drizzle. Legendary.',729,'Desserts','https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop',true,true),
-- Pastries
('m12','Croissant Sandwich','A flaky, buttery croissant filled with fresh avocado, layered ingredients, and served beautifully on a dark plate.',405,'Pastries','https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop',true,false),
('m13','Cinnamon Oats with Fruit','Warm, creamy cinnamon oats topped with fresh seasonal fruit. A wholesome and comforting start to your morning.',263,'Pastries','https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=800&auto=format&fit=crop',true,false),
('m14','Fasting Donut','A light, golden donut made without animal products — soft, slightly sweet, and perfect for fasting season treats.',192,'Pastries','https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop',true,false),
('m15','Fasting Cinnamon Roll','A soft, spiraled cinnamon roll crafted without dairy — warmly spiced and glazed with a light sugar drizzle.',154,'Pastries','https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&auto=format&fit=crop',true,false),
('m16','Cheese Donut','A pillowy fried donut filled with creamy cheese — slightly savoury, perfectly sweet. One is never enough.',242,'Pastries','https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop',true,false),
('m17','Chocolate Chip Cookies','Fresh-baked cookies packed with dark and milk chocolate chips — crispy edges, chewy centre, served warm.',107,'Pastries','https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop',true,false),
-- Drinks
('m18','Mango Smoothie','Fresh mango blended to a smooth, velvety pour — served chilled in a signature bottle glass, garnished with a fresh mango slice.',237,'Drinks','https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop',true,true),
('m19','Strawberry Mojito','Fresh strawberries muddled with mint, lime, and sparkling water — a refreshing, vibrant non-alcoholic mojito.',237,'Drinks','https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&auto=format&fit=crop',true,false),
('m20','Frozen Lemonade','A thick, icy blend of fresh lemon juice, sugar, and crushed ice. Tangy, sweet, and incredibly refreshing.',390,'Drinks','https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop',true,false),
-- Specials
('m21','Afternoon Tea','An elegant afternoon tea service — a curated tiered selection of cakes, pastries, and light bites. The perfect occasion treat. Serves two.',1998,'Specials','https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop',true,true),
('m22','Waffle Omelette','A savoury waffle omelette — crispy on the outside, fluffy within. A unique fusion brunch item unlike anything else on the menu.',506,'Specials','https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop',true,false)
ON CONFLICT ("id") DO NOTHING;

-- 4. GALLERY IMAGES
INSERT INTO "GalleryImage" ("id","url","caption","sortOrder") VALUES
('g01','https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop','Our elegant dining space',1),
('g02','https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop','Cookie Skillet & Ice Cream',2),
('g03','https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop','Fresh Mango Smoothie',3),
('g04','https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop','Chocolate Torte',4),
('g05','https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop','New York Cheesecake',5),
('g06','https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop','The Freak Shake',6),
('g07','https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop','Afternoon Tea Service',7),
('g08','https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop','Classic Tiramisu',8)
ON CONFLICT ("id") DO NOTHING;

-- 5. SAMPLE RESERVATIONS
INSERT INTO "Reservation" ("id","name","email","phone","date","time","guests","notes","status") VALUES
('r01','Sara Tesfaye','sara@example.com','+251 911 000 001','2026-04-20','14:00',2,'Birthday celebration','confirmed'),
('r02','Dawit Bekele','dawit@example.com','+251 911 000 002','2026-04-21','16:30',4,NULL,'pending')
ON CONFLICT ("id") DO NOTHING;

-- 6. SAMPLE ORDERS
INSERT INTO "Order" ("id","customerName","email","phone","total","status") VALUES
('o01','Meron Haile','meron@example.com','+251 911 000 101',1083,'completed'),
('o02','Yonas Girma','yonas@example.com','+251 911 000 102',910,'pending')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "OrderItem" ("id","orderId","menuItemId","quantity","price") VALUES
('oi01','o01','m03',2,373),
('oi02','o01','m07',1,355),
('oi03','o02','m09',1,537),
('oi04','o02','m04',1,373)
ON CONFLICT ("id") DO NOTHING;
