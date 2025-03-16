/*
 ** EPITECH PROJECT, 2024
 ** area
 ** File description:
 ** GoogleOAuth
 */

 import dotenv from "dotenv";
import path from "path";

 dotenv.config({
  path: path.resolve(process.cwd(), "../.env")
});


interface GoogleOAuthToken {
  accessToken: string;
  expiresAt: string;
  refreshToken: string;
  scope: string;
  tokenType: string;
}

interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export const getAcessToken = async (code: string) => {
  const body = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:8080",
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
  };

  const token = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body),
  });
  const data = (await token.json());
  return {
    accessToken: data.access_token,
    expiresAt: (Date.now() + data.expires_in * 1000).toString(),
    refreshToken: data.refresh_token,
    scope: data.scope,
    tokenType: data.token_type,
  } as GoogleOAuthToken;
};

export const getUserInfo = async (token: string) => {
  const userInfoResponse = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const userInfo = (await userInfoResponse.json()) as GoogleUserInfo;
  return userInfo;
};
