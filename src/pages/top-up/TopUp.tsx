import { FaWallet } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdOutlineInput } from "react-icons/md";
import { Tabs } from "antd";

import LoadByTransfer from "./LoadByTransfer";
import LoadByCard from "./LoadByCard";
import TopUpHistory from "./TopUpHistory";
import Transfer from "./Transfer";

function TopUp() {
   const userInfo = useSelector((state: any) => state.user.currentUser);

   const items: any = [
      {
         label: <h5>Nạp bằng chuyển khoản</h5>,
         key: 0,
         children: <LoadByTransfer />,
      },
      {
         label: <h5>Nạp bằng thẻ cào</h5>,
         key: 1,
         children: <LoadByCard />,
      },
      {
         label: <h5>Chuyển tiền</h5>,
         key: 2,
         children: <Transfer />,
      },
      {
         label: <h5>Lịch sử giao dịch</h5>,
         key: 3,
         children: <TopUpHistory />,
      },
   ];

   return (
      <div className="grid grid-cols-12 gap-2 p-4">
         <div className="col-span-12 lg:col-span-8 order-2 lg:order-1 border border-gray-300 bg-white shadow-sm shadow-primary-300 rounded-lg p-6">
            <Tabs
               defaultActiveKey="1"
               className="!h-full"
               tabPosition={"top"}
               style={{
                  height: 220,
               }}
               items={items}
            />
         </div>
         <div className="col-span-12 lg:col-span-4 order-1">
            <div className="border border-amber-200 bg-amber-200 rounded-lg shadow-sm shadow-primary-500 p-4">
               <h5 className="flex flex-wrap justify-between items-center text-gray-700 font-semibold">
                  <span className="flex items-center gap-x-2">
                     <FaWallet size={20} />
                     Số dư:{" "}
                  </span>
                  <span>{new Intl.NumberFormat("vi").format(userInfo?.money || 0)} VND</span>
               </h5>
               <h5 className="flex flex-wrap justify-between items-center text-gray-700 font-semibold mb-3">
                  <span className="flex items-center gap-x-2">
                     <MdOutlineInput size={20} />
                     Số tiền đã nạp:{" "}
                  </span>
                  <span>{new Intl.NumberFormat("vi").format(userInfo?.depositAmount || 0)} VND</span>
               </h5>

               <div>
                  <h5 className="text-primary-400 mb-2">Chú ý: </h5>
                  <p className="text-primary-400 mb-2">
                     {" "}
                     - Nạp sai cú pháp hoặc sai số tài khoản sẽ bị trừ 10% phí giao dịch, tối đa trừ 50.000 mCoin. Ví dụ
                     nạp sai 100.000 trừ 10.000, 200.000 trừ 20.000, 500.000 trừ 50.000, 1 triệu trừ 50.000, 10 triệu
                     trừ 50.000...
                  </p>

                  <p className="text-primary-400 mb-2">
                     {" "}
                     - Nạp thấp nhất 50.000đ. Nếu thấp hơn sẽ không hoàn lại tiền.
                  </p>
                  <p className="text-primary-400 mb-2">
                     {" "}
                     - Chuyển khoản đúng cú pháp để nạp tiền tự động nhanh nhất sau vài phút. Nếu sau 30 phút chưa thấy
                     tiền vào thì liên hệ admin hỗ trợ nhé
                  </p>
                  <p className="text-primary-400 mb-2"> - Liên hệ: </p>
               </div>
            </div>
         </div>
      </div>
   );
}
export default TopUp;
