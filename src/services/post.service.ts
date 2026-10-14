import { postRepository } from "../repositories/post.repository";

export class PostService {
  async getUserPosts(
    userId: number,
    page: number,
    limit: number,
  ) {
    return postRepository.findByUserId(
      userId,
      page,
      limit,
    );
  }
}

export const postService = new PostService();