import { Router } from "express";
import { requireAuth } from "../middleware/require-auth";
import { postController } from "../controllers/post.controller";

export const postsRouter = Router();

postsRouter.get(
  "/",
  requireAuth,
  (req, res, next) =>
    postController.index(req, res, next),
);