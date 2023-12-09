import { ApiInstance } from "helper/api.helper";
import { IPaginnation } from "interface";

export const brandAPI = {
    createdBrand,
    getpagingBrand,
    deleteBrand,
    updateBrand,
    getBrandById,
    getAllBrand
};

function createdBrand(body: any) {
    return ApiInstance().post("brand/create", body);
}

function getpagingBrand(payload: IPaginnation) {
    return ApiInstance().get(`brand/getpaging?pageIndex=${payload.pageIndex}&pageSize=${payload.pageSize}&search=${payload.search}`);
}

function deleteBrand(id: string) {
    return ApiInstance().delete(`brand/delete/${id}`);
}

function updateBrand(payload: any) {
    return ApiInstance().put(`brand/update/${payload.id}`, payload.body);
}

function getBrandById(id: string) {
    return ApiInstance().get(`brand/getBrandById/${id}`);
}

function getAllBrand() {
    return ApiInstance().get(`brand/getAll`);
}