import axios from "axios";
import { ApiInstance } from "helper/api.helper";

export const topUpAPI = {
   createTransferTopUp,
   createCardTopUp,
   getListCardTopUp,
   updateCardTopUp,
   transfer,
   getListTransferTopUp,
   getUserTransferTopUp,
   getListBank,
   getUserCardTopUp,
   getUserCardTopUpV2,
   getUserTransfer,
   getListWithdraw,
   updateWithdrawStatus,
};

// transfer top up

function createTransferTopUp(data: any) {
   const url = `top-up/create-transfer-top-up`;
   return ApiInstance().post(url, data);
}

function getListTransferTopUp(query: any) {
   const url = `top-up/transfer-top-up`;
   return ApiInstance().get(url, { params: query });
}

function getUserTransferTopUp(query: any) {
   const url = `top-up/transfer-top-up-by-user`;
   return ApiInstance().get(url, { params: query });
}

//transfer

function transfer(data: any) {
   const url = `top-up/transfer`;
   return ApiInstance().post(url, data);
}

function getUserTransfer(query: any) {
   const url = `top-up/transfer-by-user`;
   return ApiInstance().get(url, { params: query });
}

// card top up
function createCardTopUp(data: any) {
   const url = `top-up/create-card-top-up`;
   return ApiInstance().post(url, data);
}

function updateCardTopUp(data: any) {
   const url = `top-up/update-card-top-up/${data.id}`;
   return ApiInstance().patch(url, data);
}

function getUserCardTopUp(userId: string) {
   const url = `top-up/card-top-up/${userId}`;
   return ApiInstance().get(url);
}

function getUserCardTopUpV2(query: any) {
   const url = `top-up/card-top-up-by-user`;
   return ApiInstance().get(url, { params: query });
}

function getListCardTopUp(query: any) {
   const url = `top-up/card-top-up`;
   return ApiInstance().get(url, { params: query });
}

// withdraw
function getListWithdraw(query: any) {
   const url = `withdraw-money/get-list-withdraw`;
   return ApiInstance().get(url, { params: query });
}
function updateWithdrawStatus(data: any) {
   const url = `withdraw-money/update-withdraw/${data.id}`;
   return ApiInstance().patch(url, data);
}

// bank info
async function getListBank() {
   const url = `https://api.vietqr.io/v2/banks`;
   return axios
      .get(url, {
         headers: {
            "Content-Type": "application/json",
         },
      })
      .then((data) => {
         return data?.data;
      })
      .catch((error) => {
         return Promise.reject(error);
      });
}
