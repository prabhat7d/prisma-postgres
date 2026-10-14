import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Get all users
  const users = await prisma.user.findMany();
  console.log("All users:", users);

  // 2. Find a user by ID
  const user = await prisma.user.findUnique({
    where: { id: 1 },
  });
  console.log("Single user:", user);

  // 3. Get a user with their posts
  const userWithPosts = await prisma.user.findUnique({
    where: { id: 1 },
    include: { posts: true },
  });
  console.log("User with posts:", userWithPosts);

  // 4. Get a post with its author
  const postWithAuthor = await prisma.post.findUnique({
    where: { id: 1 },
    include: { author: true },
  });
  console.log("Post with author:", postWithAuthor);

  // 5. Get published posts only
  const publishedPosts = await prisma.post.findMany({
    where: { published: true },
  });
  console.log("Published posts:", publishedPosts);

  // 6. Get posts written by user 1
  const userPosts = await prisma.post.findMany({
    where: { authorId: 1 },
  });
  console.log("User's posts:", userPosts);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });