import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productAPI } from "api/product.api";




const createBrand = createAsyncThunk("product/create",
    (payload : any) => {
        console.log(payload,'payload');
        
        return productAPI.createdProduct(payload);
    }
);



export const productAction = {
    createBrand,
   
};



interface BrandState {
    
}

const initialState: BrandState = {
    
};
export const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
       
    },
});

export const {  } = brandSlice.actions; // Exporting setUser action

export default brandSlice.reducer;