import { Button, Card, Form, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { TbExternalLink } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { proxyAction } from 'redux/proxy/proxy.slice'

interface Props {
	type: string
	title: string
}

const ProxyForm = ({ type, title }: Props) => {
	const [form] = Form.useForm()
	const dispatch = useDispatch<any>()

	const onFinish = async (values: any): Promise<void> => {
		const arr: string[] = values.proxy.split('\n')
		dispatch(proxyAction.postProxy({ type: type, list: arr }))
		handleReset()
	}

	const handleReset = () => {
		form.resetFields()
	}
	return (
		<Card>
			<Typography.Title
				level={5}
				style={{ display: 'flex', alignItems: 'center' }}
			>
				{title}
				<Link to='#' style={{ marginLeft: '3px' }}>
					<TbExternalLink size={20} />
				</Link>
			</Typography.Title>
			<Form onFinish={onFinish} form={form}>
				<Form.Item
					name='proxy'
					rules={[{ required: true, message: 'Vui lòng nhập API Key Proxy' }]}
				>
					<TextArea rows={6} />
				</Form.Item>
				<Form.Item>
					<Button
						shape='round'
						type='primary'
						htmlType='submit'
						style={{
							marginTop: '10px',
							border: 'none',
							background:
								'linear-gradient(90deg, rgba(22,162,224,1) 48%, rgba(110,193,228,1) 86%)',
							color: 'white',
						}}
					>
						Lưu
					</Button>
					<Link
						to={'/hasofhoasdf'}
						style={{
							marginTop: '10px',
							marginLeft: '10px',
							border: '1px solid gray',
							padding: '6px 10px',
							borderRadius: '20px',
						}}
					>
						Mua ngay
					</Link>
				</Form.Item>
			</Form>
		</Card>
	)
}

export default ProxyForm
