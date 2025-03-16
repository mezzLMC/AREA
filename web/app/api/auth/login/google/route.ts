/*
 ** EPITECH PROJECT, 2024
 ** area
 ** File description:
 ** route
 */

import { eq } from "drizzle-orm";
import { ZodError } from "zod";
import UserRepository from "@shared/database/UserRepository";
import SessionRepository from "@shared/database/SessionRepository";
import OAuthRepository from "@shared/database/OAuthRepository";
import { googleAuthBodyValidator } from "@/lib/validators";
import { getAcessToken, getUserInfo } from "./GoogleOAuth";

/**
 * @swagger
 * /auth/login/google:
 *   post:
 *     summary: Get user info from google
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: google Oauth code
 *     responses:
 *       200:
 *         description: User is connected with google. Returns a session token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSession'
 *       201:
 *         description: User is created and connected with google. Needs to update username before using the returned token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSession'
 *       400:
 *         description: Bad request
 */

const emptyUser = {
  email: "",
  username: "",
  authType: "google",
};

export async function POST(req: Request) {
    const data = await req.json();
    let status = 200;
    try {
        const body = googleAuthBodyValidator.parse(data);
        const { accessToken, scope, expiresAt, refreshToken } = await getAcessToken(body.code);
        const { email } = await getUserInfo(accessToken);
        const userModel = UserRepository.model;
        let user = await UserRepository.findOne(eq(userModel.email, email));
        if (!user) {
          const username = email.split("@")[0];
          status = 201;
          user = await UserRepository.create({ ...emptyUser, email, username, authType: "google" });
          await OAuthRepository.create({ userId: user.id, accessToken, refreshToken, scope, expiresAt, service: "google" });
        }
        const token = await SessionRepository.create(user.id);
        return Response.json({ id: user.id, token }, {status});
    } catch (err) {
      if (err instanceof ZodError)
        return Response.json({ error: err.errors }, { status: 400 });
      return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
