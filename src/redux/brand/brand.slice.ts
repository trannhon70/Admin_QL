import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { brandAPI } from "api/brand.api";
import { IListBrand } from "interface/user";



const createBrand = createAsyncThunk("brand/create",
    (payload : any) => {
        return brandAPI.createdBrand(payload);
    }
);

const getpagingBrand = createAsyncThunk("brand/getpagingBrand",
    () => {
        return brandAPI.getpagingBrand();
    }
);



export const brandAction = {
    createBrand,
    getpagingBrand
};



interface BrandState {
    listBrand: IListBrand[],
    count: number,
    totalPages: number,
    pageSize: number,
    pageIndex: number,
}

const initialState: BrandState = {
    listBrand: [],
    count: 0,
    totalPages: 0,
    pageSize: 10,
    pageIndex: 1,
};
export const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(createBrand.fulfilled,(state, action)=>{
            toast.success('Thêm Thương hiệu Thành công!')
        });
        builder.addCase(createBrand.rejected, (state,action) => {
            toast.warning('Thương hiệu đã tồn tại!')
        });

        builder.addCase(getpagingBrand.fulfilled,(state, action:any)=>{
            state.listBrand = action.payload.data;
            state.count = action.payload.count;
            state.totalPages = action.payload.totalPages;
            state.pageSize = action.payload.pageSize;
            state.pageIndex = action.payload.pageIndex;
        });
    },
});

export const {  } = brandSlice.actions; // Exporting setUser action

export default brandSlice.reducer;