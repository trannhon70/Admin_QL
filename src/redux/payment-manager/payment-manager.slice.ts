import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { paymentManagerAPI } from "api/payment-manager.api";

const getListPayments = createAsyncThunk("users/ListPayment", (query: any) => {
    return paymentManagerAPI.ListPayment(query);
});
const updateOne = createAsyncThunk("users/updateOnePayment", (data: any) => {
    return paymentManagerAPI.updateOnePayment(data);
});
const updateOneInfo = createAsyncThunk("users/updateOneInfo", (data: any) => {
    return paymentManagerAPI.updateOneInfo(data);
});

export const paymentManagerAction = {
    getListPayments,
    updateOne,
    updateOneInfo,
};
export const paymentManagerSlice = createSlice({
    name: "paymentManager",
    initialState: {
        listPayment: [],
        dataUpdatePayment: {},
        updateInfo: {},
        count: 0,
        currentPost: {},
        errorMessage: "",
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        // get list news
        builder.addCase(getListPayments.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getListPayments.fulfilled, (state, action: any) => {
            state.listPayment = action.payload.data;
            state.count = action.payload.count;
            state.isLoading = false;
        });
        builder.addCase(getListPayments.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Get fail");
        });

        // update one payment status
        builder.addCase(updateOne.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(updateOne.fulfilled, (state, action: any) => {
            state.dataUpdatePayment = action.payload.data;
            state.isLoading = false;
            toast.success("Update successfully");
        });
        builder.addCase(updateOne.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Update fail");
        });

        // update one payment
        builder.addCase(updateOneInfo.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(updateOneInfo.fulfilled, (state, action: any) => {
            state.updateInfo = action.payload.data;
            state.isLoading = false;
            toast.success("Update successfully");
        });
        builder.addCase(updateOneInfo.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "Update fail");
        });
    },
});
