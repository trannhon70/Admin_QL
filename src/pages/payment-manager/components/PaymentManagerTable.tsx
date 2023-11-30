import { Popover, Table } from "antd";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { BsCheck2All } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { LuEdit2 } from "react-icons/lu";

import PaginationCustom from "components/ui/pagination/PaginationCustom";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";
import ConfirmModal from "components/ui/modal/ConfirmModal";
import PaymentEditModal from "./PaymentEditModal";
import PaymentViewModal from "./PaymentViewModal";
import { paymentManagerAction } from "redux/payment-manager/payment-manager.slice";

type PropsType = {
   pageIndex: number;
   setPageIndex: Function;
   pageSize: number;
   setPageSize: Function;
   handleSearch: any,
   userInfo?: any
};
function PaymentManagerTable({ pageIndex, setPageIndex, pageSize, setPageSize, handleSearch, userInfo }: PropsType) {
   const columns: any = [
      {
         title: "STT",
         dataIndex: "index",
         sortDirections: ["descend", "ascend"],
         width: 60,
         align: "center"
      },
      {
         title: "Người nạp",
         dataIndex: "userBuy",
         width: 150,
         align: "center",
         ellipsis: true,

      },
      {
         title: "Số TK",
         dataIndex: "accountBank",
         width: 100,
         align: "center",
         ellipsis: true,
      },
      {
         title: "Ngân hàng",
         dataIndex: "bank",
         width: 100,
         align: "center",
         ellipsis: true,
      },
      {
         title: "Số tiền (VNĐ)",
         dataIndex: "paymentNeed",
         width: "150px",
         align: "center"
      },
      {
         title: "Credit muốn mua",
         dataIndex: "creditWanted",
         width: "100px",
         align: "center"
      },
      {
         title: "Trạng thái",
         dataIndex: "status",
         width: "250px",
         align: "center",
         render: (value:any) => {
            if (value === "chưa thanh toán") {
              return (
                <div className="text-center">
                  <span className="bg-red-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                    {value}
                  </span>
                </div>
              );
            }
            if (value === "Đã thanh toán, chưa cộng credit") {
              return (
                <div className="text-center">
                  <span className="bg-orange-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                    {value}
                  </span>
                </div>
              );
            }
            if (value === "Đã thanh toán, đã cộng credit") {
               return (
                 <div className="text-center">
                   <span className="bg-green-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                     {value}
                   </span>
                 </div>
               );
             }
        }
      },
      {
         title: "Nội dung chuyển khoản",
         dataIndex: "paymentContent",
         ellipsis: true,
         width: 150,
         align: "center"
      },
      {
         title: "Ngày thanh toán",
         dataIndex: "paymentDate",
         width: 120,
         align: "center"
      },
      {
         title: "Người xác nhận",
         dataIndex: "userApprove",
         width: 120,
         align: "center"
      },
      {
         title: "Hoạt động",
         dataIndex: "action",
         width: 120,
         align: "center"
     },
   ];
   const isLoading = useSelector((state: any) => state.topUp.isLoading);
   const dispatch = useDispatch<any>();

   const handleChangePageIndex = (_page = 1) => {
      setPageIndex(_page);
   };
   const handleChangePageSize = (_pageSize = 5) => {
      setPageSize(_pageSize);
   };

   const paymentList = useSelector((state: any) => state.paymentManager.listPayment) || [];
   const count = useSelector((state: any) => state.paymentManager.count) || 0;

   const items = paymentList?.map((item: any, id: number) => {
      const paymentStatus: any = {
         1: "chưa thanh toán",
         2: "Đã thanh toán, chưa cộng credit",
         3: "Đã thanh toán, đã cộng credit"
     };
      return {
         index: id + 1,
         key: id,
         userBuy: <p className="line-clamp-2">{item?.userIdBuy?.userName}</p>,
         accountBank: <p className="line-clamp-2">{item.accountBank}</p>,
         bank: <p className="line-clamp-1">{item.bank}</p>,
         paymentNeed: <p className="line-clamp-2">{new Intl.NumberFormat("vi").format(item.paymentNeed || 0)}</p>,
         creditWanted : item?.creditWanted,
         status: paymentStatus[item?.status],
         paymentContent: <p className="line-clamp-2">{item.paymentContent}</p>,
         paymentDate: (
            <p className="line-clamp-2">
               {item.paymentDate ? format(new Date(item.paymentDate), "dd-MM-yyyy hh:mm") : "-"}
            </p>
         ),
         userApprove: <p className="line-clamp-2">{item?.userApprove?.userName}</p>,
         action: (
            <div className="flex">
                  <PaymentViewModal info = {item} userInfo = {userInfo}/>
                  <PaymentEditModal info = {item} handleSearch = {handleSearch} userInfo = {userInfo}/>
               {
                  item?.status === 1 ?
                  <Popover content="không thể chuyển credit do chưa thanh toán">
                      <BsCheck2All className="text-[26px] text-red-500 opacity-50 cursor-no-drop"/>
                  </Popover>:
                  (
                     item?.status === 2 ?
                     <Popover content="chuyển credit cho user">
                        <div>
                           <ConfirmModal
                           buttonStyle=""
                           buttonIcon={<BsCheck2All size={26} className="text-[#f97316] cursor-pointer" />}
                           title={`Bạn muốn chuyển credit cho ${item?.userIdBuy?.userName}!`}
                           description={`Khi chuyển sẽ không thể hoàn lại`}
                           handleSubmit={async () => {
                              await dispatch(
                                    paymentManagerAction.updateOne({
                                       paymentId: item?._id,
                                       userWantBuy: item?.userIdBuy?._id,
                                       status: 3,
                                       credit: item?.creditWanted
                                    })
                                 );
                              handleSearch();
                           }}
                           ></ConfirmModal>
                        </div>
                     </Popover> :
                     <Popover content="đã hoàn thành">
                        <BsCheck2All className="text-[26px] text-green-500 opacity-50 cursor-no-drop"/>
                     </Popover>
                  )
               }
            </div>
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
            list={count || 0}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageSize={(_pageSize: number) => handleChangePageSize(_pageSize)}
            setPageIndex={(_page: number) => handleChangePageIndex(_page)}
         ></PaginationCustom>
      </div>
   );
}
export default PaymentManagerTable;
