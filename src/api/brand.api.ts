import { ApiInstance } from "helper/api.helper";

export const brandAPI = {
    createdBrand,
    getpagingBrand
};

function createdBrand(body: any) {
    return ApiInstance().post("brand/create", body);
}

function getpagingBrand() {
    return ApiInstance().get("brand/getpaging");
}