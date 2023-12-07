import { ApiInstance } from "helper/api.helper";

export const userAPI = {
    login,
    signUp,
    logout,
    getbyIdUser
};

function login({ username, password }: { username: string; password: string }) {
    return ApiInstance().post("user/login", {
        username: username,
        password,
    });
}

function signUp(payload: any) {
    return ApiInstance().post("auth-admin/sign-up", payload);
}


function logout(payload: any) {
    return ApiInstance().post("user/logout", payload);
}

function getbyIdUser (){
    return ApiInstance().get(`user/getbyId`);
}