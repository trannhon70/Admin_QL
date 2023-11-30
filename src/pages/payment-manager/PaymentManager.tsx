import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { Breadcrumb, Select } from "antd";
import { useDispatch } from "react-redux";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import { sectorAction } from "redux/sector/sector.slice";
import PaymentEditModal from "./components/PaymentEditModal";
import TransferTopUpTable from "./components/PaymentManagerTable";
import PaymentManagerTable from "./components/PaymentManagerTable";
import { paymentManagerAction } from "redux/payment-manager/payment-manager.slice";
import { topUpAction } from "redux/top-up/top-up.slice";
import { LOCAL_STORAGE } from "helper/storage.helper";

function PaymentManager() {
   const dispatch = useDispatch<any>();

   const [pageIndex, setPageIndex] = useState(1);
   const [pageSize, setPageSize] = useState(5);
   const [search, setSearch] = useState("");
   const [userInfo, setUserInfo] = useState<any>();
   const [statusFilter, setStatusFilter] = useState([]);

   const status = [
      {
         value: 1,
         label: "chưa thanh toán",
      },
      {
         value: 2,
         label: "Đã thanh toán, chưa cộng credit",
      },
      {
         value: 3,
         label: "Đã thanh toán, đã cộng credit",
      },
   ]

   const handleSearch = () => {
      dispatch(
         paymentManagerAction.getListPayments({
            page: pageIndex,
            limit: pageSize,
            search,
            status: statusFilter
         })
      );
   };
   const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         handleSearch();
      }
   };

   useEffect(() => {
      dispatch(paymentManagerAction.getListPayments({ page: pageIndex, limit: pageSize }));
   }, [pageIndex, pageSize]);

   useEffect(() => {
      dispatch(topUpAction.getListBank());
   }, []);

   useEffect(() => {
      const result = LOCAL_STORAGE.getCurrentUser();
      setUserInfo(result);
   }, []);

   return (
      <div className="p-4">
         <div className="mb-4">
            <Breadcrumb items={[{ title: "Quản lý thanh toán congdongseo" }, { title: "Thanh toán chuyển khoản" }]}></Breadcrumb>
         </div>
         <div className="mb-4">
            <h3 className="font-semibold mb-4">Danh sách khách hàng</h3>

            <div className="lg:flex md:flex inline-block gap-2 mb-3 lg:w-1/2 md:w-[90%]">
               <div className="flex lg:w-[50%] md:w-[50%] w-[278px] lg:h-auto md:h-auto h-9 lg:mb-0 md:mb-0 mb-2 rounded-md border border-gray-300 bg-white items-center">
                  <input
                     className="bg-white pl-3 w-full"
                     value={search}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                     onKeyDown={handleEnter}
                  ></input>
                  <GoSearch size={20} className="mx-3" />
               </div>
               <div className="lg:flex md:flex inline-block lg:w-full md:w-full">
                  <div className="lg:w-[350px] md:w-[350px] w-[278px] lg:h-[36px] lg:mb-0 md:mb-0 mb-2">
                     <Select
                        id="select-status"
                        mode="multiple"
                        allowClear
                        placeholder="Trạng thái"
                        className="sm:w-1/3 lg:w-[97%] md:w-[97%] w-full select-payment-credit"
                        options={status}
                        onChange={(values) => {
                           setStatusFilter(values);
                        }}
                        maxTagCount = {1}
                     />
                  </div>
                  <div>
                     <PrimaryButton className="!py-1.5" content="Tìm kiếm" onClick={handleSearch}></PrimaryButton>
                  </div>
               </div>
            </div>

            <PaymentManagerTable
               pageIndex={pageIndex}
               setPageIndex={setPageIndex}
               pageSize={pageSize}
               setPageSize={setPageSize}
               handleSearch = {handleSearch}
               userInfo = {userInfo}
            />
         </div>
      </div>
   );
}
export default PaymentManager;
