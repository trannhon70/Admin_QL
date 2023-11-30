import jwtDecode from "jwt-decode";
import { validateJson } from "common/function";

const bytesToBase64 = (bytes: any) => {
    const binString = Array.from(bytes, (x: any) =>
        String.fromCodePoint(x)
    ).join("");
    return btoa(binString);
};

const LOCAL_KEYS = {
    REFRESH_TOKEN: bytesToBase64(new TextEncoder().encode("REFRESH_TOKEN")),
    ACCESS_TOKEN: bytesToBase64(new TextEncoder().encode("ACCESS_TOKEN")),
    USER_PROFILE: bytesToBase64(new TextEncoder().encode("USER_PROFILE")),
};

const getAccessToken = () => {
    const accessToken = localStorage.getItem(LOCAL_KEYS.ACCESS_TOKEN);
    if (!accessToken || accessToken === "undefined") return null;
    //
    const decodedToken: any = jwtDecode(accessToken);
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    if (expirationTime < currentTime) return null;
    //
    return accessToken;
};

const setAccessToken = (token: string) => {
    localStorage.setItem(LOCAL_KEYS.ACCESS_TOKEN, token);
    return token;
};

const removeAccessToken = () => {
    localStorage.removeItem(LOCAL_KEYS.ACCESS_TOKEN);
};

const getRefreshToken = () => {
    const refreshToken = localStorage.getItem(LOCAL_KEYS.REFRESH_TOKEN);
    if (!refreshToken || refreshToken === "undefined") return null;
    //
    const decodedToken: any = jwtDecode(refreshToken);
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    if (expirationTime < currentTime) return null;
    //
    return refreshToken;
};

const setRefreshToken = (token: string) => {
    localStorage.setItem(LOCAL_KEYS.REFRESH_TOKEN, token);
    return token;
};

const removeRefreshToken = () => {
    localStorage.removeItem(LOCAL_KEYS.REFRESH_TOKEN);
};

const getCurrentUser = () => {
    const user = localStorage.getItem(LOCAL_KEYS.USER_PROFILE);
    return user && user !== "undefined" && validateJson(user)
        ? JSON.parse(user)
        : null;
};

const setCurrentUser = (user: any) => {
    localStorage.setItem(LOCAL_KEYS.USER_PROFILE, JSON.stringify(user));
    return user;
};

const removeUser = () => {
    localStorage.removeItem(LOCAL_KEYS.USER_PROFILE);
};

export const LOCAL_STORAGE = {
    getAccessToken,
    setAccessToken,
    removeAccessToken,

    getRefreshToken,
    setRefreshToken,
    removeRefreshToken,

    getCurrentUser,
    setCurrentUser,
    removeUser,
};
