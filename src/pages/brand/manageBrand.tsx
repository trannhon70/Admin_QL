import React,{useEffect} from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import BreadCrumb from 'components/ui/breadcrumb';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { brandAction } from 'redux/brand/brand.slice';
import { getListBrand } from 'redux/brand/brand.selector';
import { IListBrand } from 'interface/user';
import moment from 'moment';
import PaginationCustom from 'components/ui/pagination/PaginationCustom';

const dataBreadCrumb : any = [
    {
        title: 'Thương hiệu',
    },
    {
        title: <a href="">Quản lý thương hiệu</a>,
    },
    
  ]
const ManageBrand = () => {
    const dispacth = useDispatch<any>()
    const {listBrand,pageIndex, pageSize, totalPages} = useSelector(getListBrand)
    
    useEffect(()=>{
        dispacth(brandAction.getpagingBrand());
    }, [])

    const columns: ColumnsType<IListBrand> = [
        {
            title: 'STT',
            dataIndex: 'name',
            key: 'name',
            render: (text,record,index) => <div>{index+1}</div>,
          },
        {
          title: 'Thương hiệu',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <div>{text}</div>,
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
                <FaRegEdit cursor="pointer" size={20} color='#19910b' />
                <MdDelete cursor="pointer" size={20} color='red'/>
            </Space>
          ),
        },
      ];
      
      const handleChangePageSize = (_pageSize: number) => {
        console.log(_pageSize, '_pageSize')
      }

      const handleChangePageIndex = (_page : number) => {
        console.log(_page, '_page')
      }
      
    return <div>
        <BreadCrumb data = {dataBreadCrumb} />
         <Table columns={columns} dataSource={listBrand} pagination={false} />
         <PaginationCustom pageSize={pageSize} pageIndex={pageIndex} list={totalPages} 
            setPageSize={(_pageSize: number) =>
                handleChangePageSize(_pageSize)
            }
            setPageIndex={(_page: number) => handleChangePageIndex(_page)}
         />
    </div>
}

export default ManageBrand