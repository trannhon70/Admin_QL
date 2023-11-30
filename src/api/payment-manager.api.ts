import { ApiInstance } from 'helper/api.helper'

export const paymentManagerAPI = {
	ListPayment,
	updateOnePayment,
	updateOneInfo,
}

function ListPayment(query: any) {
	const url = `users/ListPayment`
	return ApiInstance().get(url, { params: query })
}

function updateOnePayment(body: any) {
	const url = `users/updateOnePayment`
	return ApiInstance().post(url, body)
}

function updateOneInfo(body: any) {
	const url = `users/updateOneInfo`
	return ApiInstance().post(url, body)
}
