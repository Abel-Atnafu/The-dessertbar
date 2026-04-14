import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

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

  // Create menu items
  const menuItems = await prisma.menuItem.createMany({
    data: [
      // Cakes
      {
        name: "Velvet Dream Cake",
        description:
          "A luscious red velvet cake layered with silky cream cheese frosting and finished with a dusting of cocoa.",
        price: 8.5,
        category: "Cakes",
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&auto=format&fit=crop",
        available: true,
        featured: true,
      },
      {
        name: "Dark Chocolate Torte",
        description:
          "Intensely rich dark chocolate cake with ganache glaze, topped with edible gold flakes.",
        price: 9.5,
        category: "Cakes",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop",
        available: true,
        featured: true,
      },
      {
        name: "Vanilla Mille-Feuille",
        description:
          "Delicate puff pastry layered with Tahitian vanilla custard cream and a pristine fondant glaze.",
        price: 7.5,
        category: "Cakes",
        image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      {
        name: "Salted Caramel Cheesecake",
        description:
          "New York-style cheesecake with a buttery graham crust, crowned with house-made salted caramel.",
        price: 8.0,
        category: "Cakes",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      // Pastries
      {
        name: "Almond Croissant",
        description:
          "Buttery, flaky croissant filled with rich almond frangipane and topped with toasted almonds.",
        price: 4.5,
        category: "Pastries",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop",
        available: true,
        featured: true,
      },
      {
        name: "Pistachio Éclair",
        description:
          "Classic French éclair filled with pistachio pastry cream and glazed with white chocolate.",
        price: 5.5,
        category: "Pastries",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      {
        name: "Berry Tart",
        description:
          "Crisp butter pastry shell filled with vanilla crème pâtissière, topped with seasonal fresh berries.",
        price: 6.5,
        category: "Pastries",
        image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      {
        name: "Cinnamon Morning Bun",
        description:
          "Soft, pillowy bun swirled with cinnamon sugar and drizzled with orange-zest glaze.",
        price: 3.5,
        category: "Pastries",
        image: "https://images.unsplash.com/photo-1620921568956-c44f4bc71d72?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      // Drinks
      {
        name: "Signature Hot Chocolate",
        description:
          "70% dark chocolate melted in steamed milk, finished with house-made marshmallows.",
        price: 5.0,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=800&auto=format&fit=crop",
        available: true,
        featured: true,
      },
      {
        name: "Rose Latte",
        description:
          "Delicate rose syrup with single-origin espresso and velvety steamed oat milk.",
        price: 5.5,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      {
        name: "Matcha Mist",
        description:
          "Ceremonial-grade matcha whisked with honey and steamed milk, a serene Japanese-inspired sip.",
        price: 5.5,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      {
        name: "Iced Vanilla Brew",
        description:
          "Cold-brewed coffee steeped for 18 hours, sweetened with Madagascar vanilla syrup, served over ice.",
        price: 4.5,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
      // Specials
      {
        name: "Chef's Dessert Platter",
        description:
          "A curated selection of three seasonal desserts chosen by our pastry chef — a different experience every visit.",
        price: 18.0,
        category: "Specials",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop",
        available: true,
        featured: true,
      },
      {
        name: "Afternoon Tea Set",
        description:
          "A tiered selection of finger sandwiches, scones with clotted cream, and seasonal pastries. Serves two.",
        price: 32.0,
        category: "Specials",
        image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop",
        available: true,
        featured: false,
      },
    ],
  });

  // Create gallery images
  await prisma.galleryImage.createMany({
    data: [
      {
        url: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&auto=format&fit=crop",
        caption: "Our intimate dining space",
        sortOrder: 1,
      },
      {
        url: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop",
        caption: "Velvet Dream Cake",
        sortOrder: 2,
      },
      {
        url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop",
        caption: "Freshly baked éclairs",
        sortOrder: 3,
      },
      {
        url: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800&auto=format&fit=crop",
        caption: "Mille-Feuille perfection",
        sortOrder: 4,
      },
      {
        url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop",
        caption: "Dark Chocolate Torte",
        sortOrder: 5,
      },
      {
        url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop",
        caption: "Freshly baked croissants",
        sortOrder: 6,
      },
      {
        url: "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=800&auto=format&fit=crop",
        caption: "Our signature hot chocolate",
        sortOrder: 7,
      },
      {
        url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop",
        caption: "Chef's Dessert Platter",
        sortOrder: 8,
      },
      {
        url: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop",
        caption: "Afternoon Tea Service",
        sortOrder: 9,
      },
    ],
  });

  // Create sample reservations
  await prisma.reservation.createMany({
    data: [
      {
        name: "Sarah Mitchell",
        email: "sarah@example.com",
        phone: "+1 555-0101",
        date: "2026-04-20",
        time: "14:00",
        guests: 2,
        notes: "Anniversary celebration",
        status: "confirmed",
      },
      {
        name: "James Okafor",
        email: "james@example.com",
        phone: "+1 555-0102",
        date: "2026-04-21",
        time: "16:30",
        guests: 4,
        status: "pending",
      },
    ],
  });

  // Create sample orders with items
  const items = await prisma.menuItem.findMany({ take: 4 });
  await prisma.order.create({
    data: {
      customerName: "Amelia Chen",
      email: "amelia@example.com",
      phone: "+1 555-0201",
      total: 22.0,
      status: "completed",
      items: {
        create: [
          {
            menuItemId: items[0].id,
            quantity: 2,
            price: items[0].price,
          },
          {
            menuItemId: items[2].id,
            quantity: 1,
            price: items[2].price,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      customerName: "Noah Williams",
      email: "noah@example.com",
      phone: "+1 555-0202",
      total: 15.5,
      status: "pending",
      notes: "Please add extra cream on the side",
      items: {
        create: [
          {
            menuItemId: items[1].id,
            quantity: 1,
            price: items[1].price,
          },
          {
            menuItemId: items[3].id,
            quantity: 1,
            price: items[3].price,
          },
        ],
      },
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log("📧 Admin email: admin@thedessertbar.com");
  console.log("🔑 Admin password: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
