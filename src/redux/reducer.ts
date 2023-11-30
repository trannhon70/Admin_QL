import { combineReducers } from 'redux'
import { userSlice } from './user/user.slice'
import { newsSlice } from './news/news.slice'
import { sectorSlice } from './sector/sector.slice'
import { topUpSlice } from './top-up/top-up.slice'
import { postsSlice } from './posts/posts.slice'
import { domainManagerSlice } from './domain-manager/domain-manager.slice'
import { paymentManagerSlice } from './payment-manager/payment-manager.slice'
import { notificationSlice } from './notification/notification.slice'
import { postsReportSlice } from './postsReport/postsReport.slice'
import { proxySlice } from './proxy/proxy.slice'

const rootReducer = combineReducers({
	user: userSlice.reducer,
	news: newsSlice.reducer,
	sector: sectorSlice.reducer,
	topUp: topUpSlice.reducer,
	posts: postsSlice.reducer,
	domainManager: domainManagerSlice.reducer,
	paymentManager: paymentManagerSlice.reducer,
	notification: notificationSlice.reducer,
	postsReport: postsReportSlice.reducer,
	proxy: proxySlice.reducer,
})

export default rootReducer
