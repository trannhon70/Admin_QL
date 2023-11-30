import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { topUpAPI } from "api/top-up.api";


const getListBank = createAsyncThunk("topUp/listBank", () => {
   return topUpAPI.getListBank();
});
//
const createTransferTopUp = createAsyncThunk("topUp/createTransferTopUp", (data: any) => {
   return topUpAPI.createTransferTopUp(data);
});
const getUserTransferTopUp = createAsyncThunk("topUp/getUserTranferTopUp", (query: any) => {
   return topUpAPI.getUserTransferTopUp(query);
});
const getListTransferTopUp = createAsyncThunk("topUp/getListTranferTopUp", (query: any) => {
   return topUpAPI.getListTransferTopUp(query);
});
//
const transfer = createAsyncThunk("topUp/transfer", (data: any) => {
   return topUpAPI.transfer(data);
});
const getUserTransfer = createAsyncThunk("topUp/getListTranfer", (query: any) => {
   return topUpAPI.getUserTransfer(query);
});
//
const createCardTopUp = createAsyncThunk("topUp/createCardTopUp", (data: any) => {
   return topUpAPI.createCardTopUp(data);
});
const updateCardTopUp = createAsyncThunk("topUp/updateCardTopUp", (data: any) => {
   return topUpAPI.updateCardTopUp(data);
});
const getListCardTopUp = createAsyncThunk("topUp/getListCardTopUp", (query: any) => {
   return topUpAPI.getListCardTopUp(query);
});
const getUserCardTopUp = createAsyncThunk("topUp/getUserCardTopUp", (userId: string) => {
   return topUpAPI.getUserCardTopUp(userId);
});
const getUserCardTopUpV2 = createAsyncThunk("topUp/getUserCardTopUpV2", (query: any) => {
   return topUpAPI.getUserCardTopUpV2(query);
});
//withdraw
const getListWithdraw = createAsyncThunk("topUp/getListWithdraw", (query: any) => {
   return topUpAPI.getListWithdraw(query);
});
const updateWithdrawStatus = createAsyncThunk("topUp/updateWithdrawStatus", (data: any) => {
   return topUpAPI.updateWithdrawStatus(data);
});


export const topUpAction = {
   createTransferTopUp,
   createCardTopUp,
   getListCardTopUp,
   updateCardTopUp,
   transfer,
   getListTransferTopUp,
   getUserTransferTopUp,
   getListBank,
   getUserTransfer,
   getUserCardTopUpV2,
   getUserCardTopUp,
   getListWithdraw,
   updateWithdrawStatus
};
export const topUpSlice = createSlice({
   name: "topUp",
   initialState: {
      transferTopUp: {},
      cardTopUp: {},
      transfers: [],
      listBank: [],
      withdraw: {},
      isLoading: false,
   },
   reducers: {},
   extraReducers: (builder) => {
      // get list card topup
      builder.addCase(getListCardTopUp.pending, (state, action: any) => {
         state.isLoading = true;
      });
      builder.addCase(getListCardTopUp.fulfilled, (state, action: any) => {
         state.cardTopUp = action.payload.data;
         state.isLoading = false;
      });
      builder.addCase(getListCardTopUp.rejected, (state, action) => {
         state.isLoading = false;
      });

      //list bank
      builder.addCase(getListBank.pending, (state, action: any) => {
         state.isLoading = true;
      });
      builder.addCase(getListBank.fulfilled, (state, action: any) => {
         state.listBank = action.payload.data;
         state.isLoading = false;
      });
      builder.addCase(getListBank.rejected, (state, action) => {
         state.isLoading = false;
      });

      /// user transfer topup
      builder.addCase(getUserTransferTopUp.pending, (state, action: any) => {
         state.isLoading = true;
      });
      builder.addCase(getUserTransferTopUp.fulfilled, (state, action: any) => {
         state.transferTopUp = action.payload.data;
         state.isLoading = false;
      });
      builder.addCase(getUserTransferTopUp.rejected, (state, action) => {
         state.isLoading = false;
      });

      /// list transfer topup
      builder.addCase(getListTransferTopUp.pending, (state, action: any) => {
         state.isLoading = true;
      });
      builder.addCase(getListTransferTopUp.fulfilled, (state, action: any) => {
         state.transferTopUp = action.payload.data;
         state.isLoading = false;
      });
      builder.addCase(getListTransferTopUp.rejected, (state, action) => {
         state.isLoading = false;
      });

      /// user card topup
      builder.addCase(getUserCardTopUp.pending, (state, action: any) => {
         state.isLoading = true;
      });
      builder.addCase(getUserCardTopUp.fulfilled, (state, action: any) => {
         state.cardTopUp = {
            items: action.payload.data,
         };
         state.isLoading = false;
      });
      builder.addCase(getUserCardTopUp.rejected, (state, action) => {
         state.isLoading = false;
      });

      /// user card topup v2
      builder.addCase(getUserCardTopUpV2.pending, (state, action: any) => {
         state.isLoading = true;
      });
      builder.addCase(getUserCardTopUpV2.fulfilled, (state, action: any) => {
         state.cardTopUp = action.payload.data;
         state.isLoading = false;
      });
      builder.addCase(getUserCardTopUpV2.rejected, (state, action) => {
         state.isLoading = false;
      });

      /// list transfer
      builder.addCase(getUserTransfer.pending, (state, action: any) => {
         state.isLoading = true;
      });
      builder.addCase(getUserTransfer.fulfilled, (state, action: any) => {
         state.transfers = action.payload.data;
         state.isLoading = false;
      });
      builder.addCase(getUserTransfer.rejected, (state, action) => {
         state.isLoading = false;
      });

      /// list withdraw
      builder.addCase(getListWithdraw.pending, (state, action: any) => {
         state.isLoading = true;
      });
      builder.addCase(getListWithdraw.fulfilled, (state, action: any) => {
         state.withdraw = action.payload.data;
         state.isLoading = false;
      });
      builder.addCase(getListWithdraw.rejected, (state, action) => {
         state.isLoading = false;
      });
   },
});
