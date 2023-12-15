import { Button, Input, Space, Table, Tag } from "antd";
import type { ColumnsType } from 'antd/es/table';
import BreadCrumb from "components/ui/breadcrumb";
import PaginationCustom from "components/ui/pagination/PaginationCustom";
import moment from "moment";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getPagingUser, getUser } from "redux/user/user.selector";
import { userAction } from "redux/user/user.slice";

const dataBreadCrumb: any = [
    {
        title: 'User',
    },
    {
        title: <a href="">Quản lý Người dùng</a>,
    },

]

const ManagerUser = () => {
    const dispatch = useDispatch()
    const {listUser} = useSelector(getPagingUser)
    const [_search, _setSearch] = useState<string>('')
    const [_pageSize, _setPageSize] = useState<number>(10)
    const [_pageIndex, _setPageIndex] = useState<number>(1)

    const query = {
        search: _search,
        pageSize: _pageSize,
        pageIndex:  _pageIndex,
    }
    const columns: ColumnsType<any> = [
        {
            title: 'STT',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) => <div>{index + 1}</div>,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'emailVeryfied',
            key: 'emailVeryfied',
            render: (text) => <div>{(()=>{
                if(text=== true){
                    return <Tag style={{fontSize:'13px'}} color="success">Đã kích hoạt</Tag>
                }else {
                    return <Tag style={{fontSize:'13px'}} color="warning">Chưa kích hoạt</Tag>
                }
            })()}</div>,
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
                    <MdDelete onClick={() => deleteBrand(_)} cursor="pointer" size={20} color='red' />
                </Space>
            ),
        },
    ];
    

    useEffect(() => {
        
        dispatch(userAction.getpagingUser(query) as any)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[_pageSize,_pageIndex ])
    
    const onClickSearch = () => {
        // dispacth(brandAction.getpagingBrand(payload));
    }

    const deleteBrand = (value: string) => {

        // navigate(`/sua-thuong-hieu/${value}`);
    }

    const handleChangePageSize = (value: number) => {
        _setPageSize(value)
    }

    const handleChangePageIndex = (value: number) => {
        _setPageIndex(value)
    }

    return <div>
        <BreadCrumb data={dataBreadCrumb} />
        <div className='mb-4'>
            <Input onChange={(e) => _setSearch(e.target.value)} placeholder="Tìm kiếm..." className='w-[300px]' />
            <Button onClick={() => onClickSearch()} className='ml-[10px]' type="primary">Tìm kiếm</Button>
        </div>
        <Table columns={columns} dataSource={listUser} pagination={false} />
        <PaginationCustom
            pageSize={_pageSize}
            pageIndex={_pageIndex}
            //    list={count} 
            setPageSize={(value: number) =>
                handleChangePageSize(value)
            }
            setPageIndex={(value: number) => handleChangePageIndex(value)}
        />
    </div>
}

export default ManagerUser