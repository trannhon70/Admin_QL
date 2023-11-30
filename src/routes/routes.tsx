import { ReactElement } from 'react'

import Members from 'pages/members/Members'
import Login from 'pages/login/Login'
import Home from 'pages/home/Home'
import NewsManager from 'pages/news/NewsManager'
import CreateNews from 'pages/news/CreateNews'
import NotFound from 'pages/404/NotFound'
import NewsDetail from 'pages/news/NewsDetail'
import UpdateNews from 'pages/news/UpdateNews'
import Sectors from 'pages/sectors/Sectors'
import Admins from 'pages/members/Admins'
import Profile from 'pages/profile/Profile'
import ForgotPassword from 'pages/forgot-password/ForgotPassword'
import CreateAccount from 'pages/members/CreateAccount'
import UpdateUser from 'pages/members/UpdateUser'
import { ROLES } from 'common/constant'
import BuffSubChannel from 'pages/youtube/buffSunChannel'
import ManageYoutube from 'pages/youtube/manageYoutube'
import BuffsubChannelTiktok from 'pages/tiktok/buffSubChannelTiktok'
import ManageTiktok from 'pages/tiktok/manageTiktok'
import AdminMembers from 'pages/members/AdminMembers'
import SignUp from 'pages/sign-up/SignUp'
import VerifyEmail from 'pages/verify-email/VerifyEmail'
import BuffFollowTwitter from 'pages/twitter/buffFollowTwitter'
import ManageTwitter from 'pages/twitter/manageTwitter'
import BuffFollowFacebook from 'pages/facebook/buffFolloweFacebook'
import ManageFacebook from 'pages/facebook/manageFacebook'
import TopUp from 'pages/top-up/TopUp'
import BuffGoogleMap from 'pages/googleMap/buffGoogleMap'
import ManageGoogleMap from 'pages/googleMap/manageGoogleMap'
import BuffTrafficGoogleSearch from 'pages/traffics/buffTrafficGoogleSearch'
import ManageGoogle from 'pages/traffics/manageGoogle'
import GoogleMapBuffImage from 'pages/googleMap/GoogleMapBuffImage'
import ManageGoogleMapImage from 'pages/googleMap/manageGoogleMapImage'
import TransferTopUpManager from 'pages/top-up-manager/TransferTopUpManager'
import CardTopUpManager from 'pages/top-up-manager/CardTopUpManager'
import BuffFolloweInstagram from 'pages/instagram/buffFollowInstagram'
import ManageInstagram from 'pages/instagram/manageIntagram'
import WithdrawRequest from 'pages/top-up-manager/withdrawRequest'
import SearchAndRateApp from 'pages/googleMap/searchAndRateApp'
import ManageSearchAndRateApp from 'pages/googleMap/manageSearchAndRateApp'
import SearchAndRateAppImage from 'pages/googleMap/searchAndRateAppImage'
import ManageSearchAndRateAppImage from 'pages/googleMap/manageSearchAndRateAppImage'
import BuffTrafficGoogleLink from 'pages/traffics/buffTrafficGoogleLink'
import ManageGoogleLink from 'pages/traffics/manageGoogleLink'
import BuffCommentFacebook from 'pages/facebook/buffCommentFacebook'
import ManageCommentFacebook from 'pages/facebook/manageCommentFacebook'
import BuffCommentYoutube from 'pages/youtube/buffCommentYoutube'
import ManageCommentYoutube from 'pages/youtube/manageCommentYoutube'
import BuffCommentTwitter from 'pages/twitter/buffCommentTwitter'
import ManageCommentTwitter from 'pages/twitter/manageCommentTwitter'
import PostsManager from 'pages/posts/PostsManager'
import PostsDetail from 'pages/posts/PostsDetail'
import DomainManager from 'pages/domain-manager/DomainManager'
import PaymentManager from 'pages/payment-manager/PaymentManager'
import PostsReportManager from 'pages/postsReport/PostsReportManager'
import NotificationSendManager from 'pages/notification-send/NotificationSendManager'
import CreateNotification from 'pages/notification-send/CreateNotification'
import UpdateNotificationSend from 'pages/notification-send/UpdateNotificationSendModal'
import BuffAutoTraffic from 'pages/auto-traffic/buffAutoTraffic'
import ManageProxy from 'pages/proxy/manage-proxy'

