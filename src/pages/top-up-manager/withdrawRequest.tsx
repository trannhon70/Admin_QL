import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { Breadcrumb } from "antd";
import { useDispatch } from "react-redux";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import { topUpAction } from "redux/top-up/top-up.slice";
import WithdrawTable from "./components/WithdrawTable";

function WithdrawRequest() {
   const dispatch = useDispatch<any>();

   const [pageIndex, setPageIndex] = useState(1);
   const [pageSize, setPageSize] = useState(5);
   const [search, setSearch] = useState("");

   const handleSearch = () => {
      dispatch(
         topUpAction.getListWithdraw({
            page: pageIndex,
            limit: pageSize,
            search,
         })
      );
   };
   const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         handleSearch();
      }
   };

   useEffect(() => {
      dispatch(topUpAction.getListWithdraw({ page: pageIndex, limit: pageSize }));
   }, [pageIndex, pageSize]);

   return (
      <div className="p-4">
         <div className="mb-4">
            <Breadcrumb items={[{ title: "Quản lý nạp tiền" }, { title: "Yêu cầu rút tiền" }]}></Breadcrumb>
         </div>
         <div className="mb-4">
            <h3 className="font-semibold mb-4">Yêu cầu rút tiền</h3>

            <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2 mb-3">
               <div className="flex sm:flex-nowrap gap-2 sm:w-96 w-full">
                  <div className="flex w-full rounded-md border border-gray-300 bg-white items-center py-1.5">
                     <input
                        className="bg-white pl-3 w-full"
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        onKeyDown={handleEnter}
                     ></input>
                     <GoSearch size={20} className="mx-3" />
                  </div>
                  <PrimaryButton className="!py-1.5 px-5" content="Tìm kiếm" onClick={handleSearch}></PrimaryButton>
               </div>
            </div>
         </div>
         <WithdrawTable
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
            handleSearch={handleSearch}
         />
      </div>
   );
}
export default WithdrawRequest;
