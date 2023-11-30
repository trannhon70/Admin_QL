"use client"

import { Table, Popover  } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { LuEdit2 } from "react-icons/lu";
import moment from "moment";
import { BsCheck2All } from "react-icons/bs";
import { useState } from "react";

import PaginationCustom from "components/ui/pagination/PaginationCustom";
import ConfirmModal from "components/ui/modal/ConfirmModal";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";
import { postsAction } from "redux/posts/posts.slice";

type PropsType = {
    pageIndex: number;
    setPageIndex: Function;
    pageSize: number;
    setPageSize: Function;
    handleSearch: Function;
    setSelectedId:any
};
function ListDomainsTable({
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    handleSearch,
    setSelectedId
}: PropsType) {
    const columns: any = [
        {
            title: "Mã",
            dataIndex: "index",
            width: 100,
            align: "center",
            sorter: (a: any, b: any) => a.index - b.index,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Tên miền",
            dataIndex: "domain",
            width: 150,
            ellipsis: true
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            width: 100,
            align: "center",
            render: (value:any) => {
                if (value === "Đã xác thực") {
                  return (
                    <div className="text-center">
                      <span className="bg-green-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                        {value}
                      </span>
                    </div>
                  );
                }
                if (value === "Chờ xác thực") {
                  return (
                    <div className="text-center">
                      <span className="bg-orange-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                        {value}
                      </span>
                    </div>
                  );
                }
            }
        },
        {
            title: "Ngày tạo",
            dataIndex: "createDate",
            width: 100,
            align: "center",
            render: (value:any) => moment(value).format("DD/MM/YYYY"),
        },
        {
            title: "Lĩnh vực",
            dataIndex: "sector",
            width: 160,
            align: "center",
            ellipsis: true,
            render: (values: any) => {
                return values?.map((value: any) => value.sectorName).join(", ");
              },
        },
        {
            title: "Hình ảnh",
            dataIndex: "mainPicture",
            width: 120,
            align: "center",
        },
        {
            title: "Tác giả",
            dataIndex: "creator",
            width: 120,
            align: "center",
            ellipsis: true
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            width: 120,
            align: "center",
            ellipsis: true
        },
        {
            title: "Đường dẫn tĩnh",
            dataIndex: "url",
            width: 180,
            ellipsis: true
        },
        {
            title: "Hoạt động",
            dataIndex: "action",
            width: 120,
        },
    ];

    const dispatch = useDispatch<any>();

    const newsData = useSelector((state: any) => state.domainManager.listDomains) || [];
    const countData = useSelector((state: any) => state.domainManager.count) || 0;
    const isLoading = useSelector((state: any) => state.domainManager.isLoading);
    const [selectedRowKeys, setSelectedRowKeys] = useState<any>();

    const handleChangePageIndex = (_page = 1) => {
        setPageIndex(_page);
    };
    const handleChangePageSize = (_pageSize = 5) => {
        setPageSize(_pageSize);
    };

    const handleApprove = async(id:any, userId:any) => {
        const credit = 1
        await dispatch(postsAction.updateOne({
            _id:id,
            userId,
            credit
        }));
        handleSearch();
    }

    const listDomains = newsData?.map((item: any, id: number) => {
        
        const postsStatus: any = {
            1: "Đã xác thực",
            2: "Chờ xác thực",
        };
        console.log('item', postsStatus[1])
        return {
           index: item?.ExchangeCode,
           key: id,
           _id: item?._id,
           domain: <p className="line-clamp-2">{item.domain}</p>,
           status: postsStatus[item?.status || 2],
           createDate: item.createDate,
           sector: item.sectors,
           mainPicture: (
              <div className="relative h-16 w-20 aspect-video">
                 <img src={item.image.url} alt="thumbnail.png" className="absolute object-cover h-full w-full block left-[25%]"></img>
              </div>
           ),
           creator: item?.userId?.userName || "",
           userId: item?.createBy?._id || "",
           url: <p className="line-clamp-2">{item.slug}</p>,
           phoneNumber: item?.phoneNumber || "",
           action: (
              <div className="flex">
                <Popover content="xem chi tiết">
                    <Link to={`/quan-ly-bai-dang-CDS/chi-tiet/${item.slug}&${item._id}`}>
                        <AiOutlineEye size={24} className="mr-2 text-sky-500 my-auto block" />
                    </Link>
                </Popover>

                 {/* <Link to={`/quan-ly-bai-dang-CDS/chinh-sua/${item.slug}`}>
                    <LuEdit2 size={24} className="mr-2 text-sky-500" />
                 </Link> */}
                <Popover content="xóa bài viết">
                    <ConfirmModal
                        buttonStyle=""
                        buttonIcon={<RiDeleteBin6Line size={24} className="text-gray-400" />}
                        title="Xóa bài đăng trên diễn đàn!"
                        description={`Bài đăng: ${item?.slug} sẽ bị xóa vĩnh viễn`}
                        handleSubmit={async () => {
                        await dispatch(postsAction.deletePost({
                            postId: item?._id,
                            sectorId: item?.sector
                        }));
                        handleSearch();
                        }}
                    ></ConfirmModal>&nbsp;
                </Popover>
                 {
                    item?.status === 1 ?
                    <Popover content="đã duyệt">
                        <BsCheck2All className="text-[26px] text-green-500 opacity-50 cursor-no-drop"/>
                    </Popover>:
                    <Popover content="duyệt bài">
                        <BsCheck2All className="text-[26px] cursor-pointer text-[#f97316]" onClick={() => handleApprove(item?._id, item?.createBy?._id)}/>
                    </Popover>
                 }
              </div>
           ),
        };
    });

    if (isLoading) return <SimpleSpiner isLoading={isLoading} />;

    const onSelectChange = (selectedRowKeys : any, selectedRows:any) => {
        const arrId:Array<object> = [];
        const credit = 1;
        selectedRows.map((row:any) => {
            const obj = {
                _id: row?._id,
                userId: row?.userId,
                credit
            }
            arrId.push(obj)
        });
        setSelectedId([...arrId]);
        setSelectedRowKeys(selectedRowKeys);
    };
    

    return (
        <div className="p-4 rounded-lg border border-gray-300 bg-white">
            <div className="overflow-x-scroll bg-white">
                <Table
                    columns={columns}
                    dataSource={listDomains}
                    pagination={false}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: onSelectChange,
                    }}
                />
            </div>
            <PaginationCustom
                list={countData || 0}
                pageIndex={pageIndex}
                pageSize={pageSize}
                setPageSize={(_pageSize: number) =>
                    handleChangePageSize(_pageSize)
                }
                setPageIndex={(_page: number) => handleChangePageIndex(_page)}
            ></PaginationCustom>
        </div>
    );
}
export default ListDomainsTable;
