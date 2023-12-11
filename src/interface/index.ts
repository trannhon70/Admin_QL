export interface IPaginnation {
    search: string,
    pageSize: number,
    pageIndex: number,
    brand?: string
}

export interface IListProduct {
    _id?: string,
    name: string,
    brand: any,
    price: number,
    content: any,
    quantity: number,
    image: any,
    createdAt: string,
    updatedAt: string,
}