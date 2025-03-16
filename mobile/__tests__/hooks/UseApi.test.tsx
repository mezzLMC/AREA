/**
 * @jest-environment node
 */
 /* eslint-disable */


import { renderHook } from '@testing-library/react-hooks';
import useApi from 'src/hooks/useApi';
import { getApiUrl } from 'src/LocalStorage';
import Api from '@shared/Api';

jest.mock('src/LocalStorage', () => ({
    getApiUrl: jest.fn(),
}));

jest.mock('@shared/Api');

describe('useApi', () => {
    it('should initialize Api with fetched url', async () => {
        (getApiUrl as jest.Mock).mockResolvedValue('http://mock-api.com');
        const { result, waitForNextUpdate } = renderHook(() => useApi());
        await waitForNextUpdate();
        expect(getApiUrl).toHaveBeenCalled();
        expect(Api).toHaveBeenCalledWith('http://mock-api.com');
        expect(result.current).toBeInstanceOf(Api);
    });

    it('should return null initially', () => {
        const { result } = renderHook(() => useApi());
        expect(result.current).toBeNull();
    });
});