type route = {
	path: string
	element: ReactElement
	permission?: string
}

const PublicRoutes: route[] = [
	{
		path: '/dang-nhap',
		element: <Login />,
	},
	{
		path: '/dang-ky',
		element: <SignUp />,
	},
	{
		path: '/quen-mat-khau',
		element: <ForgotPassword />,
	},
	{
		path: '/xac-thuc-tai-khoan',
		element: <VerifyEmail />,
	},
	{
		path: '/404',
		element: <NotFound />,
	},
]

const ProtectedRoutes: route[] = [
	// home
	{
		path: '/bang-dieu-khien',
		element: <Home></Home>,
	},
	// members
	{
		path: '/quan-ly-thanh-vien/cong-dong-seo',
		element: <Members></Members>,
		permission: ROLES.ADMIN,
	},
	{
		path: '/quan-ly-thanh-vien/admin-cong-dong-seo',
		element: <AdminMembers></AdminMembers>,
		permission: ROLES.ADMIN,
	},
	{
		path: '/quan-ly-thanh-vien/quan-tri-vien',
		element: <Admins></Admins>,
		permission: ROLES.ADMIN,
	},
	{
		path: '/quan-ly-thanh-vien/them-thanh-vien',
		element: <CreateAccount></CreateAccount>,
		permission: ROLES.ADMIN,
	},
	{
		path: '/quan-ly-thanh-vien/cong-dong-seo/:username',
		element: <UpdateUser></UpdateUser>,
		permission: ROLES.ADMIN,
	},
	{
		path: '/quan-ly-thanh-vien/admin-cong-dong-seo/:username',
		element: <UpdateUser></UpdateUser>,
		permission: ROLES.ADMIN,
	},
	// news
	{
		path: '/quan-ly-bai-viet',
		element: <NewsManager />,
		permission: ROLES.ADMIN,
	},
	{
		path: '/quan-ly-bai-viet/tao-bai-viet',
		element: <CreateNews />,
		permission: ROLES.ADMIN,
	},
	{
		path: '/quan-ly-bai-viet/chi-tiet/:slug',
		element: <NewsDetail />,
		permission: ROLES.ADMIN,
	},
	{
		path: '/quan-ly-bai-viet/chinh-sua/:slug',
		element: <UpdateNews />,
		permission: ROLES.ADMIN,
	},
	//posts on forum congdongseo
	{
		path: '/quan-ly-bai-dang-CDS',
		element: <PostsManager />,
		permission: ROLES.ADMIN,
	},
	{
		path: '/quan-ly-bai-dang-CDS/chi-tiet/:slug',
		element: <PostsDetail />,
		permission: ROLES.ADMIN,
	},
	{
		path: '/quan-ly-bao-cao-CDS',
		element: <PostsReportManager />,
		permission: ROLES.ADMIN,
	},
	//notification bell CDS
	{
		path: '/quan-ly-thong-bao',
		element: <NotificationSendManager />,
		permission: ROLES.ADMIN,
	},
	{
		path: '/quan-ly-thong-bao/tao-thong-bao',
		element: <CreateNotification />,
		permission: ROLES.ADMIN,
	},

	// sectors
	{
		path: '/quan-ly-danh-muc',
		element: <Sectors />,
		permission: ROLES.ADMIN,
	},
	// profile
	{
		path: '/thong-tin-tai-khoan',
		element: <Profile />,
	},
	{
		path: '/nap-tien',
		element: <TopUp />,
	},
	//Quan ly domain
	// {
	//   path: "/quan-ly-ten-mien",
	//   element: <DomainManager />,
	//   permission: ROLES.ADMIN,
	// },
	//
	{
		path: '/youtube-buff',
		element: <BuffSubChannel />,
	},
	{
		path: '/comment-youtube',
		element: <BuffCommentYoutube />,
	},
	{
		path: '/quan-ly-youtube',
		element: <ManageYoutube />,
		permission: ROLES.ADMIN,
	},
	{
		path: '/quan-ly-comment-youtube',
		element: <ManageCommentYoutube />,
		permission: ROLES.ADMIN,
	},
	{
		path: '/tiktok-buff',
		element: <BuffsubChannelTiktok />,
	},
	{
		path: '/twitter-buff',
		element: <BuffFollowTwitter />,
	},
	{
		path: '/commnet-twitter',
		element: <BuffCommentTwitter />,
	},
	{
		path: '/quan-ly-twitter',
		element: <ManageTwitter />,
	},
	{
		path: '/quan-ly-comment-twitter',
		element: <ManageCommentTwitter />,
	},
	{
		path: '/quan-ly-tiktok',
		element: <ManageTiktok />,
		permission: ROLES.ADMIN,
	},

	{
		path: '/facebook-buff',
		element: <BuffFollowFacebook />,
	},
	{
		path: '/comment-facebook',
		element: <BuffCommentFacebook />,
	},

	{
		path: '/quan-ly-facebook',
		element: <ManageFacebook />,
		permission: ROLES.ADMIN,
	},
	{
		path: '/quan-ly-comment-facebook',
		element: <ManageCommentFacebook />,
		permission: ROLES.ADMIN,
	},

	{
		path: '/google-map-buff',
		element: <BuffGoogleMap />,
	},
	{
		path: '/quan-ly-google-map',
		element: <ManageGoogleMap />,
		permission: ROLES.ADMIN,
	},
	{
		path: '/traffics',
		element: <BuffTrafficGoogleSearch />,
	},
	{
		path: '/traffic-link',
		element: <BuffTrafficGoogleLink />,
	},
	{
		path: '/quan-ly-google',
		element: <ManageGoogle />,
		permission: ROLES.ADMIN,
	},

	{
		path: '/ql-google-link',
		element: <ManageGoogleLink />,
		permission: ROLES.ADMIN,
	},

	{
		path: '/google-map-img',
		element: <GoogleMapBuffImage />,
	},

	{
		path: '/instagram-follow',
		element: <BuffFolloweInstagram />,
	},

	{
		path: '/quan-ly-google-kem-anh',
		element: <ManageGoogleMapImage />,
		permission: ROLES.ADMIN,
	},
	// topup
	{
		path: '/quan-ly-nap-tien-chuyen-khoan',
		element: <TransferTopUpManager />,
		permission: ROLES.ADMIN,
	},
	{
		path: '/quan-ly-nap-the',
		element: <CardTopUpManager />,
		permission: ROLES.ADMIN,
	},

	{
		path: '/quan-ly-instagram',
		element: <ManageInstagram />,
		permission: ROLES.ADMIN,
	},
	{
		path: '/yeu-cau-rut-tien',
		element: <WithdrawRequest />,
		permission: ROLES.ADMIN,
	},

	{
		path: '/quan-ly-proxy',
		element: <ManageProxy />,
		permission: ROLES.ADMIN,
	},

	//thanh toan congdongseo

	{
		path: '/thanh-toan-chuyen-khoan',
		element: <PaymentManager />,
		permission: ROLES.ADMIN,
	},
	// {
	//   path: "/quan-ly-nap-the",
	//   element: <CardTopUpManager />,
	//   permission: ROLES.ADMIN,
	// },
	// {
	//   path: "/yeu-cau-rut-tien",
	//   element: <WithdrawRequest />,
	//   permission: ROLES.ADMIN,
	// },
	///////
	{
		path: '/tim-kiem-va-danh-gia',
		element: <SearchAndRateApp />,
	},
	{
		path: '/tim-kiem-danh-gia-kem-anh',
		element: <SearchAndRateAppImage />,
	},

	{
		path: '/quan-ly-tim-kiem-va-danh-gia',
		element: <ManageSearchAndRateApp />,
	},
	{
		path: '/quan-ly-tim-kiem-danh-gia-kem-anh',
		element: <ManageSearchAndRateAppImage />,
	},
	// auto traffic
	{
		path: '/auto-traffics',
		element: <BuffAutoTraffic />,
	},
]

export { PublicRoutes, ProtectedRoutes }
