import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { userAPI } from "api/user.api";
import { LOCAL_STORAGE } from "helper/storage.helper";
import { IUser } from "interface/user";

const signOut = createAction("auth/signOut");
const logout = createAsyncThunk("auth/logout", (payload: { userId: string }) => {

    return userAPI.logout(payload)
})
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

const getbyIdUser = createAsyncThunk(
    "auth/getbyIdUser",
    () => {
        return userAPI.getbyIdUser();
    }
);


const getAllRole = createAsyncThunk("role/getAllRole",
    () => {
        return userAPI.getAllRole();
    }
);

const currentUser = LOCAL_STORAGE.getCurrentUser();

export const userAction = {
    signIn,
    signUp,
    signOut,
    logout,
    getbyIdUser,
    getAllRole
};



interface UserState {
    isLogedIn: boolean;
    isLoading: boolean;
    currentUser: IUser | null;
    updateUser: IUser | null;
    listUsers: IUser[];
    listAdmins: IUser[];
    errorMessage: string;
    listUsersSelect: IUser[];
    user: IUser; // <-- Update the type to IUser
    role: any;
}

const initialState: UserState = {
    isLogedIn: !currentUser || currentUser == null ? false : true,
    isLoading: false,
    currentUser: currentUser || null,
    updateUser: null,
    listUsers: [],
    listAdmins: [],
    errorMessage: "",
    listUsersSelect: [],
    user: { id: "", username: "", role: "", name: "", avatar: "" }, // Provide initial values based on IUser
    role: [],
};
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload.data
        }
    },
    extraReducers: (builder) => {
        // sign in
        builder.addCase(signIn.fulfilled, (state, action: any) => {

            if (action.payload.status === 0) {
                toast.error(action.payload.data || "Login fail")
            }
            else {
                toast.success(action.payload.message || "Login successfully");
                state.isLogedIn = true;
                state.user = action.payload.data;
                LOCAL_STORAGE.setAccessToken(action.payload.data?.jwtToken);
                LOCAL_STORAGE.setRefreshToken(action.payload.data?.jwtToken);
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
        //getbyIdUser
        builder.addCase(getbyIdUser.fulfilled, (state, action: any) => {
            state.user = action.payload.result;
        });

        builder.addCase(getbyIdUser.rejected, (state, action) => {
            console.error(action.error, 'Error fetching user by ID');
            // Handle the rejection/failure state if needed
        });

        //get all role
        builder.addCase(getAllRole.fulfilled, (state, action: any) => {
            state.role = action.payload.data
        })

    },
});

export const { setUser } = userSlice.actions; // Exporting setUser action

export default userSlice.reducer;