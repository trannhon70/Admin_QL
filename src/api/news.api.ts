import { ApiInstance } from "helper/api.helper";

export const newsAPI = {
    getList,
    getOne,
    createNews,
    uploadFile,
    deleteOne,
    updateOne,
};

function getOne(slug: string) {
    const url = `news/detail-post/${slug}`;
    return ApiInstance().get(url);
}

function getList(query: any) {
    const url = "news";
    return ApiInstance().get(url, { params: query });
}

function createNews(data: any) {
    const url = "news";
    return ApiInstance().post(url, data);
}

function uploadFile(data: any) {
    const url = "news/upload-file";
    return ApiInstance().post(url, data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
}

function deleteOne(id: string) {
    const url = `news/${id}`;
    return ApiInstance().delete(url);
}

function updateOne(data: any) {
    const url = `news/${data?.id}`;
    return ApiInstance().patch(url, data);
}
