import { ApiInstance } from "helper/api.helper";

export const sectorAPI = { getAll, getList, create, update, deleteOne };

function getAll(query: any) {
    const url = "sector/getAll";
    return ApiInstance().get(url, { params: query });
}

function getList(query: any) {
    const url = "sector/get-list";
    return ApiInstance().get(url, { params: query });
}

function create(data: any) {
    const url = "sector/create";
    return ApiInstance().post(url, data);
}

function update(data: any) {
    const url = `sector/${data?.id}`;
    return ApiInstance().patch(url, data);
}

function deleteOne(id: string) {
    const url = `sector/${id}`;
    return ApiInstance().delete(url);
}
