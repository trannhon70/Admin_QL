import { Button, DatePicker, Form, Input, Select, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useForm } from 'antd/es/form/Form';
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { userAPI } from 'api/user.api';
import BreadCrumb from 'components/ui/breadcrumb';
import { useEffect, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getListBrand } from 'redux/brand/brand.selector';
import { brandAction } from 'redux/brand/brand.slice';
import { getListProduct } from 'redux/product/product.selector';
import { productAction } from 'redux/product/product.slice';
import { userAction } from 'redux/user/user.slice';
const { TextArea } = Input;
const { Option } = Select;

const dataBreadCrumb: any = [
    {
        title: 'User',
    },
    {
        title: <a href="">
            Thêm người dùng
        </a>,
    },

]

const CreateUser = () => {
    const [form] = useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const dispatch = useDispatch();
    const {role} = useSelector((state : any) => state.user)

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    useEffect(() => {
        dispatch(userAction.getAllRole() as any)
    }, [])

    const onFinish = async (values: any) => {
        console.log(values, 'value');
        
        const formData = new FormData()
        formData.append("username", values.username);
        formData.append("password", values.password);
        formData.append("name", values.name);
        formData.append("date", values.date);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("address", values.address);
        
        fileList?.forEach((fileModal: any) => {
          formData.append("file", fileModal.originFileObj);
        });
        // if(idProduct  !== 'sp-them-san-pham'){
          const result: any = await userAPI.createUser(formData)
          console.log(result,'result');
          
        //   result.status === 1 ? toast.success(`${result.message}`) : toast.error(`${result.message}`)

        // }else {
        //   const result: any = await productAPI.createdProduct(formData)
        //   result.status === 1 ? toast.success(`${result.message}`) : toast.error(`${result.message}`)
        // }

    };


    type FieldType = {
        username?: string;
        password?: string;
        name?: string;
        date?: string;
        email?: string;
        phone?: string;
        address?: string;   
    };
    return <>
        <BreadCrumb data={dataBreadCrumb} />
        <Form
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
                label="Tên Đăng nhập"
                name="username"
                rules={[{ required: true, message: 'Tên đăng nhập không được bỏ trống!' }]}
            >
                <Input allowClear={true} />
            </Form.Item>
            <Form.Item<FieldType>
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: 'Mật khẩu không được bỏ trống!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item<FieldType>
        label="Phân quyền"
        name="role"
        rules={[{ required: true, message: 'Phân quyền không được bỏ trống!' }]}
      >
        <Select allowClear={true} placeholder="Chọn phân quyền...">
          {
            role.map((item : any, index: number) => {
              return <Option key={item.id} value={item.id}>{item.name}</Option>
            })
          }
        </Select>
      </Form.Item>
            <Form.Item<FieldType>
                label="Họ và tên"
                name="name"
                rules={[{ required: true, message: 'Họ và tên không được bỏ trống!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Ngày sinh"
                name="date"
                rules={[{ required: true, message: 'Ngày sinh không được bỏ trống!' }]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Email không được bỏ trống!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<FieldType>
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: 'Số điện thoại không được bỏ trống!' }]}
            >
                <Input type='number' />
            </Form.Item>
            <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Địa chỉ không được bỏ trống!' }]}
            >
                <TextArea rows={4} />
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
                        maxCount={1}
                    >
                        <FiUploadCloud className="mr-1" size={40} />
                    </Upload>
                </ImgCrop>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 3, span: 24 }}>
                <Button type="primary" htmlType="submit">
                    Thêm người dùng
                </Button>
            </Form.Item>
        </Form>
    </>
}

export default CreateUser