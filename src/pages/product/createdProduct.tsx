import { Button, Form, Input, Select, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useForm } from 'antd/es/form/Form';
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { productAPI } from 'api/product.api';
import MySunEditor from 'components/ui/Editor';
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

const { Option } = Select;

const CreatedProduct = () => {
  let location = useLocation();
  const segments = location.pathname.split("/");
  const idProduct = segments[segments.length - 1]
  const dispacth = useDispatch<any>()
  const { allBrand } = useSelector(getListBrand)
  const { product} = useSelector(getListProduct)
  const [form] = useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [content, setContent] = useState<any>('')
  
  const navigate = useNavigate()

  const dataBreadCrumb : any = [
  {
      title: 'Sản phẩm',
  },
  {
      title: <a href="">{(()=>{
        if(idProduct !== 'sp-them-san-pham'){
          return 'Cập Nhật Sản Phẩm'
        }
        return 'Thêm Sản Phẩm'
      })()}</a>,
  },
  
]

  const selectedBrand = allBrand.find(item => item?.id === product?.brand?.id);

  if (idProduct !== 'sp-them-san-pham') {
    form.setFieldsValue({
      name: product.name,
      brand: selectedBrand?.id,
      price: product.price,
      quantity: product.quantity,
      image: product.image,
    });
  } else {
    form.setFieldsValue({
      name: "",
      brand: '',
      price: '',
      quantity: '',
      image: '',
    });
  }

  useEffect(() => {
    setContent(product.content);
  }, [product.content])

  
  useEffect(() => {
    if(idProduct !== 'sp-them-san-pham'){
      dispacth(productAction.getByIdProduct(idProduct))
    } else {
      setContent('');
      setFileList([])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idProduct])

  useEffect(() => {
    dispacth(brandAction.getAllBrand())
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 


  useEffect(() => {
    if(idProduct  !== 'sp-them-san-pham'){
    const mockDataFromAPI = product.image?.map((item : any, index : number)=>{
      return {
        uid : index,
        name : item,
        url: `${process.env.REACT_APP_BASE_API_URL}/${item}`
      }
    })

    setFileList(mockDataFromAPI); 
    }
    
  }, [product, idProduct, product.content]);

  
  

  const onFinish = async (values: any) => {
    const formData = new FormData()
    formData.append("name", values.name);
    formData.append("brand", values.brand);
    formData.append("price", values.price);
    formData.append("content", content);
    formData.append("quantity", values.quantity);
    // formData.append("fileOld", );
    fileList?.forEach((fileModal: any) => {
      formData.append("file", fileModal.originFileObj);
    });
    if(idProduct  !== 'sp-them-san-pham'){
      const result: any = await productAPI.updateProduct(idProduct,formData)
      result.status === 1 ? toast.success(`${result.message}`) : toast.error(`${result.message}`)
      
    }else {
      const result: any = await productAPI.createdProduct(formData)
      result.status === 1 ? toast.success(`${result.message}`) : toast.error(`${result.message}`)
    }
    
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
  return <>
  <BreadCrumb data = {dataBreadCrumb} />
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
      <MySunEditor content={content}  setContent={setContent} />
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
          // onPreview={handlePreview}
        >
          <FiUploadCloud className="mr-1" size={40} />
        </Upload>
      </ImgCrop>
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 3, span: 24 }}>
      <Button type="primary" htmlType="submit">
        {idProduct ? 'Cập nhật' : 'Thêm'} 
      </Button>
    </Form.Item>
  </Form>
  </>
}

export default CreatedProduct