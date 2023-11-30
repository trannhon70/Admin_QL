import { Col, Row, Spin } from 'antd'
import { useSelector } from 'react-redux'
import ProxyForm from '../proxy-form/ProxyForm'

const proxyList = ['socks5', 'tmproxy', 'proxyno1', 'tinsoftproxy']
const ManageProxy = () => {
	const { isLoading } = useSelector((state: any) => state.proxy)

	return (
		<div className='w-full p-2'>
			<Spin spinning={isLoading} size='large'>
				<Row gutter={[24, 24]}>
					{proxyList.map((item, index) => (
						<Col md={12} span={24} key={index}>
							<ProxyForm type={item} title={item} />
						</Col>
					))}
				</Row>
			</Spin>
		</div>
	)
}

export default ManageProxy
