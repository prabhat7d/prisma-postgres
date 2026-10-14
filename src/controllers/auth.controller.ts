import type { Request, Response, NextFunction } from "express";
import { loginRequestSchema } from "../requests/login.request";
import { authService } from "../services/auth.service";
import { AuthResource } from "../resources/auth.resource";

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = loginRequestSchema.safeParse(req.body);

      if (!parsed.success) {
        res.status(400).json({
          error: {
            code: "VALIDATION_ERROR",
            message: "Provide a valid email and password.",
          },
        });
        return;
      }

      const result = await authService.login(
        parsed.data.email,
        parsed.data.password,
      );

      res.status(200).json(AuthResource.make(result));
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "INVALID_CREDENTIALS"
      ) {
        res.status(401).json({
          error: {
            code: "INVALID_CREDENTIALS",
            message: "Invalid email or password.",
          },
        });
        return;
      }

      next(error);
    }
  }
}

export const authController = new AuthController();