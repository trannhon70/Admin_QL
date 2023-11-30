import { Table, Tag } from "antd";
import { format } from "date-fns";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PaginationCustom from "components/ui/pagination/PaginationCustom";
import ConfirmModal from "components/ui/modal/ConfirmModal";
import { LuEdit2 } from "react-icons/lu";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";
import { userAction } from "redux/user/user.slice";
import { toast } from "react-toastify";
import TopUpModal from "./TopUpModal";

type PropsType = {
   pageIndex: number;
   setPageIndex: Function;
   pageSize: number;
   setPageSize: Function;
   handleSearch: Function;
   memberType: number;
};
function MembersTable({ pageIndex, setPageIndex, pageSize, setPageSize, handleSearch, memberType }: PropsType) {
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
         title: "Số dư (VND)",
         dataIndex: "accountBalance",
      },
      {
         title: "Trạng thái",
         dataIndex: "status",
      },
      {
         title: "Ngày tạo",
         dataIndex: "createdDate",
         width: "120px",
      },
      {
         title: "Hoạt động",
         dataIndex: "action",
         width: "120px",
      },
   ];

   const dispatch = useDispatch<any>();

   const getListUsers: any = {
      0: useSelector((state: any) => state.user.listUsers) || [],
      1: useSelector((state: any) => state.user.listAdmins) || [],
   };

   const deleteMember: any = {
      0: (id: string) => dispatch(userAction.deleteUser(id)),
      1: (id: string) => dispatch(userAction.deleteAdmin(id)),
   };

   const listUsers = getListUsers[memberType] || [];
   const isLoading = useSelector((state: any) => state.user.isLoading);

   const handleChangePageIndex = (_page = 1) => {
      setPageIndex(_page);
   };
   const handleChangePageSize = (_pageSize = 5) => {
      setPageSize(_pageSize);
   };

   const deleteUser = (id: string) => {
      try {
         const result = deleteMember[memberType](id);
         result.then((data: any) => {
            if (data.error) {
               toast.error(data?.error?.message || "Xóa thất bại");
               return;
            }
            //
            toast.success(data.message || "Đã xóa");
            handleSearch();
         });
      } catch (error) {
         toast.error("Xóa thất bại");
      }
   };

   const members = listUsers?.items?.map((item: any, id: number) => {
      return {
         index: id + 1,
         key: id,
         fullName: <p className="line-clamp-2">{item.fullName}</p>,
         userName: <p className="line-clamp-2">{item.userName}</p>,
         email: <p className="line-clamp-2">{item.email}</p>,
         accountBalance: (
            <p>
               {memberType
                  ? new Intl.NumberFormat("vi").format(item.money || 0)
                  : new Intl.NumberFormat("vi").format(item.moneySurplus || 0)}{" "}
            </p>
         ),
         status: (
            <p className="line-clamp-2">
               {item.deleted_at !== null ? (
                  <Tag color="red">Deleted</Tag>
               ) : item.isVerifyEmail ? (
                  <Tag color="blue">Activated</Tag>
               ) : (
                  <Tag color="orange">InActive</Tag>
               )}
            </p>
         ),
         createdDate:
            memberType === 0 ? (
               <p className="line-clamp-2">{item.createDate ? format(new Date(item.createDate), "dd-MM-yyyy") : "-"}</p>
            ) : (
               <p className="line-clamp-2">{item.created_at ? format(new Date(item.created_at), "dd-MM-yyyy") : "-"}</p>
            ),
         action: (
            <div className="flex gap-4">
               <Link
                  to={`/quan-ly-thanh-vien/${memberType === 0 ? "cong-dong-seo" : "admin-cong-dong-seo"}/${
                     item.userName
                  }`}
               >
                  <LuEdit2 size={24} className="text-sky-500" />
               </Link>

               <ConfirmModal
                  buttonIcon={<RiDeleteBin6Line size={24} className="text-gray-400" />}
                  title="Delete User!"
                  description={`Xóa tài khoản: ${item.fullName}?`}
                  handleSubmit={() => {
                     deleteUser(item._id);
                  }}
               ></ConfirmModal>

               {Boolean(memberType) && (
                  <TopUpModal
                     memberInfo={item}
                     type={0}
                     onSubmit={() => {
                        //
                        handleSearch();
                     }}
                  ></TopUpModal>
               )}
            </div>
         ),
      };
   });

   if (isLoading) return <SimpleSpiner isLoading={isLoading} />;

   return (
      <div className="p-4 rounded-lg border border-gray-300 bg-white">
         <div className="overflow-x-scroll bg-white">
            <Table columns={columns} dataSource={members} pagination={false} />
         </div>
         <PaginationCustom
            list={listUsers?.count || 0}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageSize={(_pageSize: number) => handleChangePageSize(_pageSize)}
            setPageIndex={(_page: number) => handleChangePageIndex(_page)}
         ></PaginationCustom>
      </div>
   );
}
export default MembersTable;
