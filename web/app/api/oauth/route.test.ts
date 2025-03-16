/**
 * @jest-environment node
*/

import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from './route';

jest.mock('@shared/Oauth', () => ({
    __esModule: true,
    default: [
      { id: '1', imageURL: 'image1.png' },
      { id: '2', imageURL: 'image2.png' },
    ]
}));

describe('GET /api/oauth',() => {

  it('should return a list of all oauth with an id and a image', async () => {

    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({ method: "GET" });
        const body = await response.json();
        expect(response.status).toBe(200);
        expect(body).toEqual({
            data: [
                { id: '1', imageURL: 'image1.png' },
                { id: '2', imageURL: 'image2.png' },
            ]
        });
      },
    });

  });
});
