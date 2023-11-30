import { ApiInstance } from "helper/api.helper";

export const domainManagerAPI = {
    getListDomains,
};

function getListDomains(query:any) {
    const url = `guestPostExchange/getListDomains`;
    console.log('query', query)
    return ApiInstance().get(url, { params: query });
}

