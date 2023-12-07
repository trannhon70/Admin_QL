import { IListBrand } from "interface/user";

interface brand{
    brand: {
        listBrand: IListBrand[],
        count: number,
        totalPages: number,
        pageSize: number,
        pageIndex: number,
    }
}
export const getListBrand = (state: brand) => {
    return state.brand;
  }