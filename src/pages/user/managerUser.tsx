import { Button, Input, Space, Table } from "antd"
import BreadCrumb from "components/ui/breadcrumb"
import PaginationCustom from "components/ui/pagination/PaginationCustom"
import { useState } from "react"
import type { ColumnsType } from 'antd/es/table';
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const dataBreadCrumb: any = [
    {
        title: 'User',
    },
    {
        title: <a href="">Quản lý Người dùng</a>,
    },

]

const ManagerUser = () => {
    const [_search, _setSearch] = useState<string>('')
    const [_pageSize, _setPageSize] = useState<number>(10)
    const [_pageIndex, _setPageIndex] = useState<number>(1)

    const columns: ColumnsType<any> = [
        {
            title: 'STT',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) => <div>{index + 1}</div>,
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
                    <MdDelete onClick={() => deleteBrand(_)} cursor="pointer" size={20} color='red' />
                </Space>
            ),
        },
    ];
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
        <Table columns={columns} dataSource={[]} pagination={false} />
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