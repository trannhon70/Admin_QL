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


const currentUser = LOCAL_STORAGE.getCurrentUser();

export const userAction = {
    signIn,
    signUp,
    signOut,
   
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
          
            
            if(action.payload.status === 0) {
                 toast.error(action.payload.data || "Login fail")
            }
            else {
                toast.success(action.payload.message || "Login successfully");
                state.isLogedIn = true;
                LOCAL_STORAGE.setAccessToken(action.payload.data.jwtToken);
                LOCAL_STORAGE.setRefreshToken(action.payload.data.jwtToken);
            }
            
            
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

       
    },
});
