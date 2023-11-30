import { Table, Tag } from "antd";
import { format } from "date-fns";
import { useSelector } from "react-redux";

import PaginationCustom from "components/ui/pagination/PaginationCustom";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";

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
         title: "Thời gian nạp",
         dataIndex: "created_at",
      },
   ];

   const isLoading = useSelector((state: any) => state.topUp.isLoading);

   const handleChangePageIndex = (_page = 1) => {
      setPageIndex(_page);
   };
   const handleChangePageSize = (_pageSize = 5) => {
      setPageSize(_pageSize);
   };

   const cardTopUp = useSelector((state: any) => state.topUp.cardTopUp) || [];

   const items = cardTopUp?.items?.map((item: any, id: number) => {
      return {
         index: id + 1,
         key: id,
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
         exchangeRate: <p className="line-clamp-2">{(item.exchangeRate || 1) * 100}%</p>,
         created_at: (
            <p className="line-clamp-2">{item.created_at ? format(new Date(item.created_at), "dd-MM-yyyy") : "-"}</p>
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
