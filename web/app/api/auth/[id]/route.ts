import { NextResponse } from 'next/server';
import OAuthRepository from '@shared/database/OAuthRepository';
import Oauth from '@shared/Oauth';

interface RequestParams {
    params: {
        id: string;
    };
}

/**
 * @swagger
 * /auth/{id}:
 *   get:
 *     summary: Handle OAuth callback and exchange authorization code for access token
 *     tags:
 *      - OAuth
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the OAuth service (e.g., google, github, etc.)
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The authorization code returned from the OAuth provider
 *       - in: query
 *         name: state
 *         required: true
 *         schema:
 *           type: string
 *         description: The state parameter to verify the OAuth request
 *     responses:
 *       302:
 *         description: Redirects to the originally requested URL after successful authentication
 *         headers:
 *           Location:
 *             description: The redirection URL
 *             schema:
 *               type: string
 *               example: "https://example.com/callback"
 *       400:
 *         description: Bad request or missing/invalid parameters (e.g., code or state)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid code or state"
 *       404:
 *         description: OAuth service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Service not found"
 */
export const GET = async (req: Request, { params }: RequestParams) => {
    const { searchParams } = new URL(req.url);
    const { id } = params;
    const service = Oauth.find((authService) => authService.id === id);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (!service || !code || !state) {
        return NextResponse.json({ error: 'Invalid code or state' }, { status: 400 });
    }
    const stateData = await OAuthRepository.getState(state);
    if (!stateData || stateData.service !== id) {
        return NextResponse.json({ error: 'Invalid state' }, { status: 400 });
    }
    const token = await service.getAccessToken(code);
    OAuthRepository.create({
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
        scope: token.scope,
        userId: stateData.userId,
        service: id,
        expiresAt: new Date(Date.now() + token.expires_in * 1000).toISOString(),
    });
    return NextResponse.redirect(new URL(stateData.redirectURL, req.url).toString());
};
