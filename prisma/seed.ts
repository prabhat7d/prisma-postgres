import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const rahulPassword = await bcrypt.hash("Rahul@123", 12);
  const priyaPassword = await bcrypt.hash("Priya@123", 12);

  const rahul = await prisma.user.create({
    data: {
      name: "Rahul",
      email: "rahul@example.com",
      password: rahulPassword,
      posts: {
        create: [
          {
            title: "Learning Node.js",
            content: "Understanding Node.js fundamentals",
            published: true,
          },
          {
            title: "Understanding Prisma",
            content: "Learning Prisma ORM with PostgreSQL",
            published: false,
          },
        ],
      },
    },
  });

  const priya = await prisma.user.create({
    data: {
      name: "Priya",
      email: "priya@example.com",
      password: priyaPassword,
      posts: {
        create: [
          {
            title: "Getting Started with PostgreSQL",
            content: "Learning relational databases",
            published: true,
          },
        ],
      },
    },
  });

  console.log("Seed completed:", {
    rahul: rahul.email,
    priya: priya.email,
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });