import { ApiInstance } from "helper/api.helper";
import { IPaginnation } from "interface";

export const productAPI = {
    createdProduct,
    getpagingProduct,
    deleteProduct,
    getByIdProduct,
    updateProduct
};

function createdProduct(body: any) {
    return ApiInstance().post("product/create", body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }});
}

function updateProduct(id : string ,body: any) {
  return ApiInstance().put(`product/update/${id}`, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }});
}

function getpagingProduct(payload: IPaginnation) {
  return ApiInstance().get(`product/getpaging?pageIndex=${payload.pageIndex}&pageSize=${payload.pageSize}&search=${payload.search}&brand=${payload.brand}`);
}

function deleteProduct(id: string) {
  return ApiInstance().delete(`product/delete/${id}`);
}

function getByIdProduct(id: string) {
  return ApiInstance().get(`product/getById/${id}`);
}