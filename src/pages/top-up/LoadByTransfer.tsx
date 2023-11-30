import SecondaryButton from "components/ui/button/SecondaryButton";
import { useState } from "react";
import { AiFillCheckCircle, AiOutlineCopy } from "react-icons/ai";
import { useSelector } from "react-redux";

function LoadByTransfer() {
   const userInfo = useSelector((state: any) => state.user.currentUser);
   const bodyTransfer = `naptien ${userInfo?.userName}`;
   const [isClicked, setIsClicked] = useState(false);

   const BANK_INFOS = [
      {
         "Ngân hàng": "VIETCOMBANK",
         "Chủ TK": "NGUYỄN HUỲNH NHƯ Ý",
         STK: "9156999999",
         "Chi nhánh": "TP. HỒ CHÍ MINH",
      },
      {
         "Ngân hàng": "MOMO",
         "Chủ TK": "NGUYỄN HUỲNH NHƯ Ý",
         STK: "0792.195.159",
      },
   ];

   return (
      <div className="py-4">
         <h5 className="text-primary-500">Tỷ giá: 1 VND = 1 VNĐ</h5>
         <br></br>
         <p className="text-primary-500">
            Bạn vui lòng chuyển khoản chính xác nội dung chuyển khoản bên dưới hệ thống sẽ tự động cộng tiền cho bạn sau
            1 phút sau khi nhận được tiền. Nếu chuyển khác ngân hàng sẽ mất thời gian lâu hơn, tùy thời gian xử lý của
            mỗi ngân hàng Nếu sau 10 phút từ khi tiền trong tài khoản của bạn bị trừ mà bạn vẫn chưa được cộng tiền vui
            lòng nhấn vào đây để liên hệ hỗ trợ.
         </p>
         <br></br>

         {BANK_INFOS.map((item: any, index: number) => (
            <div className="grid grid-cols-12 mb-4" key={index}>
               <label className="col-span-12 sm:col-span-3 text-base">Tài khoản {index + 1}:</label>
               <div className="col-span-12 sm:col-span-9 bg-sky-200 rounded-lg shadow-sm shadow-gray-500 w-full p-4">
                  <table className="w-full">
                     <tbody>
                        {Object.entries(item).map((subItem: any, id: number) => (
                           <tr key={id}>
                              <td>{subItem[0]}:</td>
                              <td className="font-semibold text-primary-500">{subItem[1]}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         ))}

         <div className="grid grid-cols-12">
            <label className="col-span-12 sm:col-span-3 text-base">Nội dung chuyển khoản:</label>
            <div className="col-span-12 sm:col-span-9 flex justify-between items-center bg-amber-200 rounded-lg shadow-sm shadow-gray-500 w-full p-4">
               <h4 className="font-semibold text-gray-700">{bodyTransfer}</h4>
               <SecondaryButton
                  background="bg-white hover:bg-gray-100"
                  content={isClicked ? "Copied!" : "Copy"}
                  icon={
                     isClicked ? (
                        <AiFillCheckCircle className="text-green-400 me-2" />
                     ) : (
                        <AiOutlineCopy className="me-2" />
                     )
                  }
                  onClick={() => {
                     if (!isClicked) {
                        setIsClicked(true);
                        const clipboardInterval = setInterval(() => {
                           setIsClicked(false);
                           clearInterval(clipboardInterval);
                        }, 3000);
                     }

                     navigator.clipboard.writeText(bodyTransfer);
                  }}
               />
            </div>
         </div>
      </div>
   );
}
export default LoadByTransfer;
