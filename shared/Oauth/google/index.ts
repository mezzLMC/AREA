/*
** EPITECH PROJECT, 2024
** web
** File description:
** index
*/

import path from "path";
import dotenv from "dotenv";
import {Oauth} from "@shared/services/types";

dotenv.config({
  path: path.resolve(process.cwd(), "../.env")
});

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

class GoogleOAuth implements Oauth {
  id = "google";

  imageURL = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";

  async getUserInfo(token: string) {
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
  
  
  generateOauth(state: string) {
      const params = new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID!,
          redirect_uri: "http://localhost:8080/api/auth/google",
          scope: "openid profile email",
          state,
          response_type: "code",
          access_type: "offline",   // Request for refresh token
          prompt: "consent"          // Ensures a new refresh token is issued each time
      });
      return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }
  
  async getAccessToken(code: string) {
    const body = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:8080/api/auth/google",
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
    return data;
    };
  
  async refreshAccessToken(refreshToken: string) {
      const body = {
          refresh_token: refreshToken,
          client_id: process.env.GOOGLE_CLIENT_ID!,
          grant_type: "refresh_token",
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
      return data;
  };
  
  async getIdentifier(token: string) {
      const userInfo = await this.getUserInfo(token);
      return userInfo.email;
  };

  async revoke(token: string) {
      await fetch(`https://oauth2.googleapis.com/revoke?token=${token}`);
  };
}

export default new GoogleOAuth();
