import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createProxy, getProxy } from 'api/proxy.api'
import { toast } from 'react-toastify'

interface Proxy {
	type: string
	list: string[]
}

const getListProxy = createAsyncThunk('proxy/get', () => {
	return getProxy()
})

const postProxy = createAsyncThunk('proxy/create', (data: Proxy) => {
	return createProxy(data)
})

export const proxySlice = createSlice({
	name: 'proxy',
	initialState: {
		errorMessage: '',
		isLoading: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getListProxy.pending, (state, action: any) => {
			state.isLoading = true
		})
		builder.addCase(getListProxy.fulfilled, (state, action: any) => {
			state.isLoading = false
			toast.success('Get list proxy success')
		})
		builder.addCase(getListProxy.rejected, (state, action: any) => {
			state.isLoading = false
			toast.error(action.error.message || 'Get proxy failed')
		})
		// create proxy
		builder.addCase(postProxy.pending, (state, action: any) => {
			state.isLoading = true
		})
		builder.addCase(postProxy.fulfilled, (state, action: any) => {
			state.isLoading = false
			toast.success(action.errorMessage || 'Create proxy successfully')
		})
		builder.addCase(postProxy.rejected, (state, action) => {
			state.isLoading = false
			toast.error(action.error.message || 'Create proxy failed')
		})
	},
})

export const proxyAction = { getListProxy, postProxy }
