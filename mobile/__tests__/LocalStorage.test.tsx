/**
 * @jest-environment node
 */
 /* eslint-disable */


import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeToken, storeApiUrl, getToken, getApiUrl } from 'src/LocalStorage';

jest.mock('@react-native-async-storage/async-storage');

describe('AsyncStorage functions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('stores a token correctly', async () => {
        const token = 'test-token';
        await storeToken(token);
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('@auth_token', token);
    });

    it('stores an API URL correctly', async () => {
        const url = 'https://api.example.com';
        await storeApiUrl(url);
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('@api_url', url);
    });

    it('retrieves the token correctly', async () => {
        const mockToken = 'test-token';
        (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(mockToken);
        const token = await getToken();
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('@auth_token');
        expect(token).toBe(mockToken);
    });

    it('retrieves the API URL correctly', async () => {
        const mockUrl = 'https://api.example.com';
        (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(mockUrl);
        const url = await getApiUrl();
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('@api_url');
        expect(url).toBe(mockUrl);
    });
});
