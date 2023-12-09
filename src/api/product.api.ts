import { ApiInstance } from "helper/api.helper";

export const productAPI = {
    createdProduct,
    
};

function createdProduct(body: any) {
    
    return ApiInstance().post("product/create", body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }});
}
