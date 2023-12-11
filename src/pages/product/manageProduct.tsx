import React,{useEffect, useState} from 'react';
import { Space, Table, Input, Button, Avatar, Tooltip, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import BreadCrumb from 'components/ui/breadcrumb';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { brandAction, setpagingBrand } from 'redux/brand/brand.slice';
import { getListBrand } from 'redux/brand/brand.selector';
import { IListBrand } from 'interface/user';
import moment from 'moment';
import PaginationCustom from 'components/ui/pagination/PaginationCustom';
import { useNavigate } from "react-router-dom";
import { productAction } from 'redux/product/product.slice';
import { getListProduct } from 'redux/product/product.selector';
import { IListProduct } from 'interface';
import {FormatNumberVND}  from '../../util';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';


const dataBreadCrumb : any = [
    {
        title: 'Sản phẩm',
    },
    {
        title: <a href="">Quản lý Sản Phẩm</a>,
    },
    
  ]
const ManageProduct = () => {
    const navigate = useNavigate();
    const dispacth = useDispatch<any>()
    const {listProduct, count} = useSelector(getListProduct)
    const {  allBrand } = useSelector(getListBrand)
    const [_pageSize, _setPageSize] = useState<number>(10)
    const [_pageIndex, _setPageIndex] = useState<number>(1)
    const [_search, _setSearch] = useState<string>('')
    const [_brand, _setBrand] = useState<any>('')

    const payload = {
      search: _search,
      pageSize: _pageSize,
      pageIndex:  _pageIndex,
      brand: _brand
    }
    useEffect(()=>{
        dispacth(productAction.getpagingProduct(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_pageSize,_pageIndex ])

    useEffect(() => {
      dispacth(brandAction.getAllBrand())
    }, [])

    const selectBrand = allBrand.map((item, index) => {
      return {
        label: item.name,
        value: item.id,
      }
    })

    
    const columns: ColumnsType<IListProduct> = [
        {
            title: 'STT',
            dataIndex: '_id',
            key: '_id',
            render: (text,record,index) => <div>{index+1}</div>,
          },
        {
          title: 'Sản phẩm',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <div>{text}</div>,
        },

        {
            title: 'Thương hiệu',
            dataIndex: 'brand',
            key: 'brand',
            render: (text) => <div>{text?.name}</div>,
          },
          {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <div>{FormatNumberVND(text) }</div>,
          },
          {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text) => <div>{text}</div>,
          },
          {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text,record) => <div style={{display:"flex"}}>
              <Avatar.Group maxCount={2} size={45} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                {
                    text.map((item: any, index: number) => {
                        return <Avatar key={index} size={45} src={`${process.env.REACT_APP_BASE_API_URL}/${item}`} />
                    })
                }
                  </Avatar.Group> 
            </div>
              
          },
        {
            title: 'Thời gian tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => <div>{moment(text).format("DD/MM/YYYY")}</div>,
          },
        {
          title: 'Thao tác',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
                <FaRegEdit onClick={() => updateProduct(_.id)} cursor="pointer" size={20} color='#19910b' />
                <MdDelete onClick={() =>deleteProduct(_)} cursor="pointer" size={20} color='red'/>
            </Space>
          ),
        },
      ];

      const updateProduct = (value: string) => {
        navigate(`/sp-sua-san-pham/${value}`);
      }

      const deleteProduct = (value : any) => {
        dispacth(productAction.deleteProduct(value.id))
        dispacth(productAction.getpagingProduct(payload));
      }
      
      const handleChangePageSize = (value: number) => {
        _setPageSize(value)
      }

      const handleChangePageIndex = (value : number) => {
        _setPageIndex(value)
      }
      const onClickSearch = () => {
        dispacth(productAction.getpagingProduct(payload));
      }

      const handleChangeSelect = (value: any) => {
        _setBrand(value)
      }
    return <div>
    <BreadCrumb data = {dataBreadCrumb} />
    <div className='mb-4'>
      <Input  onChange={(e) => _setSearch(e.target.value)} placeholder="Tìm kiếm..." className='w-[300px]' />
      <Select
        placeholder="Chọn thương hiệu"
        style={{ width: 180 }}
        onChange={handleChangeSelect}
        className='ml-[10px]'
        options={selectBrand}
      />
      <Button onClick={() =>onClickSearch()} className='ml-[10px]' type="primary">Tìm kiếm</Button>
    </div>
     <Table rowKey="rowKey" key="key" columns={columns} dataSource={listProduct} pagination={false} />
     <PaginationCustom
      pageSize={_pageSize}
       pageIndex={_pageIndex} 
       list={count} 
        setPageSize={(value: number) =>
            handleChangePageSize(value)
        }
        setPageIndex={(value: number) => handleChangePageIndex(value)}
     />
</div>
}

export default ManageProduct