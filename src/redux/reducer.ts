import { combineReducers } from 'redux'
import { userSlice } from './user/user.slice'
import {brandSlice} from './brand/brand.slice'


const rootReducer = combineReducers({
	user: userSlice.reducer,
	brand: brandSlice.reducer
})

export default rootReducer
