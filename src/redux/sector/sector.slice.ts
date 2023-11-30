import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { sectorAPI } from "api/sector.api";

const getAll = createAsyncThunk("sector/getAll", (query: any = {}) => {
    return sectorAPI.getAll(query);
});
const getList = createAsyncThunk("sector/getList", (query: any = {}) => {
    return sectorAPI.getList(query);
});
const create = createAsyncThunk("sector/create", (data: any = {}) => {
    return sectorAPI.create(data);
});
const update = createAsyncThunk("sector/update", (data: any = {}) => {
    return sectorAPI.update(data);
});
const deleteOne = createAsyncThunk("sector/delete", (id: string) => {
    return sectorAPI.deleteOne(id);
});

export const sectorAction = { getAll, getList, create, update, deleteOne };
export const sectorSlice = createSlice({
    name: "sector",
    initialState: {
        sectors: [],
        listSectors: [],
        errorMessage: "",
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        // get all
        builder.addCase(getAll.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action: any) => {
            state.sectors = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(getAll.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "GET FAIL");
        });

        // get list
        builder.addCase(getList.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(getList.fulfilled, (state, action: any) => {
            state.listSectors = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(getList.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.error.message || "GET FAIL");
        });
    },
});
