import { ApiInstance } from "helper/api.helper";

export const userAPI = {
    login,
    signUp,
    getProfile,
    updateProfile,
    getList,
    getListAdmins,
    changePassword,
    resetPassword,
    createAdmin,
    deleteAdmin,
    deleteUser,
    createUser,
    getOne,
    updateUser,
    setPassword,
    updateAdmin,
    getAdmin,
    setAdminPassword,
    verifyEmail,
    getListSelect
};

function login({ username, password }: { username: string; password: string }) {
    return ApiInstance().post("auth-admin/login", {
        userName: username,
        password,
    });
}

function signUp(payload: any) {
    return ApiInstance().post("auth-admin/sign-up", payload);
}

function verifyEmail(emailToken: string) {
    return ApiInstance().get("auth-admin/verify-email", {
        params: {
            emailToken,
        },
    });
}

function getProfile() {
    return ApiInstance().get("admin/get-profile");
}

function updateProfile(data: any) {
    const url = `admin/update-profile`;
    return ApiInstance().patch(url, data);
}

function getList(query: any) {
    const url = "users/get-list";
    return ApiInstance().get(url, { params: query });
}

function getListAdmins(query: any) {
    const url = "admin/get-list";
    return ApiInstance().get(url, { params: query });
}

function changePassword(data: any) {
    const url = `admin/change-password/${data?.id}`;
    return ApiInstance().patch(url, data);
}

function resetPassword(data: any) {
    const url = "auth-admin/reset-password";
    return ApiInstance().post(url, data);
}

function createAdmin(data: any) {
    const url = "admin/create";
    return ApiInstance().post(url, data);
}

function deleteAdmin(id: string) {
    const url = `admin/${id}`;
    return ApiInstance().delete(url);
}

function createUser(data: any) {
    const url = "users/create-user";
    return ApiInstance().post(url, data);
}

function deleteUser(id: string) {
    const url = `users/${id}`;
    return ApiInstance().delete(url);
}

function getOne(userName: string) {
    const url = `users/get-one/${userName}`;
    return ApiInstance().get(url);
}

function getAdmin(userName: string) {
    const url = `admin/get-one/${userName}`;
    return ApiInstance().get(url);
}

function updateUser(data: any) {
    const url = `users/update-user/${data?.id}`;
    return ApiInstance().patch(url, data);
}

function setPassword(data: any) {
    const url = `users/set-password/${data?.id}`;
    return ApiInstance().patch(url, data);
}

function setAdminPassword(data: any) {
    const url = `admin/set-password/${data?.id}`;
    return ApiInstance().patch(url, data);
}

function updateAdmin(data: any) {
    const url = `admin/update-account/${data?.id}`;
    return ApiInstance().patch(url, data);
}

function getListSelect() {
    const url = "users/getListSelect";
    return ApiInstance().get(url);
}