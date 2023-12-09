import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { brandAction } from 'redux/brand/brand.slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { getListBrand } from 'redux/brand/brand.selector';
import { useForm } from 'antd/es/form/Form';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { productAction } from 'redux/product/product.slice';
import { toast } from 'react-toastify';
import { productAPI } from 'api/product.api';
import ImgCrop from 'antd-img-crop';
import { FiUploadCloud } from 'react-icons/fi';
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import MySunEditor from 'components/ui/Editor';
const { Option } = Select;
const CreatedProduct = () => {
  let location = useLocation();
  const segments = location.pathname.split("/");
  const idBrand = segments[segments.length - 1]
  const dispacth = useDispatch<any>()
  const { brand, allBrand } = useSelector(getListBrand)
  const [form] = useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [content, setContent] = useState<any>()

  const navigate = useNavigate()

  console.log(fileList, 'fileList');

  if (idBrand !== 'them-thuong-hieu') {
    form.setFieldsValue({
      name: brand.name,
      basic: brand.id
    });
  } else {
    form.setFieldsValue({
      name: "",
    });
  }

  useEffect(() => {
    dispacth(brandAction.getAllBrand())
  }, [])

  const onFinish = async (values: any) => {
    const formData = new FormData()
    formData.append("name", values.name);
    formData.append("brand", values.brand);
    formData.append("price", values.price);
    formData.append("content", content);
    formData.append("quantity", values.quantity);
    fileList?.forEach((fileModal: any) => {
      formData.append("file", fileModal.originFileObj);
    });
    const result: any = await productAPI.createdProduct(formData)
    result.status === 1 ? toast.success(`${result.message}`) : toast.error(`${result.message}`)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  type FieldType = {
    name?: string;
    brand?: any;
    price?: number;
    content?: any;
    quantity?: number;
    image?: any;
  };
  return <Form
    name="basic"
    labelCol={{ span: 3 }}
    wrapperCol={{ span: 21 }}
    style={{ maxWidth: "100%" }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    form={form}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Tên sản phẩm"
      name="name"
      rules={[{ required: true, message: 'Tên sản phẩm không được bỏ trống!' }]}
    >
      <Input allowClear={true} />
    </Form.Item>
    <Form.Item<FieldType>
      label="Thương hiệu"
      name="brand"
      rules={[{ required: true, message: 'Thương hiệu không được bỏ trống!' }]}
    >
      <Select allowClear={true} placeholder="Chọn thương hiệu...">
        {
          allBrand.map((item, index) => {
            return <Option key={item.id} value={item.id}>{item.name}</Option>
          })
        }
      </Select>
    </Form.Item>
    <Form.Item<FieldType>
      label="Giá"
      name="price"
      rules={[{ required: true, message: 'Giá sản phẩm không được bỏ trống!' }]}
    >
      <Input type='number' />
    </Form.Item>
    <Form.Item<FieldType>
      label="Mô tả"
      name="content"
    >
      <MySunEditor setContent={setContent} />
    </Form.Item>
    <Form.Item<FieldType>
      label="Số lượng"
      name="quantity"
      rules={[{ required: true, message: 'Số lượng không được bỏ trống!' }]}
    >
      <Input type='number' />
    </Form.Item>
    <Form.Item
      name="image"
      label="Upload"
    >
      <ImgCrop rotationSlider>
        <Upload
          className=""
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
        >
          <FiUploadCloud className="mr-1" size={40} />
        </Upload>
      </ImgCrop>
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 3, span: 24 }}>
      <Button type="primary" htmlType="submit">
        Thêm
      </Button>
    </Form.Item>
  </Form>
}

export default CreatedProduct