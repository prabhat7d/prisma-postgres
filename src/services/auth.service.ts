import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository";

export class AuthService {
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign({}, secret, {
      subject: String(user.id),
      expiresIn: "1h",
      issuer: "prisma-postgres-demo",
      audience: "prisma-postgres-demo-api",
    });

    return {
      token,
      tokenType: "Bearer",
      expiresIn: 3600,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

export const authService = new AuthService();