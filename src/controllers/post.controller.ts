import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { paginationRequestSchema } from "../requests/pagination.request";
import { postService } from "../services/post.service";
import { PostResource } from "../resources/post.resource";

export class PostController {
  async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const parsed = paginationRequestSchema.safeParse(
        req.query,
      );

      if (!parsed.success) {
        res.status(400).json({
          error: {
            code: "VALIDATION_ERROR",
            message:
              "Page must be >= 1 and limit must be between 1 and 100.",
          },
        });
        return;
      }

      const { page, limit } = parsed.data;
      const userId = req.auth!.userId;

      const result = await postService.getUserPosts(
        userId,
        page,
        limit,
      );

      res.status(200).json(
        PostResource.collection(result),
      );
    } catch (error) {
      next(error);
    }
  }
}

export const postController = new PostController();