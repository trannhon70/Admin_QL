import { Popover, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import moment from "moment";

import PaginationCustom from "components/ui/pagination/PaginationCustom";
import ConfirmModal from "components/ui/modal/ConfirmModal";
import { notifiAction } from "redux/notification/notification.slice";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";
import UpdateNotificationSendModal from "../UpdateNotificationSendModal";
import ViewNotificationSendModal from "../ViewNotificationSendModal";

type PropsType = {
    pageIndex: number;
    setPageIndex: Function;
    pageSize: number;
    setPageSize: Function;
    handleSearch: Function;
};
function ListNotificationSendTable({
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
            width: 60,
            align: "center",
            sorter: (a: any, b: any) => a.index - b.index,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            width: 200
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            width: 300
        },
        {
            title: "Hình thức gửi",
            dataIndex: "typeSend",
            width: 150,
            align: "center",
            ellipsis: true,
            className: "text-[15px]"
        },
        {
            title: "Gửi đến account",
            dataIndex: "usersSend",
            width: 150,
            align: "center",
            ellipsis: true,
            className: "text-[15px]",
            render: (values: any) => {
                return values?.map((value: any) => value.userName).join(", ");
            },
        },
        {
            title: "Trạng thái gửi",
            dataIndex: "statusSend",
            width: 150,
            align: "center",
            className: "text-[15px]",
        },
        {
            title: "Ngày tạo",
            dataIndex: "createDate",
            width: 150,
            align: "center",
            className: "text-[15px]",
            render: (value:any) => value ? moment(value).format("DD/MM/YYYY") : <>-</>,
            sorter: (a: any, b: any) => Date.parse(a.approveDate) - Date.parse(b.approveDate), 
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Ngày gửi",
            dataIndex: "approveDate",
            width: 150,
            align: "center",
            className: "text-[15px]",
            render: (value:any) => value ? moment(value).format("DD/MM/YYYY") : <>-</>,
            sorter: (a: any, b: any) => Date.parse(a.approveDate) - Date.parse(b.approveDate), 
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Hoạt động",
            dataIndex: "action",
            width: 120,
        },
    ];

    const dispatch = useDispatch<any>();

    const newsData = useSelector((state: any) => state.notification.listNotificationsCDS) || {};
    const countData = useSelector((state: any) => state.notification.count) || 0;
    const isLoading = useSelector((state: any) => state.notification.isLoading);

    const handleChangePageIndex = (_page = 1) => {
        setPageIndex(_page);
    };
    const handleChangePageSize = (_pageSize = 5) => {
        setPageSize(_pageSize);
    };

    const listNews = newsData?.map((item: any, id: number) => {
        const notificationStatus: any = {
            1: "Lưu nháp",
            2: "Tạo và gửi thông báo",
        };
        const typeSendContent: any = {
            1: "Gửi qua chuông thông báo",
            2: "Gửi qua email",
            3: "Gửi qua chuông thông báo và email"
        }

        return {
           index: id + 1,
           key: id,
           title: <p className="text-[15px]">{item.title}</p>,
           content: <div className="line-clamp-2 text-[15px]" dangerouslySetInnerHTML={{ __html: item.content }}></div>,
           typeSend: typeSendContent[item.typeSend] || 1,
           usersSend: item?.userId,
           statusSend: notificationStatus[item?.statusSend || 1],
           createDate: item?.createDate,
           approveDate: item?.approveDate,
           action: (
              <div className="flex">
                 <ViewNotificationSendModal item = {item}/>
                 <UpdateNotificationSendModal item = {item} handleSearch = {handleSearch}/>
                 <Popover content="Xóa thông báo">
                    <ConfirmModal
                        buttonStyle=""
                        buttonIcon={<RiDeleteBin6Line size={24} className="text-gray-400" />}
                        title="Xóa thông báo"
                        description={`Thông báo sẽ bị xóa vĩnh viễn`}
                        handleSubmit={async () => {
                        await dispatch(notifiAction.deleteNotificationSendCDS({_id:item._id}));
                        handleSearch();
                        }}
                    ></ConfirmModal> &nbsp;
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
                    dataSource={listNews}
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
export default ListNotificationSendTable;
