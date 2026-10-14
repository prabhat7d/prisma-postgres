import { Router } from "express";
import { authController } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/login", (req, res, next) =>
  authController.login(req, res, next),
);