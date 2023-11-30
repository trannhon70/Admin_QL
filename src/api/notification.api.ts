import { ApiInstance } from "helper/api.helper";

export const notificationAPI = {
    getAllNotification,
    getNotSeenNotification,
    getSeenNotification,
    updateNotification,
    createNotification,
    getListNotificationCDS,
    updateNotificationSendCDS,
    deleteNotificationSendCDS,
    deleteNotification
};

function getAllNotification(query:any) {
    const url = `notification/getAllNotification`;
    return ApiInstance().get(url, {params: query});
}

function getNotSeenNotification(query:any) {
    const url = `notification/getNotSeenNotification`;
    return ApiInstance().get(url, {params: query});
}

function getSeenNotification(query:any) {
    const url = `notification/getSeenNotification`;
    return ApiInstance().get(url, {params: query});
}

function updateNotification(body: any) {
    const url = `notification/updateNotification`;
    return ApiInstance().post(url,body);
}

// thông báo cho congdongseo

function createNotification(body: any) {
    const url = `notification/createNotification`;
    return ApiInstance().post(url,body);
}

function getListNotificationCDS(query:any) {
    const url = `notification/getListNotificationCDS`;
    return ApiInstance().get(url, {params: query});
}

function updateNotificationSendCDS(body: any) {
    const url = `notification/updateNotificationSendCDS`;
    return ApiInstance().post(url,body);
}

function deleteNotificationSendCDS(query: any) {
    const url = `notification/deleteNotificationSendCDS`;
    return ApiInstance().delete(url,{params: query});
}

async function deleteNotification(query:any) {
    const url = `notification/deleteNotification`;
    return ApiInstance().delete(url, {params: query});
  }


