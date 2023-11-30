import { Table, Tag } from "antd";
import { format } from "date-fns";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import PaginationCustom from "components/ui/pagination/PaginationCustom";
import ConfirmModal from "components/ui/modal/ConfirmModal";
import { LuEdit2 } from "react-icons/lu";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";
import { userAction } from "redux/user/user.slice";

type PropsType = {
    pageIndex: number;
    setPageIndex: Function;
    pageSize: number;
    setPageSize: Function;
    handleSearch: Function;
};
function MembersTable({
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
          sorter: (a: any, b: any) => a.index - b.index,
          width: "100px",
          sortDirections: ["descend", "ascend"],
       },
       {
          title: "Họ Tên",
          dataIndex: "fullName",
       },
       {
          title: "Tên đăng nhập",
          dataIndex: "userName",
       },
       {
          title: "Email",
          dataIndex: "email",
       },
       {
          title: "Trạng thái",
          dataIndex: "status",
       },
       {
          title: "Ngày tạo",
          dataIndex: "createdAt",
          width: "120px",
       },
       // {
       //     title: "Hoạt động",
       //     dataIndex: "action",
       //     width: "120px",
       // },
    ];
    const dispatch = useDispatch<any>();

    const listAdmins = useSelector((state: any) => state.user.listAdmins) || [];
    const isLoading = useSelector((state: any) => state.user.isLoading);

    const handleChangePageIndex = (_page = 1) => {
        setPageIndex(_page);
    };
    const handleChangePageSize = (_pageSize = 5) => {
        setPageSize(_pageSize);
    };

    const admins = listAdmins?.items?.map((item: any, id: number) => {
        return {
            index: id + 1,
            key: id,
            fullName: <p className="line-clamp-2">{item.fullName}</p>,
            userName: <p className="line-clamp-2">{item.userName}</p>,
            email: <p className="line-clamp-2">{item.email}</p>,
            status: (
                <p className="line-clamp-2">
                    {item.deleted_at ? (
                        <Tag color="red">Deleted</Tag>
                    ) : (
                        <Tag color="blue">Active</Tag>
                    )}
                </p>
            ),
            createdAt: (
                <p className="line-clamp-2">
                    {item.created_at
                        ? format(new Date(item.created_at), "dd-MM-yyyy")
                        : "-"}
                </p>
            ),
            action: (
                <div className="flex">
                    <LuEdit2 size={20} className="mr-2 text-sky-500" />

                    <ConfirmModal
                        buttonStyle=""
                        buttonIcon={
                            <RiDeleteBin6Line
                                size={20}
                                className="text-gray-400"
                            />
                        }
                        title="Delete User!"
                        description={`Xóa tài khoản: ${item.fullName}?`}
                        handleSubmit={async () => {
                            await dispatch(userAction.deleteAdmin(item._id));
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
                    dataSource={admins}
                    pagination={false}
                />
            </div>
            <PaginationCustom
                list={listAdmins?.count || 0}
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
export default MembersTable;
