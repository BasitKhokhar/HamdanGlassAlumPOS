

import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

/* ---------------- Helpers ---------------- */

const getToken = async (key) => {
    return await SecureStore.getItemAsync(key);
};

const setToken = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
};

const removeTokens = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
};

/* ---------------- apiFetch ---------------- */

export const apiFetch = async (url, options = {}, navigation) => {
    let accessToken = await getToken("accessToken");
    let refreshToken = await getToken("refreshToken");

    /**
     * IMPORTANT:
     * React Native FormData detection
     * `instanceof FormData` is unreliable in RN
     */
    const isFormData =
        options.body &&
        typeof options.body === "object" &&
        options.body._parts;

    let headers = {
        ...(options.headers || {}),
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
    };

    // ❗ NEVER set Content-Type for FormData
    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    let response;

    try {
        response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers,
        });
    } catch (networkErr) {
        console.error("❌ Network error:", networkErr);
        throw new Error("Network request failed");
    }

    /* ---------- Access token expired ---------- */
    if (response.status === 401 && refreshToken) {
        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!refreshRes.ok) {
            await removeTokens();
            navigation?.replace("Login");
            return refreshRes;
        }

        const { accessToken: newAccessToken } = await refreshRes.json();
        if (!newAccessToken) {
            await removeTokens();
            navigation?.replace("Login");
            return refreshRes;
        }

        await setToken("accessToken", newAccessToken);

        headers.Authorization = `Bearer ${newAccessToken}`;

        response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers,
        });
    }

    return response;
};
