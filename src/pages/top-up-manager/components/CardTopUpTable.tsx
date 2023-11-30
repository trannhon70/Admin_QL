import { Table, Tag } from "antd";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdRemoveCircle } from "react-icons/md";

import PaginationCustom from "components/ui/pagination/PaginationCustom";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";
import { topUpAction } from "redux/top-up/top-up.slice";
import { CARD_TOP_UP_STATUS } from "common/constant";
import ConfirmModal from "components/ui/modal/ConfirmModal";

type PropsType = {
   pageIndex: number;
   setPageIndex: Function;
   pageSize: number;
   setPageSize: Function;
   handleSearch: Function;
};
function CardTopUpTable({ pageIndex, setPageIndex, pageSize, setPageSize, handleSearch }: PropsType) {
   const columns: any = [
      {
         title: "STT",
         dataIndex: "index",
         sortDirections: ["descend", "ascend"],
      },
      {
         title: "Người nạp",
         dataIndex: "createdBy",
      },
      {
         title: "Nhà mạng",
         dataIndex: "networkOperator",
      },
      {
         title: "Giá trị thẻ nạp",
         dataIndex: "cardPrice",
      },
      {
         title: "Số seri",
         dataIndex: "seri",
      },
      {
         title: "Mã thẻ",
         dataIndex: "code",
      },
      {
         title: "Trạng thái",
         dataIndex: "status",
      },
      {
         title: "Tỉ giá",
         dataIndex: "exchangeRate",
      },
      {
         title: "Người xác nhận",
         dataIndex: "approvedBy",
      },
      {
         title: "Thời gian nạp",
         dataIndex: "created_at",
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
         const result = dispatch(topUpAction.updateCardTopUp({ id, status }));
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

   const cardTopUp = useSelector((state: any) => state.topUp.cardTopUp) || {};

   const items = cardTopUp?.items?.map((item: any, id: number) => {
      return {
         index: id + 1,
         key: id,
         createdBy: <p className="line-clamp-2">{item?.createdBy?.userName}</p>,
         networkOperator: <p className="line-clamp-2">{item.networkOperator}</p>,
         cardPrice: <p className="line-clamp-2">{new Intl.NumberFormat("vi").format(item.cardPrice || 0)} VND</p>,
         seri: <p className="line-clamp-2">{item.seri}</p>,
         code: <p className="line-clamp-2">{item.code}</p>,
         status: (
            <p className="line-clamp-2">
               {item.status === "pending" ? (
                  <Tag color="orange">Pending</Tag>
               ) : item.status === "approved" ? (
                  <Tag color="blue">Approved</Tag>
               ) : (
                  <Tag color="red">Cancelled</Tag>
               )}
            </p>
         ),
         approvedBy: <p className="line-clamp-2">{item?.approvedBy?.userName}</p>,
         exchangeRate: <p className="line-clamp-2">{(item.exchangeRate || 1) * 100}%</p>,
         created_at: (
            <p className="line-clamp-2">{item.created_at ? format(new Date(item.created_at), "dd-MM-yyyy") : "-"}</p>
         ),
         action:
            item.status === CARD_TOP_UP_STATUS.PENDING ? (
               <div className="flex justify-center gap-2 w-full">
                  <ConfirmModal
                     title={`Xác nhận nạp cho tài khoản ${item?.createdBy?.userName}`}
                     buttonIcon={<AiFillCheckCircle size={24} className="text-green-400" />}
                     handleSubmit={() => {
                        handleUpdate({ id: item._id, status: CARD_TOP_UP_STATUS.APPROVED });
                        handleSearch();
                     }}
                  />
                  <ConfirmModal
                     title={`Xác nhận hủy yêu cầu ${item?.createdBy?.userName}`}
                     buttonIcon={<MdRemoveCircle size={24} className="text-red-400" />}
                     handleSubmit={() => {
                        handleUpdate({ id: item._id, status: CARD_TOP_UP_STATUS.CANCELLED });
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
export default CardTopUpTable;
