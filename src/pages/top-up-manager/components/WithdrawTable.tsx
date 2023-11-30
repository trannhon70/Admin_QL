import { Table, Tag } from "antd";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdRemoveCircle } from "react-icons/md";

import PaginationCustom from "components/ui/pagination/PaginationCustom";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";
import { topUpAction } from "redux/top-up/top-up.slice";
import { WITHDRAW_STATUS } from "common/constant";
import ConfirmModal from "components/ui/modal/ConfirmModal";

type PropsType = {
   pageIndex: number;
   setPageIndex: Function;
   pageSize: number;
   setPageSize: Function;
   handleSearch: Function;
};
function WithdrawTable({ pageIndex, setPageIndex, pageSize, setPageSize, handleSearch }: PropsType) {
   const columns: any = [
      {
         title: "STT",
         dataIndex: "index",
         sortDirections: ["descend", "ascend"],
      },
      {
         title: "Người rút",
         dataIndex: "user",
      },
      {
         title: "Số tiền",
         dataIndex: "money",
      },
      {
         title: "Phương thức",
         dataIndex: "method",
      },
      {
         title: "STK",
         dataIndex: "STK",
      },
      {
         title: "Ngân hàng",
         dataIndex: "bank",
      },
      {
         title: "Số điện thoại",
         dataIndex: "phone",
      },
      {
         title: "Trạng thái",
         dataIndex: "status",
      },
      {
         title: "Hình thức",
         dataIndex: "form",
      },
      {
         title: "Thời gian",
         dataIndex: "createdAt",
         width: "120px",
      },
      {
         title: "Hoạt động",
         dataIndex: "action",
      },
   ];
   const dispatch = useDispatch<any>();

   const isLoading = useSelector((state: any) => state.topUp.isLoading);

   const handleChangePageIndex = (_page = 1) => {
      setPageIndex(_page);
   };
   const handleChangePageSize = (_pageSize = 5) => {
      setPageSize(_pageSize);
   };

   const handleUpdate = ({ id, status }: { id: string; status: string }) => {
      try {
         const result = dispatch(topUpAction.updateWithdrawStatus({ id, status }));
         result.then((data: any) => {
            if (data.error) {
               toast.error(data?.error?.message || "Cập nhật thất bại");
               return;
            }
            //
            toast.success(data.message || "Cập nhật thành công");
            handleSearch();
         });
      } catch (error) {
         toast.error("Cập nhật thất bại");
      }
   };

   const cardTopUp = useSelector((state: any) => state.topUp.withdraw) || [];

   const items = cardTopUp?.items?.map((item: any, id: number) => {
      return {
         index: id + 1,
         key: id,
         user: <p className="line-clamp-2">{item?.userId?.userName}</p>,
         money: <p className="line-clamp-2">{new Intl.NumberFormat("vi").format(item.money || 0)} VND</p>,
         method: <p className="line-clamp-2">{item.method}</p>,
         STK: <p className="line-clamp-2">{item.STK || ""}</p>,
         bank: <p className="line-clamp-2">{item.bank}</p>,
         phone: <p className="line-clamp-2">{item.phone}</p>,
         status: (
            <p className="line-clamp-2">
               {item.status === "pending" ? (
                  <Tag color="orange">Pending</Tag>
               ) : item.status === "success" ? (
                  <Tag color="green">Success</Tag>
               ) : (
                  <Tag color="red">Cancelled</Tag>
               )}
            </p>
         ),
         form: <p className="line-clamp-2">{item?.form}</p>,
         createdAt: (
            <p className="line-clamp-2">{item.createdAt ? format(new Date(item.createdAt), "dd-MM-yyyy") : "-"}</p>
         ),
         action:
            item.status === WITHDRAW_STATUS.PENDING ? (
               <div className="flex justify-center gap-2 w-full">
                  <ConfirmModal
                     title={`Xác nhận rút tiền`}
                     buttonIcon={<AiFillCheckCircle size={24} className="text-green-400" />}
                     handleSubmit={() => {
                        handleUpdate({ id: item._id, status: WITHDRAW_STATUS.SUCCESS });
                        handleSearch();
                     }}
                  />
                  <ConfirmModal
                     title={`Xác nhận hủy yêu cầu`}
                     buttonIcon={<MdRemoveCircle size={24} className="text-red-400" />}
                     handleSubmit={() => {
                        handleUpdate({ id: item._id, status: WITHDRAW_STATUS.REJECT });
                        handleSearch();
                     }}
                  />
               </div>
            ) : (
               <div className="flex justify-center">-- --</div>
            ),
      };
   });

   if (isLoading) return <SimpleSpiner isLoading={isLoading} />;

   return (
      <div className="p-4 rounded-lg border border-gray-300 bg-white">
         <div className="overflow-x-scroll bg-white">
            <Table columns={columns} dataSource={items} pagination={false} />
         </div>
         <PaginationCustom
            list={cardTopUp?.count || 0}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageSize={(_pageSize: number) => handleChangePageSize(_pageSize)}
            setPageIndex={(_page: number) => handleChangePageIndex(_page)}
         ></PaginationCustom>
      </div>
   );
}
export default WithdrawTable;
