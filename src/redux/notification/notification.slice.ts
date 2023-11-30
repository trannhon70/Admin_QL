import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { notificationAPI } from "api/notification.api";

const getAllNotification = createAsyncThunk("notification/getAllNotification", (query:any) => {
    return notificationAPI.getAllNotification(query);
});

const getNotSeenNotification = createAsyncThunk("notification/getNotSeenNotification", (query:any) => {
    return notificationAPI.getNotSeenNotification(query);
});

const getSeenNotification = createAsyncThunk("notification/getSeenNotification", (query:any) => {
    return notificationAPI.getSeenNotification(query);
});

const updateNotification = createAsyncThunk("notification/updateNotification", (body:any) => {
    return notificationAPI.updateNotification(body);
});

// quản lý thông báo

const createNotification = createAsyncThunk("notification/createNotification", (body:any) => {
    return notificationAPI.createNotification(body);
});

const getListNotificationCDS = createAsyncThunk("notification/getListNotificationCDS", (query:any) => {
    return notificationAPI.getListNotificationCDS(query);
});

const updateNotificationSendCDS = createAsyncThunk("notification/updateNotificationSendCDS", (body:any) => {
    return notificationAPI.updateNotificationSendCDS(body);
});

const deleteNotificationSendCDS = createAsyncThunk("notification/deleteNotificationSendCDS", (body:any) => {
    return notificationAPI.deleteNotificationSendCDS(body);
});

export const notifiAction:any = {
    getAllNotification,
    getNotSeenNotification,
    getSeenNotification,
    updateNotification,
    createNotification,
    getListNotificationCDS,
    updateNotificationSendCDS,
    deleteNotificationSendCDS
};
export const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        newNotification:{},
        listNotifications: [],
        listNotificationsCDS: [],
        listNotSeenNotifications: [],
        listSeenNotifications: [],
        updateNotifi:"",
        count: 0,
        currentPost: {},
        errorMessage: "",
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        //get all notification
        builder.addCase(getAllNotification.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getAllNotification.fulfilled, (state, action: any) => {
            state.listNotifications = action.payload.data;
            state.count = action.payload.count;
            state.isLoading = false;
        });
        builder.addCase(getAllNotification.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Get fail");
        });

        //get not yet seen notification
        builder.addCase(getNotSeenNotification.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getNotSeenNotification.fulfilled, (state, action: any) => {
            state.listNotSeenNotifications = action.payload.data;
            state.count = action.payload.count;
            state.isLoading = false;
        });
        builder.addCase(getNotSeenNotification.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Get fail");
        });

        //get seen notification
        builder.addCase(getSeenNotification.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getSeenNotification.fulfilled, (state, action: any) => {
            state.listSeenNotifications = action.payload.data;
            state.count = action.payload.count;
            state.isLoading = false;
        });
        builder.addCase(getSeenNotification.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Get fail");
        });

        //update notification
        builder.addCase(updateNotification.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(updateNotification.fulfilled, (state, action: any) => {
            state.updateNotifi = action.payload.data;
            state.count = action.payload.count;
            state.isLoading = false;
        });
        builder.addCase(updateNotification.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Get fail");
        });

        //create notification CDS
        builder.addCase(createNotification.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(createNotification.fulfilled, (state, action: any) => {
            state.newNotification = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(createNotification.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Get fail");
        });

        //get list notification CDS
        builder.addCase(getListNotificationCDS.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getListNotificationCDS.fulfilled, (state, action: any) => {
            state.listNotificationsCDS = action.payload.data;
            state.count = action.payload.count;
            state.isLoading = false;
        });
        builder.addCase(getListNotificationCDS.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Get fail");
        });

        //update notification CDS
        builder.addCase(updateNotificationSendCDS.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(updateNotificationSendCDS.fulfilled, (state, action: any) => {
            state.isLoading = false;
        });
        builder.addCase(updateNotificationSendCDS.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Get fail");
        });

        //delete notification CDS
        builder.addCase(deleteNotificationSendCDS.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(deleteNotificationSendCDS.fulfilled, (state, action: any) => {
            state.isLoading = false;
            toast.success("Xóa thành công");
        });
        builder.addCase(deleteNotificationSendCDS.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Get fail");
        });
    },
});
