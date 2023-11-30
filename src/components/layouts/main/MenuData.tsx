import { ReactElement } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BiLogoFacebook, BiPurchaseTag } from 'react-icons/bi'
import { TbDashboard } from 'react-icons/tb'
import { FiYoutube } from 'react-icons/fi'
import { RxDotFilled } from 'react-icons/rx'
import { GrDomain } from 'react-icons/gr'
import { IoLogoTiktok, IoNewspaperOutline } from 'react-icons/io5'
import { ROLES } from 'common/constant'
import { BsGoogle, BsInstagram, BsTwitter } from 'react-icons/bs'
import { MdOutlineCurrencyExchange } from 'react-icons/md'
import { SiGooglemaps, SiTraefikproxy } from 'react-icons/si'
import { ImNotification } from 'react-icons/im'
import { FcGoogle } from 'react-icons/fc'
import { PiAirTrafficControlBold } from 'react-icons/pi'

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
		id: 'home',
		icon: <TbDashboard size={26} />,
		label: 'Bảng điều khiển',
		link: '/bang-dieu-khien',
		children: [
			{
				id: 'dashboard',
				label: 'Bảng điều khiển',
				icon: <RxDotFilled />,
				link: '/bang-dieu-khien',
			},
		],
	},
	{
		id: 'users',
		icon: <AiOutlineUser size={24} />,
		label: 'Quản lý thành viên',
		link: '/quan-ly-thanh-vien',
		permission: ROLES.ADMIN,
		children: [
			{
				id: 'users-management',
				label: 'Cộng đồng SEO',
				icon: <RxDotFilled />,
				permission: ROLES.ADMIN,
				link: '/quan-ly-thanh-vien/cong-dong-seo',
			},
			{
				id: 'admins-seo',
				label: 'Admin CD-SEO',
				icon: <RxDotFilled />,
				permission: ROLES.ADMIN,
				link: '/quan-ly-thanh-vien/admin-cong-dong-seo',
			},
			{
				id: 'admins-management',
				label: 'Quản trị viên',
				icon: <RxDotFilled />,
				permission: ROLES.ADMIN,
				link: '/quan-ly-thanh-vien/quan-tri-vien',
			},
		],
	},
	{
		id: 'Chuyên mục',
		icon: <BiPurchaseTag size={24} />,
		label: 'Quản lý chuyên mục',
		link: '/quan-ly-chuyen-muc',
		permission: ROLES.ADMIN,
		children: [
			{
				id: 'sector-management',
				label: 'Danh mục',
				icon: <RxDotFilled />,
				link: '/quan-ly-danh-muc',
				permission: ROLES.ADMIN,
			},
		],
	},
	{
		id: 'posts',
		icon: <IoNewspaperOutline size={24} />,
		label: 'Quản lý bài viết',
		link: '/quan-ly-bai-viet',
		permission: ROLES.ADMIN,
		children: [
			{
				id: 'pots-management',
				label: 'Bài viết',
				icon: <RxDotFilled />,
				link: '/quan-ly-bai-viet',
				permission: ROLES.ADMIN,
			},
			{
				id: 'posts-community-seo-management',
				label: 'Bài đăng trên diễn đàn',
				icon: <RxDotFilled />,
				link: '/quan-ly-bai-dang-CDS',
				permission: ROLES.ADMIN,
			},
			{
				id: 'report-posts-community-seo-management',
				label: 'Báo cáo bài viết diễn đàn',
				icon: <RxDotFilled />,
				link: '/quan-ly-bao-cao-CDS',
				permission: ROLES.ADMIN,
			},
		],
	},

	// quan ly thong bao
	{
		id: 'notification',
		icon: <ImNotification size={24} />,
		label: 'Quản lý thông báo',
		link: '/quan-ly-thong-bao',
		permission: ROLES.ADMIN,
		children: [
			{
				id: 'notification-to-user',
				label: 'Gửi thông báo cho user',
				icon: <RxDotFilled />,
				link: '/quan-ly-thong-bao',
				permission: ROLES.ADMIN,
			},
		],
	},

	// quan ly ten mien
	// {
	//   id: "domain",
	//   icon: <GrDomain size={24} />,
	//   label: "Quản lý tên miền",
	//   link: "/quan-ly-ten-mien",
	//   permission: ROLES.ADMIN,
	//   children: [
	//     {
	//       id: "domain-manager",
	//       label: "Xác thực tên miền",
	//       icon: <RxDotFilled />,
	//       link: "/quan-ly-ten-mien",
	//       permission: ROLES.ADMIN,
	//     },
	//   ],
	// },

	// top-up
	{
		id: 'load-money-management',
		icon: <MdOutlineCurrencyExchange size={22} />,
		label: 'Quản lý nạp tiền admin',
		link: '/quan-ly-nap-tien',
		permission: ROLES.ADMIN,
		children: [
			{
				id: 'load-money-transfer',
				label: 'Tiền chuyển khoản',
				icon: <RxDotFilled />,
				link: '/quan-ly-nap-tien-chuyen-khoan',
				permission: ROLES.ADMIN,
			},
			{
				id: 'load-money-card',
				label: 'Tiền nạp thẻ',
				icon: <RxDotFilled />,
				link: '/quan-ly-nap-the',
				permission: ROLES.ADMIN,
			},
			{
				id: 'withdraw-request',
				label: 'Yêu cầu rút tiền',
				icon: <RxDotFilled />,
				link: '/yeu-cau-rut-tien',
				permission: ROLES.ADMIN,
			},
		],
	},
	// thanh toan mua credit congdongseo
	{
		id: 'payment-management',
		icon: <MdOutlineCurrencyExchange size={22} />,
		label: 'Quản lý thanh toán CDS',
		link: '/quan-ly-thanh-toan',
		permission: ROLES.ADMIN,
		children: [
			{
				id: 'money-transfer-bank',
				label: 'Thanh toán chuyển khoản',
				icon: <RxDotFilled />,
				link: '/thanh-toan-chuyen-khoan',
				permission: ROLES.ADMIN,
			},
			// {
			//   id: "load-money-card",
			//   label: "Tiền nạp thẻ",
			//   icon: <RxDotFilled />,
			//   link: "/quan-ly-nap-the",
			//   permission: ROLES.ADMIN,
			// },
			// {
			//   id: "withdraw-request",
			//   label: "Yêu cầu rút tiền",
			//   icon: <RxDotFilled />,
			//   link: "/yeu-cau-rut-tien",
			//   permission: ROLES.ADMIN,
			// },
		],
	},
	// social
	{
		id: 'youtube',
		icon: <FiYoutube size={24} />,
		label: 'Youtube buff',
		link: '/youtube-buff',
		children: [
			{
				id: 'youtube-management',
				label: 'Buff follow youtube',
				icon: <RxDotFilled />,
				link: '/youtube-buff',
			},
			{
				id: 'comment-youtube',
				label: 'Buff comment youtube',
				icon: <RxDotFilled />,
				link: '/comment-youtube',
			},
		],
	},
	{
		id: 'ql-youtube',
		icon: <FiYoutube size={24} />,
		label: 'Quản lý youtube',
		link: '/quan-ly-youtube',
		permission: ROLES.ADMIN,
		children: [
			{
				id: 'ql-youtube-1',
				label: 'Quản lý follow',
				icon: <RxDotFilled />,
				link: '/quan-ly-youtube',
				permission: ROLES.ADMIN,
			},
			{
				id: 'ql-youtube-2',
				label: 'Quản lý comment',
				icon: <RxDotFilled />,
				link: '/quan-ly-comment-youtube',
				permission: ROLES.ADMIN,
			},
		],
	},

	//  {
	//     id: "ql-tiktok",
	//     icon: <IoLogoTiktok size={24} />,
	//     label: "Quản lý tiktok",
	//     link: "/quan-ly-tiktok",
	//     permission: ROLES.ADMIN,
	//     children: [
	//        {
	//           id: "ql-tiktok-1",
	//           label: "Quản lý follow",
	//           icon: <RxDotFilled />,
	//           link: "/quan-ly-tiktok",
	//           permission: ROLES.ADMIN,
	//        },
	//     ],
	//  },

	// {
	//   id: "tiktok",
	//   icon: <IoLogoTiktok size={24} />,
	//   label: "Tiktok buff",
	//   link: "/tiktok-buff",
	//   children: [
	//     {
	//       id: "tiktok-management",
	//       label: "Buff follow tiktok",
	//       icon: <RxDotFilled />,
	//       link: "/tiktok-buff",
	//     },
	//   ],
	// },

	{
		id: 'ql-twitter',
		icon: <BsTwitter size={24} />,
		label: 'Quản lý twitter',
		link: '/quan-ly-twitter',
		permission: ROLES.ADMIN,
		children: [
			{
				id: 'ql-twitter-1',
				label: 'Quản lý follow twitter',
				icon: <RxDotFilled />,
				link: '/quan-ly-twitter',
				permission: ROLES.ADMIN,
			},
			{
				id: 'ql-twitter-2',
				label: 'Quản lý comment twitter',
				icon: <RxDotFilled />,
				link: '/quan-ly-comment-twitter',
				permission: ROLES.ADMIN,
			},
		],
	},

	{
		id: 'twitter',
		icon: <BsTwitter size={24} />,
		label: 'Twitter buff',
		link: '/twitter-buff',
		children: [
			{
				id: 'twitter-management',
				label: 'Buff follow twitter',
				icon: <RxDotFilled />,
				link: '/twitter-buff',
			},
			{
				id: 'twitter-management-1',
				label: 'Buff comment twitter',
				icon: <RxDotFilled />,
				link: '/commnet-twitter',
			},
		],
	},
	{
		id: 'ql-facebook',
		icon: <BiLogoFacebook size={24} />,
		label: 'Quản lý facebook',
		link: '/quan-ly-facebook',
		permission: ROLES.ADMIN,
		children: [
			{
				id: 'ql-facebook-1',
				label: 'Quản lý follow facebook',
				icon: <RxDotFilled />,
				link: '/quan-ly-facebook',
				permission: ROLES.ADMIN,
			},
			{
				id: 'ql-facebook-2',
				label: 'Quản lý comment facebook',
				icon: <RxDotFilled />,
				link: '/quan-ly-comment-facebook',
				permission: ROLES.ADMIN,
			},
		],
	},
	{
		id: 'facebook',
		icon: <BiLogoFacebook size={24} />,
		label: 'Facebook buff',
		link: '/facebook-buff',
		children: [
			{
				id: 'facebook-management',
				label: 'Buff follow facebook',
				icon: <RxDotFilled />,
				link: '/facebook-buff',
			},
			{
				id: 'comment-facebook',
				label: 'Buff comment facebook',
				icon: <RxDotFilled />,
				link: '/comment-facebook',
			},
		],
	},
	{
		id: 'ql-google-map',
		icon: <SiGooglemaps size={24} />,
		label: 'Quản lý google map',
		link: '/quan-ly-google-map',
		permission: ROLES.ADMIN,
		children: [
			{
				id: 'ql-google-map-1',
				label: 'Google map',
				icon: <RxDotFilled />,
				link: '/quan-ly-google-map',
				permission: ROLES.ADMIN,
			},
			{
				id: 'ql-google-map-kem-anh',
				label: 'Google map kèm ảnh',
				icon: <RxDotFilled />,
				link: '/quan-ly-google-kem-anh',
				permission: ROLES.ADMIN,
			},
			{
				id: 'quan-ly-tim-kiem-va-danh-gia',
				label: 'Tìm kiếm và đánh giá app',
				icon: <RxDotFilled />,
				link: '/quan-ly-tim-kiem-va-danh-gia',
				permission: ROLES.ADMIN,
			},
			{
				id: 'ql-tim-kiem-va-danh-gia-kem-anh',
				label: 'Tìm kiếm và đánh giá app kèm ảnh',
				icon: <RxDotFilled />,
				link: '/quan-ly-tim-kiem-danh-gia-kem-anh',
				permission: ROLES.ADMIN,
			},
		],
	},
	{
		id: 'google-map',
		icon: <SiGooglemaps size={24} />,
		label: 'Google map',
		link: '/google-map-buff',
		children: [
			{
				id: 'google-map-1',
				label: 'Review google map',
				icon: <RxDotFilled />,
				link: '/google-map-buff',
			},
			{
				id: 'google-map-img',
				label: 'Google map kèm ảnh',
				icon: <RxDotFilled />,
				link: '/google-map-img',
			},
			{
				id: 'tim-kiem-va-danh-gia',
				label: 'Tìm kiếm và đánh giá app',
				icon: <RxDotFilled />,
				link: '/tim-kiem-va-danh-gia',
			},
			{
				id: 'a-tim-kiem-va-danh-gia-kem-anh',
				label: 'Tìm kiếm và đánh giá app kèm ảnh',
				icon: <RxDotFilled />,
				link: '/tim-kiem-danh-gia-kem-anh',
			},
		],
	},

	{
		id: 'ql-google',
		icon: <BsGoogle size={24} />,
		label: 'Quản lý google',
		link: '/quan-ly-google',
		permission: ROLES.ADMIN,
		children: [
			{
				id: 'ql-google-1',
				label: 'Quản lý google Search',
				icon: <RxDotFilled />,
				link: '/quan-ly-google',
				permission: ROLES.ADMIN,
			},
			{
				id: 'ql-google-2',
				label: 'Quản lý google Link',
				icon: <RxDotFilled />,
				link: '/ql-google-link',
				permission: ROLES.ADMIN,
			},
		],
	},

	{
		id: 'traffics',
		icon: <BsGoogle size={24} />,
		label: 'Traffic buff',
		link: '/traffics',
		children: [
			{
				id: 'traffics-1',
				label: 'Google user search',
				icon: <RxDotFilled />,
				link: '/traffics',
			},
			{
				id: 'traffics-2',
				label: 'Google user link',
				icon: <RxDotFilled />,
				link: '/traffic-link',
			},
		],
	},
	{
		id: 'quan-ly-instagram',
		icon: <BsInstagram size={28} />,
		label: 'Quản lý Instagram',
		link: '/quan-ly-instagram',
		permission: ROLES.ADMIN,
		children: [
			{
				id: 'quan-ly-instagram-1',
				label: 'Follow instagran',
				icon: <RxDotFilled />,
				link: '/quan-ly-instagram',
				permission: ROLES.ADMIN,
			},
		],
	},
	{
		id: 'instagram-follow',
		icon: <BsInstagram size={28} />,
		label: 'Instagram',
		link: '/instagram-follow',
		children: [
			{
				id: 'instagram-follow-1',
				label: 'Follow instagran',
				icon: <RxDotFilled />,
				link: '/instagram-follow',
			},
		],
	},
	{
		id: 'proxy',
		icon: <SiTraefikproxy size={24} />,
		label: 'Quản lý Proxy',
		link: '/manage-proxy',
		permission: ROLES.ADMIN,
		children: [
			{
				id: 'them-proxy',
				label: 'Thêm proxy',
				icon: <RxDotFilled />,
				link: '/quan-ly-proxy',
				permission: ROLES.ADMIN,
			},
		],
	},
	//auto traffic
	{
		id: 'auto-traffics',
		icon: <PiAirTrafficControlBold size={24} />,
		label: 'Auto Traffic buff',
		link: '/auto-traffics',
		children: [
			{
				id: 'auto-traffics-1',
				label: 'Tăng Traffic tự động',
				icon: <RxDotFilled />,
				link: '/auto-traffics',
			},
		],
	},
]
export { MenuData }
