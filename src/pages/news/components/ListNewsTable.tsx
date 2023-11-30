import { Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { LuEdit2 } from "react-icons/lu";

import PaginationCustom from "components/ui/pagination/PaginationCustom";
import ConfirmModal from "components/ui/modal/ConfirmModal";
import { newsAction } from "redux/news/news.slice";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";

type PropsType = {
    pageIndex: number;
    setPageIndex: Function;
    pageSize: number;
    setPageSize: Function;
    handleSearch: Function;
};
function ListNewsTable({
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    handleSearch,
}: PropsType) {
    const columns: any = [
        {
            title: "STT",
            dataIndex: "index",
            width: "50px",
            sorter: (a: any, b: any) => a.index - b.index,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            width: "95px",
        },
        {
            title: "Lượt xem",
            dataIndex: "views",
            width: "100px",
            sorter: (a: any, b: any) => a.views - b.views,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Mô tả",
            dataIndex: "description",
        },
        {
            title: "Hình ảnh",
            dataIndex: "images",
        },
        {
            title: "Tác giả",
            dataIndex: "creator",
        },
        {
            title: "Đường dẫn tĩnh",
            dataIndex: "url",
            width: "120px",
        },
        {
            title: "Hoạt động",
            dataIndex: "action",
            width: "120px",
        },
    ];

    const dispatch = useDispatch<any>();

    const newsData = useSelector((state: any) => state.news.listNews) || {};
    const isLoading = useSelector((state: any) => state.news.isLoading);

    const handleChangePageIndex = (_page = 1) => {
        setPageIndex(_page);
    };
    const handleChangePageSize = (_pageSize = 5) => {
        setPageSize(_pageSize);
    };

    const listNews = newsData?.items?.map((item: any, id: number) => {
        const newsStatus: any = {
            1: "Đã duyệt",
            2: "Chờ xét duyệt",
            3: "Nháp",
        };

        return {
           index: id + 1,
           key: id,
           title: <p className="line-clamp-2">{item.title}</p>,
           status: newsStatus[item?.status || 1],
           views: item.views,
           description: <p className="line-clamp-2">{item.description}</p>,
           images: (
              <div className="relative h-10 w-20 aspect-video">
                 <img src={item.thumbnail} alt="thumbnail.png" className="absolute object-cover h-full w-full"></img>
              </div>
           ),
           creator: item?.creator?.userName || "",
           url: <p className="line-clamp-2">{item.slug}</p>,
           action: (
              <div className="flex">
                 <Link to={`/quan-ly-bai-viet/chi-tiet/${item.slug}`}>
                    <AiOutlineEye size={24} className="mr-2 text-sky-500" />
                 </Link>

                 <Link to={`/quan-ly-bai-viet/chinh-sua/${item.slug}`}>
                    <LuEdit2 size={24} className="mr-2 text-sky-500" />
                 </Link>

                 <ConfirmModal
                    buttonStyle=""
                    buttonIcon={<RiDeleteBin6Line size={24} className="text-gray-400" />}
                    title="Delete News !"
                    description={`Bài viết: ${item.title} sẽ bị xóa vĩnh viễn`}
                    handleSubmit={async () => {
                       await dispatch(newsAction.deleteNews(item._id));
                       handleSearch();
                    }}
                 ></ConfirmModal>
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
                    dataSource={listNews}
                    pagination={false}
                />
            </div>
            <PaginationCustom
                list={newsData?.count || 0}
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
export default ListNewsTable;
