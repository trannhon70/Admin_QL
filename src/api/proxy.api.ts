import { ApiInstanceTraffic } from 'helper/api.helper'

interface IProxy {
	type: string
	list: string[]
}

export function getProxy() {
	const url = 'proxy'
	return ApiInstanceTraffic().get(url)
}

export function createProxy(data: IProxy) {
	const url = 'proxy'
	return ApiInstanceTraffic().post(url, data)
}
