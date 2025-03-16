/*
** EPITECH PROJECT, 2024
** mobile
** File description:
** useAccessToken
*/

import { useState, useEffect } from "react";
import { getToken } from "../LocalStorage";

const useAccessToken = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    useEffect(() => {
        const fetchToken = async () => {
        const token = await getToken();
        setAccessToken(token);
        };
        fetchToken();
    }, []);
    return accessToken;
};

export default useAccessToken;