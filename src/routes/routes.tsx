import { ReactElement } from 'react'


import Login from 'pages/login/Login'
import Home from 'pages/home/Home'

import NotFound from 'pages/404/NotFound'

import Profile from 'pages/profile/Profile'
import ForgotPassword from 'pages/forgot-password/ForgotPassword'

import { ROLES } from 'common/constant'

import SignUp from 'pages/sign-up/SignUp'
import VerifyEmail from 'pages/verify-email/VerifyEmail'


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
	

	
	// profile
	{
		path: '/thong-tin-tai-khoan',
		element: <Profile />,
	},
	
	
]

export { PublicRoutes, ProtectedRoutes }
