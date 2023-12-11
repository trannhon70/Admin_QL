import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productAPI } from "api/product.api";
import { IListProduct } from "interface";

const getpagingProduct = createAsyncThunk("product/getpagingProduct",
    (payload : any) => {
        return productAPI.getpagingProduct(payload);
    }
);

const deleteProduct = createAsyncThunk("product/deleteProduct",
    (id : any) => {
        return productAPI.deleteProduct(id);
    }
);

const getByIdProduct = createAsyncThunk("product/getByIdProduct",
    (id : any) => {
        return productAPI.getByIdProduct(id);
    }
);

export const productAction = {
    getpagingProduct,
    deleteProduct,
    getByIdProduct
};



interface ProductState {
    listProduct: IListProduct[],
    count: number,
    totalPages: number,
    pageSize: number,
    pageIndex: number,
    product: any,
}

const initialState: ProductState = {
    listProduct: [],
    count: 0,
    totalPages: 0,
    pageSize: 10,
    pageIndex: 1,
    product: {},
};
export const productSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {
       setProduct (state ,action) {
        state.product = action.payload
       }
    },
    extraReducers: (builder) => {
       builder.addCase(getpagingProduct.fulfilled,(state, action: any)=>{
        state.listProduct = action.payload.data;
        state.count = action.payload.count;
        state.totalPages = action.payload.totalPages;
        state.pageSize = action.payload.pageSize;
        state.pageIndex = action.payload.pageIndex;
       });

       builder.addCase(deleteProduct.fulfilled,(state, action: any)=>{
        toast.success(action.payload.message)
       });

       //get by id product
       builder.addCase(getByIdProduct.fulfilled,(state,action: any)=> {
        state.product = action.payload.result
       })
    },
});

export const { setProduct } = productSlice.actions; // Exporting setUser action

export default productSlice.reducer;