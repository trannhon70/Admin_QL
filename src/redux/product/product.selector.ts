import { IListProduct } from "interface";

interface brand{
    product: {
        listProduct: IListProduct[],
        count: number,
        totalPages: number,
        pageSize: number,
        pageIndex: number,
        product: IListProduct
    }
}
export const getListProduct = (state: brand) => {
    return state.product;
  }