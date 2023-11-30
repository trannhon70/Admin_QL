import { ApiInstance } from "helper/api.helper";

export const communityPostsAPI = {
    getPostAdmin,
    getOnePostAdmin,
    deleteOnePost,
    updateOnePost,
    updateManyPost,
    getListReportPosts,
    updateReportOne,
    deleteReport
};

function getPostAdmin(query:any) {
    const url = `CommunitySeo/getPostAdmin`;
    return ApiInstance().get(url, { params: query });
}

function getListReportPosts(query:any) {
    const url = `CommunitySeo/getListReportPosts`;
    return ApiInstance().get(url, { params: query });
}

function getOnePostAdmin(ObjSlug:any) {
    const url = `CommunitySeo/getOnePostAdmin`;
    return ApiInstance().get(url, {params: ObjSlug});
}

function deleteOnePost(objPost: any) {
    const url = `CommunitySeo/deleteOnePost`;
    return ApiInstance().delete(url,{params: objPost});
}

function deleteReport(objPost: any) {
    const url = `CommunitySeo/deleteReport`;
    return ApiInstance().delete(url,{params: objPost});
}

function updateOnePost(body: any) {
    const url = `CommunitySeo/updateOnePost`;
    return ApiInstance().post(url,body);
}

function updateReportOne(body: any) {
    const url = `CommunitySeo/updateReportOne`;
    return ApiInstance().post(url,body);
}

function updateManyPost(body: any) {
    const url = `CommunitySeo/updateManyPost`;
    return ApiInstance().post(url,body);
}


// function createNews(data: any) {
//     const url = "news";
//     return ApiInstance().post(url, data);
// }

