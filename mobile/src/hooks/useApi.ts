/*
** EPITECH PROJECT, 2024
** mobile
** File description:
** useApi
*/

import { useState, useEffect } from "react";
import Api from "@shared/Api";
import { getApiUrl } from "src/LocalStorage";

const useApi = () => {
    const [api, setApi] = useState<Api | null>(null);
    useEffect(() => {
      const fetchApiUrl = async () => {
        const baseUrl = (await getApiUrl())!;
        setApi(new Api(baseUrl));
      };
      fetchApiUrl();
    }, []);
    return api;
  };

export default useApi;
