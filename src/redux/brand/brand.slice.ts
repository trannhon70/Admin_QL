import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { brandAPI } from "api/brand.api";
import { IListBrand } from "interface/user";
import { IPaginnation } from "interface";



const createBrand = createAsyncThunk("brand/create",
    (payload : any) => {
        return brandAPI.createdBrand(payload);
    }
);

const getpagingBrand = createAsyncThunk("brand/getpagingBrand",
    (payload : IPaginnation) => {
        return brandAPI.getpagingBrand(payload);
    }
);

const deleteBrand = createAsyncThunk("brand/deleteBrand",
    (id : string) => {
        return brandAPI.deleteBrand(id);
    }
);

const updateBrand = createAsyncThunk("brand/updateBrand",
    (payload: any) => {
        return brandAPI.updateBrand(payload);
    }
);

const getBrandById = createAsyncThunk("brand/getBrandById",
    (id : string) => {
        return brandAPI.getBrandById(id);
    }
);

const getAllBrand = createAsyncThunk("brand/getAll",
    () => {
        return brandAPI.getAllBrand();
    }
);




export const brandAction = {
    createBrand,
    getpagingBrand,
    deleteBrand,
    updateBrand,
    getBrandById,
    getAllBrand
};



interface BrandState {
    listBrand: IListBrand[],
    count: number,
    totalPages: number,
    pageSize: number,
    pageIndex: number,
    brand: any,
    allBrand: any
}

const initialState: BrandState = {
    listBrand: [],
    count: 0,
    totalPages: 0,
    pageSize: 10,
    pageIndex: 1,
    brand: {},
    allBrand: []
};
export const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {
        setpagingBrand(state, action){

        }
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

        //delete brand
        builder.addCase(deleteBrand.fulfilled,(state,action: any)=>{
            toast.success(action.payload.message)
            state.listBrand = state.listBrand.filter(item => item.id !== action.payload.result.id);
        })
        builder.addCase(deleteBrand.rejected, (state,action) => {
            toast.warning('Xóa thương hiệu không thành công!')
        });

        //update brand
        builder.addCase(updateBrand.fulfilled,(state,action: any)=>{
            toast.success(action.payload.message)
        })
        //get by Id brand
        builder.addCase(getBrandById.fulfilled,(state, action: any) => {
            state.brand = action.payload.result
        })

        builder.addCase(getAllBrand.fulfilled,(state, action: any) => {
            state.allBrand = action.payload.result
        })
    },
});

export const { setpagingBrand } = brandSlice.actions; // Exporting setUser action

export default brandSlice.reducer;