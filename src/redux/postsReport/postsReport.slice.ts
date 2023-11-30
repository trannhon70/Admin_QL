import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { communityPostsAPI } from "api/community-posts.api"; 

const getListReportPosts = createAsyncThunk("CommunitySeo/getListReportPosts", (query: any) => {
    return communityPostsAPI.getListReportPosts(query);
});

const updateReportOne = createAsyncThunk("CommunitySeo/updateReportOne", (data: any) => {
    return communityPostsAPI.updateReportOne(data);
});

const deleteReport = createAsyncThunk("CommunitySeo/deleteReport", (objPost: any) => {
    return communityPostsAPI.deleteReport(objPost);
});

export const postsReportAction = {
    getListReportPosts,
    updateReportOne,
    deleteReport
};
export const postsReportSlice = createSlice({
    name: "postsReport",
    initialState: {
        listReportPosts: [],
        count: 0,
        currentPost: {},
        errorMessage: "",
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        // get list news
        builder.addCase(getListReportPosts.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getListReportPosts.fulfilled, (state, action: any) => {
            state.listReportPosts = action.payload.data;
            state.count = action.payload.count;
            state.isLoading = false;
        });
        builder.addCase(getListReportPosts.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Get fail");
        });

        // delete report
        builder.addCase(deleteReport.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(deleteReport.fulfilled, (state, action: any) => {
            state.isLoading = false;
            toast.success("Delete successfully");
        });
        builder.addCase(deleteReport.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Delete fail");
        });

        // update one report
        builder.addCase(updateReportOne.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(updateReportOne.fulfilled, (state, action: any) => {
            state.isLoading = false;
            toast.success("Update successfully");
        });
        builder.addCase(updateReportOne.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Update fail");
        });
    },
});
