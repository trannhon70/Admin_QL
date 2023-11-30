"use client"

import { Table, Popover  } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import moment from "moment";

import PaginationCustom from "components/ui/pagination/PaginationCustom";
import ConfirmModal from "components/ui/modal/ConfirmModal";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";
import { postsReportAction } from "redux/postsReport/postsReport.slice";
import PostReportViewModal from "./PostReportViewModal";
import PostReportEditModal from "./PostReportEditModal";

type PropsType = {
    pageIndex: number;
    setPageIndex: Function;
    pageSize: number;
    setPageSize: Function;
    handleSearch: Function;
    userInfo:any
};
function ListReportPostsTable({
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    handleSearch,
    userInfo
}: PropsType) {
    const columns: any = [
        {
            title: "STT",
            dataIndex: "index",
            width: 60,
            align: "center",
            sorter: (a: any, b: any) => a.index - b.index,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Người báo cáo",
            dataIndex: "userIdReport",
            width: 150,
            ellipsis: true
        },
        {
            title: "Nội dung báo cáo",
            dataIndex: "content",
            width: 200,
            ellipsis: true
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            width: 150,
            align: "center",
            render: (value:any) => {
                if (value === "Đã xử lý") {
                  return (
                    <div className="text-center">
                      <span className="bg-green-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                        {value}
                      </span>
                    </div>
                  );
                }
                if (value === "Chưa xử lý") {
                  return (
                    <div className="text-center">
                      <span className="bg-orange-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                        {value}
                      </span>
                    </div>
                  );
                }
                if (value === "Chờ xác thực") {
                    return (
                      <div className="text-center">
                        <span className="bg-yellow-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                          {value}
                        </span>
                      </div>
                    );
                  }
            }
        },
        {
            title: "Ngày báo cáo",
            dataIndex: "createDate",
            width: 100,
            align: "center",
            render: (value:any) => moment(value).format("DD/MM/YYYY"),
        },
        {
            title: "Tác giả bài đăng",
            dataIndex: "creator",
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

    const newsData = useSelector((state: any) => state.postsReport.listReportPosts) || [];
    const countData = useSelector((state: any) => state.postsReport.count) || 0;
    const isLoading = useSelector((state: any) => state.postsReport.isLoading);

    const handleChangePageIndex = (_page = 1) => {
        setPageIndex(_page);
    };
    const handleChangePageSize = (_pageSize = 5) => {
        setPageSize(_pageSize);
    };

    const listPosts = newsData?.map((item: any, id: number) => {
        const postsStatus: any = {
            1: "Đã xử lý",
            2: "Chưa xử lý",
            3: "Chờ xác thực"
        };

        return {
           index: id + 1,
           key: id,
           _id: item?._id,
           userIdReport: <p className="line-clamp-2">{item.userIdReport.userName}</p>,
           content: <p className="line-clamp-2">{item.contentReport}</p>,
           title: <p className="line-clamp-2">{item.title}</p>,
           status: postsStatus[item?.status || 2],
           createDate: item.createDate,
           creator: item?.userCreatePost?.userName || "",
           userId: item?.createBy?._id || "",
           url: <p className="line-clamp-2">{item.slug}</p>,
           action: (
              <div className="flex">
                <PostReportViewModal info = {item} userInfo = {userInfo}/>
                <PostReportEditModal info = {item} userInfo = {userInfo} handleSearch = {handleSearch}/>
                <Popover content="xóa báo cáo">
                    <ConfirmModal
                        buttonStyle=""
                        buttonIcon={<RiDeleteBin6Line size={24} className="text-gray-400" />}
                        title="Xóa báo cáo bài viết trên diễn đàn!"
                        description={`Báo cáo: '${item?.contentReport.length > 60 ? item?.contentReport.slice(0,60) : item?.contentReport}' sẽ bị xóa vĩnh viễn`}
                        handleSubmit={async () => {
                        await dispatch(postsReportAction.deleteReport({
                            _id: item?._id,
                            postId: item?.postId
                        }));
                        handleSearch();
                        }}
                    ></ConfirmModal>&nbsp;
                </Popover>
              </div>
           ),
        };
    });

    if (isLoading) return <SimpleSpiner isLoading={isLoading} />;

    return (
        <div className="p-4 rounded-lg border border-gray-300 bg-white">
            <div className="overflow-x-scroll bg-white">
                <Table
                    columns={columns}
                    dataSource={listPosts}
                    pagination={false}
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
export default ListReportPostsTable;
