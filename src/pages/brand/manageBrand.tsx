import React,{useEffect, useState} from 'react';
import { Space, Table, Input, Button } from 'antd';
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

const dataBreadCrumb : any = [
    {
        title: 'Thương hiệu',
    },
    {
        title: <a href="">Quản lý thương hiệu</a>,
    },
    
  ]
const ManageBrand = () => {
    const navigate = useNavigate();
    const dispacth = useDispatch<any>()
    const {listBrand, count} = useSelector(getListBrand)
    const [_pageSize, _setPageSize] = useState<number>(10)
    const [_pageIndex, _setPageIndex] = useState<number>(1)
    const [_search, _setSearch] = useState<string>('')

    const payload = {
      search: _search,
      pageSize: _pageSize,
      pageIndex:  _pageIndex
    }
    useEffect(()=>{
        dispacth(brandAction.getpagingBrand(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_pageSize,_pageIndex ])

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
                <FaRegEdit onClick={() => updateBrand(_.id)} cursor="pointer" size={20} color='#19910b' />
                <MdDelete onClick={() =>deleteBrand(_)} cursor="pointer" size={20} color='red'/>
            </Space>
          ),
        },
      ];

      const updateBrand = (value: string) => {
        
        navigate(`/sua-thuong-hieu/${value}`);
      }

      const deleteBrand = (value : any) => {
        dispacth(brandAction.deleteBrand(value.id))
      }
      
      const handleChangePageSize = (value: number) => {
        _setPageSize(value)
      }

      const handleChangePageIndex = (value : number) => {
        _setPageIndex(value)
      }
      const onClickSearch = () => {
        dispacth(brandAction.getpagingBrand(payload));
      }
    return <div>
        <BreadCrumb data = {dataBreadCrumb} />
        <div className='mb-4'>
          <Input  onChange={(e) => _setSearch(e.target.value)} placeholder="Tìm kiếm..." className='w-[300px]' />
          <Button onClick={() =>onClickSearch()} className='ml-[10px]' type="primary">Tìm kiếm</Button>
        </div>
         <Table columns={columns} dataSource={listBrand} pagination={false} />
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

export default ManageBrand