import axios from "axios";
import { API_CONFIG } from "../config";
import { LOCAL_STORAGE } from "./storage.helper";

const ApiInstance = () => {
    const accessToken = LOCAL_STORAGE.getAccessToken();

    const instance = axios.create({
        baseURL: API_CONFIG.API_URL,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    instance.interceptors.response.use(
        (response) => {
            console.log(response,'response')

            return response.data ? response.data : response;
        },
        async (error) => {

            const originalRequest: any = error.config;
            const REFRESH_URL = "auth-admin/refresh-token";
            const LOGIN_URL = "auth-admin/login";

            // refresh token
            if (
                error?.response?.status === 401 &&
                error?.config?.url !== REFRESH_URL &&
                error?.config?.url !== LOGIN_URL &&
                (!error?.config?.retryCount || error?.config?.retryCount < 2)
            ) {
                const currentUser = LOCAL_STORAGE.getCurrentUser();
                const refreshToken = LOCAL_STORAGE.getRefreshToken();
                if (!error.config?.retryCount) error.config.retryCount = 0;
                error.config.retryCount++;

                try {
                    const res: any = await instance.post(
                        REFRESH_URL,
                        {
                            ...currentUser,
                            refreshToken,
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${refreshToken}`,
                            },
                        }
                    );
                    const access_token = res?.data?.access_token;
                    LOCAL_STORAGE.setAccessToken(access_token);

                    originalRequest.headers = {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                    };
                    originalRequest._retry = true;

                    return instance(originalRequest);
                } catch (err) {
                    originalRequest._retry = false;
                    LOCAL_STORAGE.removeAccessToken();
                    LOCAL_STORAGE.removeRefreshToken();
                    LOCAL_STORAGE.removeUser();
                }
            }
            const getMessage: any = {
                500: "Internal Server Error",
                404: "Sorry! the data you are looking for could not be found",
            };
            const message =
                error?.response?.data?.message || // error from data response
                error?.message || // error message
                getMessage[error?.response?.status || error?.status] || // default message with status
                error; // error
            return Promise.reject(message);
        }
    );
    return instance;
};

const ApiInstanceTraffic = () => {
    const accessToken = LOCAL_STORAGE.getAccessToken();

    const instance = axios.create({
        baseURL: API_CONFIG.API_URL_TRAFFIC,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log('instance', instance)

    instance.interceptors.response.use(
        (response) => {
            return response.data ? response.data : response;
        },
        async (error) => {
            const originalRequest: any = error.config;
            const REFRESH_URL = "auth-admin/refresh-token";
            const LOGIN_URL = "auth-admin/login";

            // refresh token
            if (
                error?.response?.status === 401 &&
                error?.config?.url !== REFRESH_URL &&
                error?.config?.url !== LOGIN_URL &&
                (!error?.config?.retryCount || error?.config?.retryCount < 2)
            ) {
                const currentUser = LOCAL_STORAGE.getCurrentUser();
                const refreshToken = LOCAL_STORAGE.getRefreshToken();
                if (!error.config?.retryCount) error.config.retryCount = 0;
                error.config.retryCount++;

                try {
                    const res: any = await instance.post(
                        REFRESH_URL,
                        {
                            ...currentUser,
                            refreshToken,
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${refreshToken}`,
                            },
                        }
                    );
                    const access_token = res?.data?.access_token;
                    LOCAL_STORAGE.setAccessToken(access_token);

                    originalRequest.headers = {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                    };
                    originalRequest._retry = true;

                    return instance(originalRequest);
                } catch (err) {
                    originalRequest._retry = false;
                    LOCAL_STORAGE.removeAccessToken();
                    LOCAL_STORAGE.removeRefreshToken();
                    LOCAL_STORAGE.removeUser();
                }
            }
            const getMessage: any = {
                500: "Internal Server Error",
                404: "Sorry! the data you are looking for could not be found",
            };
            const message =
                error?.response?.data?.message || // error from data response
                error?.message || // error message
                getMessage[error?.response?.status || error?.status] || // default message with status
                error; // error
            return Promise.reject(message);
        }
    );
    return instance;
};

export { ApiInstance, ApiInstanceTraffic };
