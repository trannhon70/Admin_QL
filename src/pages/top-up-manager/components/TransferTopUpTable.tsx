import { Table } from "antd";
import { format } from "date-fns";
import { useSelector } from "react-redux";

import PaginationCustom from "components/ui/pagination/PaginationCustom";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";

type PropsType = {
   pageIndex: number;
   setPageIndex: Function;
   pageSize: number;
   setPageSize: Function;
};
function TransferTopUpTable({ pageIndex, setPageIndex, pageSize, setPageSize }: PropsType) {
   const columns: any = [
      {
         title: "STT",
         dataIndex: "index",
         sortDirections: ["descend", "ascend"],
      },
      {
         title: "Người nạp",
         dataIndex: "receiver",
      },
      {
         title: "Số TK",
         dataIndex: "accountNumber",
      },
      {
         title: "Ngân hàng",
         dataIndex: "bank",
      },
      {
         title: "Số tiền",
         dataIndex: "quantity",
         width: "150px",
      },
      {
         title: "Nội dung chuyển khoản",
         dataIndex: "bodyTransfer",
      },
      {
         title: "Thời gian",
         dataIndex: "transferDate",
      },
      {
         title: "Người xác nhận",
         dataIndex: "createdBy",
      },
   ];
   const isLoading = useSelector((state: any) => state.topUp.isLoading);

   const handleChangePageIndex = (_page = 1) => {
      setPageIndex(_page);
   };
   const handleChangePageSize = (_pageSize = 5) => {
      setPageSize(_pageSize);
   };

   const transferTopUp = useSelector((state: any) => state.topUp.transferTopUp) || [];

   const items = transferTopUp?.items?.map((item: any, id: number) => {
      return {
         index: id + 1,
         key: id,
         receiver: <p className="line-clamp-2">{item?.receiver?.userName}</p>,
         accountNumber: <p className="line-clamp-2">{item.accountNumber}</p>,
         bank: <p className="line-clamp-1">{item.bank}</p>,
         quantity: <p className="line-clamp-2">{new Intl.NumberFormat("vi").format(item.quantity || 0)} VND</p>,
         bodyTransfer: <p className="line-clamp-2">{item.bodyTransfer}</p>,
         transferDate: (
            <p className="line-clamp-2">
               {item.transferDate ? format(new Date(item.transferDate), "dd-MM-yyyy hh:mm") : "-"}
            </p>
         ),
         createdBy: <p className="line-clamp-2">{item?.createdBy?.userName}</p>,
      };
   });

   if (isLoading) return <SimpleSpiner isLoading={isLoading} />;

   return (
      <div className="p-4 rounded-lg border border-gray-300 bg-white">
         <div className="overflow-x-scroll bg-white">
            <Table columns={columns} dataSource={items} pagination={false} />
         </div>
         <PaginationCustom
            list={transferTopUp?.count || 0}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageSize={(_pageSize: number) => handleChangePageSize(_pageSize)}
            setPageIndex={(_page: number) => handleChangePageIndex(_page)}
         ></PaginationCustom>
      </div>
   );
}
export default TransferTopUpTable;
