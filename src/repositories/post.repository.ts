import { prisma } from "../lib/prisma";

export class PostRepository {
  async findByUserId(
    userId: number,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;

    const where = {
      authorId: userId,
    };

    const [posts, totalItems] = await prisma.$transaction([
      prisma.post.findMany({
        where,
        orderBy: [
          { createdAt: "desc" },
          { id: "desc" },
        ],
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          content: true,
          published: true,
          createdAt: true,
        },
      }),

      prisma.post.count({ where }),
    ]);

    return {
      posts,
      totalItems,
      page,
      limit,
      totalPages: Math.ceil(totalItems / limit),
    };
  }
}

export const postRepository = new PostRepository();