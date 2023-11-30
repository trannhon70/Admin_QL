import { Select } from "antd";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import TransferTopUpTable from "./components/TransferTopUpTable";
import CardTopUpTable from "./components/CardTopUpTable";
import TransferTable from "./components/TransferTable";
import { useDispatch } from "react-redux";
import { topUpAction } from "redux/top-up/top-up.slice";

function TopUpHistory() {
   const [search, setSearch] = useState("");
   const [pageIndex, setPageIndex] = useState(1);
   const [pageSize, setPageSize] = useState(5);
   const dispatch = useDispatch<any>();

   const getContent: any = {
      0: (
         <TransferTopUpTable
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
         />
      ),
      1: (
         <CardTopUpTable
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
            handleSearch={() => {}}
         />
      ),
      2: (
         <TransferTable
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
            handleSearch={() => {}}
         />
      ),
   };

   const [currentTable, setCurrentTable] = useState<any>(0);

   const searchData: any = {
      0: () =>
         dispatch(
            topUpAction.getUserTransferTopUp({
               search,
               page: pageIndex,
               limit: pageSize,
            })
         ),
      1: () =>
         dispatch(
            topUpAction.getUserCardTopUpV2({
               search,
               page: pageIndex,
               limit: pageSize,
            })
         ),
      2: () =>
         dispatch(
            topUpAction.getUserTransfer({
               search,
               page: pageIndex,
               limit: pageSize,
            })
         ),
   };

   const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         searchData[currentTable]();
      }
   };

   useEffect(() => {
      searchData[currentTable]();
   }, [pageIndex, pageSize, currentTable]);

   return (
      <div className="py-4">
         <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2 mb-3">
            <div className="flex sm:basis-2/3 sm:flex-nowrap flex-wrap gap-2 w-full">
               <div className="flex w-full rounded-md border border-gray-300 bg-white items-center py-1.5">
                  <input
                     className="bg-white pl-3 w-full"
                     value={search}
                     onKeyDown={handleEnter}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                  ></input>
                  <GoSearch size={20} className="mx-3" />
               </div>
               <Select
                  id="select-status"
                  allowClear
                  defaultValue={0}
                  placeholder="Loại giao dịch"
                  className="w-full [&>div]:!h-10 [&>div]:!py-1"
                  options={[
                     {
                        value: 0,
                        label: "Nạp bằng chuyển khoản",
                     },
                     {
                        value: 1,
                        label: "Nạp bằng thẻ cào",
                     },
                     {
                        value: 2,
                        label: "Chuyển tiền trong hệ thống",
                     },
                  ]}
                  onChange={(value) => {
                     setCurrentTable(value);
                  }}
               />
            </div>

            <div className="w-full sm:w-max">
               <PrimaryButton
                  className="w-full sm:w-max !py-1.5 px-5"
                  content="Tìm kiếm"
                  onClick={() => searchData[currentTable]()}
               ></PrimaryButton>
            </div>
         </div>
         {getContent[currentTable]}
      </div>
   );
}

export default TopUpHistory;
