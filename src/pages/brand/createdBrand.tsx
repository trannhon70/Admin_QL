import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { brandAction } from 'redux/brand/brand.slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { getListBrand } from 'redux/brand/brand.selector';
import { useForm } from 'antd/es/form/Form';

const CreatedBrand = () => {
    let location = useLocation();
    const segments = location.pathname.split("/");
    const idBrand = segments[segments.length - 1]
    const dispacth = useDispatch<any>()
    const {brand} = useSelector(getListBrand)
    const [form] = useForm();
    const navigate = useNavigate()

    if(idBrand !== 'them-thuong-hieu'){
        form.setFieldsValue({
            name: brand.name,
            basic: brand.id
        });
    }else {
        form.setFieldsValue({
            name: "",
        });
    }

    const onFinish = (values: any) => {
   
        if(idBrand !== 'them-thuong-hieu'){
            const payload ={
                id:idBrand,
                body:values
            }
            dispacth(brandAction.updateBrand(payload))
            navigate('/ql-thuong-hieu')
        }else{
            dispacth(brandAction.createBrand(values))
        }
    };
  
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if( idBrand !== 'thuong-hieu') {
            dispacth(brandAction.getBrandById(idBrand))
        }
    }, [idBrand])

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
        form={form}
        autoComplete="off"
    >
        <Form.Item<FieldType>
            label="Thương hiệu"
            name="name"
            rules={[{ required: true, message: 'Thương hiệu không được bỏ trống!' }]}
        >
            <Input  />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
               {idBrand !== 'them-thuong-hieu' ? 'Sửa' : 'Thêm'}
            </Button>
        </Form.Item>
    </Form>
}
export default CreatedBrand