import React from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { brandAction } from 'redux/brand/brand.slice';

const CreatedBrand = () => {
    const dispacth = useDispatch<any>()
    const onFinish = (values: any) => {
        dispacth(brandAction.createBrand(values))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        name?: string;

    };
    return <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        
        autoComplete="off"
    >
        <Form.Item<FieldType>
            label="Thương hiệu"
            name="name"
            rules={[{ required: true, message: 'Thương hiệu không được bỏ trống!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Thêm
            </Button>
        </Form.Item>
    </Form>
}
export default CreatedBrand