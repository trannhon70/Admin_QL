import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { newsAPI } from "api/news.api";

const getListNews = createAsyncThunk("news/getList", (query: any) => {
    return newsAPI.getList(query);
});
const createNews = createAsyncThunk("news/create", (body: any) => {
    return newsAPI.createNews(body);
});
const uploadFile = createAsyncThunk("news/uploadImg", (body: any) => {
    return newsAPI.uploadFile(body);
});
const deleteNews = createAsyncThunk("news/delete", (id: string) => {
    return newsAPI.deleteOne(id);
});
const getOne = createAsyncThunk("news/getOne", (slug: string) => {
    return newsAPI.getOne(slug);
});
const updateOne = createAsyncThunk("news/updateOne", (data: any) => {
    return newsAPI.updateOne(data);
});

export const newsAction = {
    getListNews,
    createNews,
    uploadFile,
    updateOne,
    deleteNews,
    getOne,
};
export const newsSlice = createSlice({
    name: "news",
    initialState: {
        listNews: [],
        currentNews: {},
        errorMessage: "",
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        // get list news
        builder.addCase(getListNews.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getListNews.fulfilled, (state, action: any) => {
            state.listNews = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(getListNews.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Get fail");
        });

        // create news
        builder.addCase(createNews.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(createNews.fulfilled, (state, action: any) => {
            state.isLoading = false;
            toast.success("Create successfully");
        });
        builder.addCase(createNews.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Create fail");
        });

        // delete news
        builder.addCase(deleteNews.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(deleteNews.fulfilled, (state, action: any) => {
            state.isLoading = false;
            toast.success("Delete successfully");
        });
        builder.addCase(deleteNews.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Delete fail");
        });

        // getOne news
        builder.addCase(getOne.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getOne.fulfilled, (state, action: any) => {
            state.isLoading = false;
            state.currentNews = action.payload.data;
        });
        builder.addCase(getOne.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Get fail");
        });

        // update news
        builder.addCase(updateOne.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(updateOne.fulfilled, (state, action: any) => {
            state.isLoading = false;
            toast.success("Update successfully");
        });
        builder.addCase(updateOne.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Update fail");
        });
    },
});
