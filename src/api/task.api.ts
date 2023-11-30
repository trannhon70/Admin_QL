import { ApiInstance } from "helper/api.helper";

export function createTask(body: any) {
  const url = "task/create";
  return ApiInstance().post(url, body);
}

export function getPagingUserTask(query: any) {
  const url = `task/get-paging-task-user?pageSize=${query.pageSize}&pageIndex=${query.pageIndex}&userId=${query.userId}&type=${query.type}&search=${query.search}&typeTask=${query.typeTask}`;
  return ApiInstance().get(url);
}

export function getAllTask(query: any) {
  const url = `task/get-all-task?type=${query.type}`;
  return ApiInstance().get(url);
}

export function getAllTypeTask(query: any) {
  const url = `task/get-all-type-task?type=${query.type}&typeTask=${query.typeTask}`;
  return ApiInstance().get(url);
}

//get all SocialMedia
export function getAllSocialMedia() {
  const url = `social-media-platform/get-all`;
  return ApiInstance().get(url);
}

//danh sách user thực hiện nhiệm vụ youtube
export function getPagingTaskById(query: any) {
  const url = `task/get-paging-task-by-id?id=${query.id}&search=${query.search}&pageSize=${query.pageSize}&pageIndex=${query.pageIndex}&status=${query.status}`;
  return ApiInstance().get(url);
}

//check kenh đã follow hay chưa youtube
export function checkChannelFollowedDone(body: any) {
  const url = `channel/check-channel-followed-done`;
  return ApiInstance().post(url, body);
}

export function checkChannelFollowedDoneTwitter(body: any) {
  const url = `channel/check-channel-followed-done-twitter`;
  return ApiInstance().post(url, body);
}

export function checkChannelFollowedFacebook(body: any) {
  const url = `channel/check-channel-followed-done-facebook`;
  return ApiInstance().post(url, body);
}

export function checkFacebookComment(body: any) {
  const url = `channel/check-channel-comment-facebook`;
  return ApiInstance().post(url, body);
}

export function checkYoutubeComment(body: any) {
  const url = `channel/check-channel-comment-youtube`;
  return ApiInstance().post(url, body);
}

export function checkTwitterComment(body: any) {
  const url = `channel/check-channel-comment-twitter`;
  return ApiInstance().post(url, body);
}

export function checkChannelFollowedDoneInstagram(body: any) {
  const url = `channel/checkChannelFollowedDoneInstagram`;
  return ApiInstance().post(url, body);
}

//thanh toán tiền cho tài khoản user hoàn thành nhiệm vụ youtube
export function createPaymentUserYoutube(body: any) {
  const url = `channel/create-payment-user-youtube`;
  return ApiInstance().post(url, body);
}

export function createPaymentUserGoogleMap(body: any) {
  const url = `channel/create-payment-user-google-map`;
  return ApiInstance().post(url, body);
}

export function createPaymentUserGoogle(body: any) {
  const url = `channel/createPaymentUserGoogle`;
  return ApiInstance().post(url, body);
}

export function deleteWorkerUserGoogle(body: any) {
  const url = `channel/deleteWorkerUserGoogle`;
  return ApiInstance().post(url, body);
}

//get danh sách nhiệm vụ review google map
export function getPagingReviewGoogleMap(query: any) {
  const url = `task/get-paging-review-google-map?type=${query.type}&search=${query.search}&pageSize=${query.pageSize}&pageIndex=${query.pageIndex}&typeTask=${query.typeTask}`;
  return ApiInstance().get(url);
}

export function getPagingReviewGoogle(query: any) {
  const url = `task/getPagingReviewGoogle?type=${query.type}&search=${query.search}&pageSize=${query.pageSize}&pageIndex=${query.pageIndex}&statusFilter=${query.statusFilter}&typeTask=${query.typeTask}`;
  return ApiInstance().get(url);
}

//checkGoogleMapRating
export function checkGoogleMapRating(body: any) {
  const url = `channel/check-google-map-rating`;
  return ApiInstance().post(url, body);
}

//checkGoogleMapRating kèm ảnh
export function checkGoogleMapImageRating(body: any) {
  const url = `channel/check-google-map-rating-img`;
  return ApiInstance().post(url, body);
}

//delete error google map
export function deletegooglemapErrors(id: string) {
  const url = `worker/delete/${id}`;
  return ApiInstance().delete(url);
}

export function createTrafficGoogle(body: any) {
  const url = `task/createTrafficGoogle`;
  return ApiInstance().post(url, body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
