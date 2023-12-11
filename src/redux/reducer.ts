import { combineReducers } from 'redux'
import { userSlice } from './user/user.slice'
import {brandSlice} from './brand/brand.slice'
import {productSlice} from './product/product.slice'


const rootReducer = combineReducers({
	user: userSlice.reducer,
	brand: brandSlice.reducer,
	product: productSlice.reducer
})

export default rootReducer
