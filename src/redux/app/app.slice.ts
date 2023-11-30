import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newsAPI } from "api/news.api";

const uploadFile = createAsyncThunk("news/uploadImg", (body: any) => {
    return newsAPI.uploadFile(body);
});

export const appAction = {
    uploadFile,
};
export const appSlice = createSlice({
    name: "app",
    initialState: {
        errorMessage: "",
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        //
    },
});
