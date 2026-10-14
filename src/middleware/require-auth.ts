import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const [scheme, token] = req.header("authorization")?.split(" ") ?? [];
  if (scheme !== "Bearer" || !token) {
    res.status(401).json({ error: { code: "UNAUTHORIZED", message: "A Bearer token is required." } });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ error: { code: "SERVER_CONFIGURATION_ERROR", message: "JWT_SECRET is not configured." } });
    return;
  }

  try {
    const payload = jwt.verify(token, secret, {
      issuer: "prisma-postgres-demo",
      audience: "prisma-postgres-demo-api",
    }) as jwt.JwtPayload;

    const userId = Number(payload.sub);
    if (!Number.isSafeInteger(userId) || userId <= 0) throw new Error("Invalid subject");

    req.auth = { userId };
    next();
  } catch {
    res.status(401).json({ error: { code: "INVALID_TOKEN", message: "The access token is invalid or expired." } });
  }
}
