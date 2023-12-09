import { ROLES } from 'common/constant'
import { ReactElement } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BiLogoFacebook, BiPurchaseTag } from 'react-icons/bi'
import { BsGoogle, BsInstagram, BsTwitter } from 'react-icons/bs'
import { FiYoutube } from 'react-icons/fi'
import { ImNotification } from 'react-icons/im'
import { IoNewspaperOutline } from 'react-icons/io5'
import { MdOutlineCurrencyExchange } from 'react-icons/md'
import { PiAirTrafficControlBold } from 'react-icons/pi'
import { RxDotFilled } from 'react-icons/rx'
import { SiGooglemaps, SiTraefikproxy } from 'react-icons/si'
import { TbDashboard } from 'react-icons/tb'

export type MenuItemType = {
	id: string
	icon: ReactElement
	label: string
	link: string
	permission?: string
	children: Array<ChildMenuItemType>
}

export type ChildMenuItemType = {
	id: string
	icon: ReactElement
	label: string
	link: string
	permission?: string
}

const MenuData: Array<MenuItemType> = [
	{
		id: 'brand',
		icon: <TbDashboard size={26} />,
		label: 'Thương hiệu',
		link: '/thuong-hieu',
		children: [
			{
				id: 'created-brand',
				label: 'Thêm thương hiệu',
				icon: <RxDotFilled />,
				link: '/them-thuong-hieu',
			},
			{
				id: 'ql-brand',
				label: 'QL thương hiệu',
				icon: <RxDotFilled />,
				link: '/ql-thuong-hieu',
			},
		],
	},
	{
		id: 'sp',
		icon: <AiOutlineUser size={24} />,
		label: 'Sản phẩm',
		link: '/sp',
		// permission: ROLES.ADMIN,
		children: [
			{
				id: 'sp-created',
				label: 'Thêm Sản Phẩm',
				icon: <RxDotFilled />,
				// permission: ROLES.ADMIN,
				link: '/sp-them-san-pham',
			},
			{
				id: 'sp-management',
				label: 'Quản lý Sản Phẩm',
				icon: <RxDotFilled />,
				// permission: ROLES.ADMIN,
				link: '/sp-ql-san-pham',
			},
			
		],
	},
	
]
export { MenuData }

