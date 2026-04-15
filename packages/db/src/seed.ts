import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with real menu...");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.admin.deleteMany();

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.admin.create({
    data: {
      email: "admin@thedessertbar.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  // ── REAL MENU (prices in ETB) ─────────────────────────────────────────────
  await prisma.menuItem.createMany({
    data: [

      // ── CAKES (Whole) ──────────────────────────────────────────────────────
      {
        name: "Torta Chocolate Cake",
        description:
          "A full, celebration-sized chocolate torte — rich dark chocolate layers with silky ganache. Perfect for birthdays and special occasions. Serves 8–10.",
        price: 2483,
        category: "Whole Cakes",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      {
        name: "Torta Cheese Cake",
        description:
          "A full New York-style cheesecake — thick, creamy, and impossibly smooth on a buttery biscuit base. Serves 8–10.",
        price: 2483,
        category: "Whole Cakes",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },

      // ── SLICES ─────────────────────────────────────────────────────────────
      {
        name: "Chocolate Cake Slice",
        description:
          "A generous slice of our signature chocolate cake — dense, moist layers of cocoa sponge with velvety chocolate buttercream.",
        price: 373,
        category: "Slices",
        image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop",
        available: true,
        featured: true,
      },
      {
        name: "Cheese Cake Slice",
        description:
          "A thick, creamy slice of classic cheesecake on a golden biscuit crust. Perfectly set, lightly tangy, utterly indulgent.",
        price: 373,
        category: "Slices",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop",
        available: true,
        featured: true,
      },
      {
        name: "Brownie Cake Slice",
        description:
          "A thick, fudgy brownie slice — crispy on the outside, soft and gooey within, with chunks of dark chocolate throughout.",
        price: 300,
        category: "Slices",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      {
        name: "Lemon Cake Slice",
        description:
          "A bright, citrusy lemon sponge with zesty lemon curd filling and a delicate white glaze. Light yet satisfying.",
        price: 355,
        category: "Slices",
        image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      {
        name: "Tiramisu",
        description:
          "Classic Italian tiramisu — layers of espresso-soaked ladyfingers, mascarpone cream, and a dusting of premium cocoa.",
        price: 355,
        category: "Slices",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop",
        available: true,
        featured: true,
      },
      {
        name: "Fasting Chocolate Cake",
        description:
          "Our most talked-about item. A rich, indulgent chocolate cake made entirely without animal products — perfect during fasting season. A must-try.",
        price: 391,
        category: "Slices",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop",
        available: true,
        featured: true,
      },

      // ── DESSERTS ───────────────────────────────────────────────────────────
      {
        name: "Brownie with Ice Cream",
        description:
          "A warm, gooey brownie served with a generous scoop of vanilla ice cream and a drizzle of hot chocolate sauce.",
        price: 537,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&auto=format&fit=crop",
        available: true,
        featured: true,
      },
      {
        name: "Cookie Skillet & Ice Cream",
        description:
          "A loaded cookie waffle skillet topped with scoops of chocolate and vanilla ice cream, an Oreo cookie, rainbow sprinkles, and a chocolate drizzle.",
        price: 537,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop",
        available: true,
        featured: true,
      },
      {
        name: "Freak Shake",
        description:
          "The ultimate dessert experience — a towering thick shake loaded with a slice of chocolate cake, whipped cream, and chocolate drizzle. Legendary.",
        price: 729,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop",
        available: true,
        featured: true,
      },

      // ── PASTRIES ───────────────────────────────────────────────────────────
      {
        name: "Croissant Sandwich",
        description:
          "A flaky, buttery croissant filled with fresh avocado, layered ingredients, and served beautifully on a dark plate.",
        price: 405,
        category: "Pastries",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      {
        name: "Cinnamon Oats with Fruit",
        description:
          "Warm, creamy cinnamon oats topped with fresh seasonal fruit. A wholesome and comforting start to your morning.",
        price: 263,
        category: "Pastries",
        image: "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      {
        name: "Fasting Donut",
        description:
          "A light, golden donut made without animal products — soft, slightly sweet, and perfect for fasting season treats.",
        price: 192,
        category: "Pastries",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      {
        name: "Fasting Cinnamon Roll",
        description:
          "A soft, spiraled cinnamon roll crafted without dairy — warmly spiced and glazed with a light sugar drizzle.",
        price: 154,
        category: "Pastries",
        image: "https://images.unsplash.com/photo-1620921568956-c44f4bc71d72?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      {
        name: "Cheese Donut",
        description:
          "A pillowy fried donut filled with creamy cheese — slightly savoury, perfectly sweet. One is never enough.",
        price: 242,
        category: "Pastries",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      {
        name: "Chocolate Chip Cookies",
        description:
          "Fresh-baked cookies packed with dark and milk chocolate chips — crispy edges, chewy centre, served warm.",
        price: 107,
        category: "Pastries",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },

      // ── DRINKS ─────────────────────────────────────────────────────────────
      {
        name: "Mango Smoothie",
        description:
          "Fresh mango blended to a smooth, velvety pour — served chilled in a signature bottle glass, garnished with a fresh mango slice.",
        price: 237,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop",
        available: true,
        featured: true,
      },
      {
        name: "Strawberry Mojito",
        description:
          "Fresh strawberries muddled with mint, lime, and sparkling water — a refreshing, vibrant non-alcoholic mojito.",
        price: 237,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      {
        name: "Frozen Lemonade",
        description:
          "A thick, icy blend of fresh lemon juice, sugar, and crushed ice. Tangy, sweet, and incredibly refreshing.",
        price: 390,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },

      // ── SPECIALS ───────────────────────────────────────────────────────────
      {
        name: "Afternoon Tea",
        description:
          "An elegant afternoon tea service — a curated tiered selection of cakes, pastries, and light bites. The perfect occasion treat. Serves two.",
        price: 1998,
        category: "Specials",
        image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop",
        available: true,
        featured: true,
      },
      {
        name: "Waffle Omelette",
        description:
          "A savoury waffle omelette — crispy on the outside, fluffy within. A unique fusion brunch item unlike anything else on the menu.",
        price: 506,
        category: "Specials",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
    ],
  });

  // ── GALLERY ───────────────────────────────────────────────────────────────
  await prisma.galleryImage.createMany({
    data: [
      {
        url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop",
        caption: "Our elegant dining space",
        sortOrder: 1,
      },
      {
        url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop",
        caption: "Cookie Skillet & Ice Cream",
        sortOrder: 2,
      },
      {
        url: "https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop",
        caption: "Fresh Mango Smoothie",
        sortOrder: 3,
      },
      {
        url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop",
        caption: "Chocolate Torte",
        sortOrder: 4,
      },
      {
        url: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop",
        caption: "New York Cheesecake",
        sortOrder: 5,
      },
      {
        url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop",
        caption: "The Freak Shake",
        sortOrder: 6,
      },
      {
        url: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop",
        caption: "Afternoon Tea Service",
        sortOrder: 7,
      },
      {
        url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop",
        caption: "Fresh Donuts",
        sortOrder: 8,
      },
      {
        url: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop",
        caption: "Classic Tiramisu",
        sortOrder: 9,
      },
    ],
  });

  // ── SAMPLE DATA ───────────────────────────────────────────────────────────
  await prisma.reservation.createMany({
    data: [
      {
        name: "Sara Tesfaye",
        email: "sara@example.com",
        phone: "+251 911 000 001",
        date: "2026-04-20",
        time: "14:00",
        guests: 2,
        notes: "Birthday celebration",
        status: "confirmed",
      },
      {
        name: "Dawit Bekele",
        email: "dawit@example.com",
        phone: "+251 911 000 002",
        date: "2026-04-21",
        time: "16:30",
        guests: 4,
        status: "pending",
      },
    ],
  });

  const items = await prisma.menuItem.findMany({ orderBy: { createdAt: "asc" } });

  if (items.length >= 7) {
    await prisma.order.create({
      data: {
        customerName: "Meron Haile",
        email: "meron@example.com",
        phone: "+251 911 000 101",
        total: items[2].price * 2 + items[6].price,
        status: "completed",
        items: {
          create: [
            { menuItemId: items[2].id, quantity: 2, price: items[2].price },
            { menuItemId: items[6].id, quantity: 1, price: items[6].price },
          ],
        },
      },
    });

    await prisma.order.create({
      data: {
        customerName: "Yonas Girma",
        email: "yonas@example.com",
        phone: "+251 911 000 102",
        total: items[7].price + items[1].price,
        status: "pending",
        notes: "Extra whipped cream please",
        items: {
          create: [
            { menuItemId: items[7].id, quantity: 1, price: items[7].price },
            { menuItemId: items[1].id, quantity: 1, price: items[1].price },
          ],
        },
      },
    });
  }

  console.log("✅ Database seeded with real menu!");
  console.log("📍 Location: Bole, Atlas, beside Azzeman Hotel, Addis Ababa");
  console.log("📧 Admin: admin@thedessertbar.com / admin123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
