import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { userAPI } from "api/user.api";
import { LOCAL_STORAGE } from "helper/storage.helper";

const signOut = createAction("auth/signOut");
const signUp = createAsyncThunk(
    "auth/signIn",
    (payload: {
        userName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => {
        return userAPI.signUp(payload);
    }
);
const signIn = createAsyncThunk(
    "auth/signUp",
    ({ username, password }: { username: string; password: string }) => {
        return userAPI.login({ username, password });
    }
);
const verifyEmail = createAsyncThunk("auth/verifyEmail", (emailToken: string) => {
    return userAPI.verifyEmail(emailToken);
});
const getProfile = createAsyncThunk("auth/getProfile", () => {
    return userAPI.getProfile();
});
const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    (data: any = {}) => {
        return userAPI.updateProfile(data);
    }
);
const getList = createAsyncThunk("user/getList", (query: any = {}) => {
    return userAPI.getList(query);
});
const getListAdmins = createAsyncThunk("admin/getList", (query: any = {}) => {
    return userAPI.getListAdmins(query);
});
const changePassword = createAsyncThunk(
    "auth/changePassword",
    (data: any = {}) => {
        return userAPI.changePassword(data);
    }
);
const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    (data: any = {}) => {
        return userAPI.resetPassword(data);
    }
);
const createAdmin = createAsyncThunk("admin/createAdmin", (data: any = {}) => {
    return userAPI.createAdmin(data);
});
const deleteAdmin = createAsyncThunk("admin/deleteAdmin", (id: string) => {
    return userAPI.deleteAdmin(id);
});
const createUser = createAsyncThunk("admin/createUser", (data: any = {}) => {
    return userAPI.createUser(data);
});
const deleteUser = createAsyncThunk("admin/deleteUser", (id: string) => {
    return userAPI.deleteUser(id);
});
const getOne = createAsyncThunk("user/getOne", (userName: string) => {
    return userAPI.getOne(userName);
});
const getAdmin = createAsyncThunk("admin/getOne", (userName: string) => {
    return userAPI.getAdmin(userName);
});
const updateUser = createAsyncThunk("user/updateUser", (data: any = {}) => {
    return userAPI.updateUser(data);
});
const setPassword = createAsyncThunk("user/setPassword", (data: any = {}) => {
    return userAPI.setPassword(data);
});
const updateAdmin = createAsyncThunk("auth/updateAdmin", (data: any = {}) => {
    return userAPI.updateAdmin(data);
});
const setAdminPassword = createAsyncThunk(
    "admin/setPassword",
    (data: any = {}) => {
        return userAPI.setAdminPassword(data);
    }
);
const getListSelect = createAsyncThunk("user/getListSelect", () => {
    return userAPI.getListSelect();
});

const currentUser = LOCAL_STORAGE.getCurrentUser();

export const userAction = {
    signIn,
    signUp,
    signOut,
    getProfile,
    updateProfile,
    getList,
    getListAdmins,
    changePassword,
    resetPassword,
    createAdmin,
    deleteAdmin,
    createUser,
    deleteUser,
    getOne,
    updateUser,
    setPassword,
    updateAdmin,
    getAdmin,
    setAdminPassword,
    verifyEmail,
    getListSelect
};
export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLogedIn: !currentUser || currentUser == null ? false : true,
        isLoading: false,
        currentUser: currentUser || null,
        updateUser: null,
        listUsers: [],
        listAdmins: [],
        errorMessage: "",
        listUsersSelect:[]
    },
    reducers: {},
    extraReducers: (builder) => {
        // sign in
        builder.addCase(signIn.fulfilled, (state, action: any) => {
            state.isLogedIn = true;
            LOCAL_STORAGE.setAccessToken(action.payload.data.access_token);
            LOCAL_STORAGE.setRefreshToken(action.payload.data.refresh_token);
            toast.success(action.payload.message || "Login successfully");
        });
        builder.addCase(signIn.rejected, (state, action) => {
            state.isLogedIn = false;
            state.currentUser = null;
            toast.error(action.error.message || "Login fail");
        });
        // sign out
        builder.addCase(signOut, (state) => {
            state.isLogedIn = false;
            state.currentUser = null;
            LOCAL_STORAGE.removeUser();
            LOCAL_STORAGE.removeAccessToken();
            LOCAL_STORAGE.removeRefreshToken();
        });

        // get profile
        builder.addCase(getProfile.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getProfile.fulfilled, (state, action: any) => {
            state.isLogedIn = true;
            state.isLoading = false;
            state.currentUser = action.payload.data;
            LOCAL_STORAGE.setCurrentUser(action.payload.data);
        });
        builder.addCase(getProfile.rejected, (state, action) => {
            state.isLogedIn = false;
            state.isLoading = false;
            state.currentUser = null;
        });

        // update profile
        builder.addCase(updateProfile.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(updateProfile.fulfilled, (state, action: any) => {
            state.isLoading = false;
        });
        builder.addCase(updateProfile.rejected, (state, action): any => {
            state.isLoading = false;
        });

        // get list users
        builder.addCase(getList.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getList.fulfilled, (state, action: any) => {
            state.isLoading = false;
            state.listUsers = action.payload?.data;
        });
        builder.addCase(getList.rejected, (state, action): any => {
            state.isLoading = false;
        });

        // get list admins
        builder.addCase(getListAdmins.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getListAdmins.fulfilled, (state, action: any) => {
            state.isLoading = false;
            state.listAdmins = action.payload?.data;
        });
        builder.addCase(getListAdmins.rejected, (state, action): any => {
            state.isLoading = false;
        });

        // get One
        builder.addCase(getOne.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getOne.fulfilled, (state, action: any) => {
            state.isLoading = false;
            state.updateUser = action.payload.data;
        });
        builder.addCase(getOne.rejected, (state, action) => {
            state.isLoading = false;
            state.updateUser = null;
        });

        // get Admin
        builder.addCase(getAdmin.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getAdmin.fulfilled, (state, action: any) => {
            state.isLoading = false;
            state.updateUser = action.payload.data;
        });
        builder.addCase(getAdmin.rejected, (state, action) => {
            state.isLoading = false;
            state.updateUser = null;
        });

        // get list users select
        builder.addCase(getListSelect.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getListSelect.fulfilled, (state, action: any) => {
            state.isLoading = false;
            state.listUsersSelect = action.payload?.data;
        });
        builder.addCase(getListSelect.rejected, (state, action): any => {
            state.isLoading = false;
        });
    },
});
