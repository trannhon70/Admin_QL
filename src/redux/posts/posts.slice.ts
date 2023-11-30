import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { communityPostsAPI } from "api/community-posts.api"; 

const getListPosts = createAsyncThunk("CommunitySeo/getListPosts", (query: any) => {
    return communityPostsAPI.getPostAdmin(query);
});
// const createNews = createAsyncThunk("news/create", (body: any) => {
//     return newsAPI.createNews(body);
// });
// const uploadFile = createAsyncThunk("news/uploadImg", (body: any) => {
//     return newsAPI.uploadFile(body);
// });
const deletePost = createAsyncThunk("CommunitySeo/deleteOnePost", (objPost: any) => {
    return communityPostsAPI.deleteOnePost(objPost);
});
const getOne = createAsyncThunk("CommunitySeo/getOnePost", (ObjSlug: any) => {
    return communityPostsAPI.getOnePostAdmin(ObjSlug);
});
const updateOne = createAsyncThunk("CommunitySeo/updateOnePost", (data: any) => {
    return communityPostsAPI.updateOnePost(data);
});
const updateMany = createAsyncThunk("CommunitySeo/updateManyPost", (data: any) => {
    return communityPostsAPI.updateManyPost(data);
});

export const postsAction = {
    getListPosts,
    updateOne,
    updateMany,
    deletePost,
    getOne,
};
export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        listPosts: [],
        count: 0,
        currentPost: {},
        errorMessage: "",
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        // get list news
        builder.addCase(getListPosts.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getListPosts.fulfilled, (state, action: any) => {
            state.listPosts = action.payload.data;
            state.count = action.payload.count;
            state.isLoading = false;
        });
        builder.addCase(getListPosts.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Get fail");
        });

        // // create news
        // builder.addCase(createNews.pending, (state, action: any) => {
        //     state.isLoading = true;
        // });
        // builder.addCase(createNews.fulfilled, (state, action: any) => {
        //     state.isLoading = false;
        //     toast.success("Create successfully");
        // });
        // builder.addCase(createNews.rejected, (state, action) => {
        //     state.isLoading = false;
        //     toast.error(action.error.message || "Create fail");
        // });

        // delete post
        builder.addCase(deletePost.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(deletePost.fulfilled, (state, action: any) => {
            state.isLoading = false;
            toast.success("Delete successfully");
        });
        builder.addCase(deletePost.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Delete fail");
        });

        // getOne post
        builder.addCase(getOne.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getOne.fulfilled, (state, action: any) => {
            state.isLoading = false;
            state.currentPost = action.payload.data;
        });
        builder.addCase(getOne.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Get fail");
        });

        // update one post
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

        // update many post
        builder.addCase(updateMany.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(updateMany.fulfilled, (state, action: any) => {
            state.isLoading = false;
            toast.success("Update successfully");
        });
        builder.addCase(updateMany.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Update fail");
        });
    },
});
