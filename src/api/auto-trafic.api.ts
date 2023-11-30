import { ApiInstanceTraffic } from "helper/api.helper";

export const autoTrafficAPI = {
    missionTraffic,
    getPaggingMissionTrafficByUser,
    runMissionTraffic,
    pauseMissionTraffic,
    deleteOneMissionTraffic,
    deleteManyMissionTraffic,
    getInfoTagsList,
};

function missionTraffic(body:any) {
    const url = `mission-traffic`;
    return ApiInstanceTraffic().post(url, body);
}

function getPaggingMissionTrafficByUser(query:
    { 
        pageIndex:number,
        pageSize: number,
        search:string,
        statusFilter: number[]
    }
) {
    const url = `mission-traffic?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}&statusFilter=${JSON.stringify(query.statusFilter)}`;
    return ApiInstanceTraffic().get(url);
}

function runMissionTraffic(id:any) {
    const url = `mission-traffic/${id}/run`;
    return ApiInstanceTraffic().put(url);
}

function pauseMissionTraffic(id:any) {
    const url = `mission-traffic/${id}/pause`;
    return ApiInstanceTraffic().put(url);
}

function deleteOneMissionTraffic(id:any) {
    const url = `mission-traffic/${id}/delete`;
    return ApiInstanceTraffic().delete(url);
}

function deleteManyMissionTraffic(query:any) {
    const url = `mission-traffic/deleteMany`;
    return ApiInstanceTraffic().delete(url, {params: query});
}

function getInfoTagsList() {
    const url = `mission-traffic/count-tags`;
    return ApiInstanceTraffic().get(url);
}
