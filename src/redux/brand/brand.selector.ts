import { IListBrand } from "interface/user";

interface brand{
    brand: {
        listBrand: IListBrand[],
        count: number,
        totalPages: number,
        pageSize: number,
        pageIndex: number,
        brand:IListBrand,
        allBrand: IListBrand[]
    }
}
export const getListBrand = (state: brand) => {
    return state.brand;
  }