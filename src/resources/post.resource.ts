export class PostResource {
  static collection(result: {
    posts: Array<{
      id: number;
      title: string;
      content: string | null;
      published: boolean;
      createdAt: Date;
    }>;
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  }) {
    return {
      data: result.posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
        createdAt: post.createdAt,
      })),

      pagination: {
        page: result.page,
        limit: result.limit,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
      },
    };
  }
}