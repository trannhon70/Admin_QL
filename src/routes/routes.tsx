import { ReactElement } from 'react'


import Login from 'pages/login/Login'
import Home from 'pages/home/Home'

import NotFound from 'pages/404/NotFound'

import Profile from 'pages/profile/Profile'
import ForgotPassword from 'pages/forgot-password/ForgotPassword'

import { ROLES } from 'common/constant'

import SignUp from 'pages/sign-up/SignUp'
import VerifyEmail from 'pages/verify-email/VerifyEmail'
import CreatedBrand from 'pages/brand/createdBrand'
import ManageBrand from 'pages/brand/manageBrand'
import CreatedProduct from 'pages/product/createdProduct'
import ManageProduct from 'pages/product/manageProduct'


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
	{
		path: '/them-thuong-hieu',
		element: <CreatedBrand />,
	},
	{
		path: '/sua-thuong-hieu/:id',
		element: <CreatedBrand />,
	},
	{
		path: '/ql-thuong-hieu',
		element: <ManageBrand />,
	},
	{
		path: '/sp-them-san-pham',
		element: <CreatedProduct />,
	},
	{
		path: '/sp-sua-san-pham/:id',
		element: <CreatedProduct />,
	},
	{
		path: '/sp-ql-san-pham',
		element: <ManageProduct />,
	},
	
]

export { PublicRoutes, ProtectedRoutes }
