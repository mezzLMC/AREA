import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token: string) => {
    await AsyncStorage.setItem('@auth_token', token);
};

export const removeToken = async () => {
    await AsyncStorage.removeItem('@auth_token');
}

export const storeApiUrl = async (url: string) => {
    await AsyncStorage.setItem('@api_url', url);
};

export const getToken = async () => {
    const token = await AsyncStorage.getItem('@auth_token');
    return token;
};

export const getApiUrl = async () => {
    const url = await AsyncStorage.getItem('@api_url');
    return url;
};
