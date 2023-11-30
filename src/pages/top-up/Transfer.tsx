import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import TransferConfirmModal from "./components/TransferConfirmModal";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { topUpAction } from "redux/top-up/top-up.slice";
import { userAction } from "redux/user/user.slice";

function Transfer() {
   const dispatch = useDispatch<any>();

   const [isLoading, setIsLoading] = useState(false);
   const userInfo = useSelector((state: any) => state.user.currentUser);

   const formik = useFormik({
      validateOnChange: true,
      validateOnBlur: true,
      enableReinitialize: true,
      validateOnMount: true,
      initialValues: {
         receiver: "",
         quantity: 1000,
         bodyTransfer: "",
      },
      validationSchema: Yup.object({
         receiver: Yup.string().required("* Required"),
         quantity: Yup.number()
            .required("* Required")
            .min(1000, "Tối thiểu 1.000 VND")
            .max(userInfo?.money, "Tài khoản của bạn không đủ"),
      }),
      onSubmit: async (values: any) => {
         setIsLoading(true);
         try {
            const result = dispatch(topUpAction.transfer(values));
            result.then((data: any) => {
               setIsLoading(false);
               if (data.error) {
                  toast.error(data?.error?.message || "Chuyển tiền thất bại");
                  return;
               }
               //
               toast.success(data.message || "Chuyển tiền thành công");
               dispatch(userAction.getProfile());
            });
         } catch (error) {
            toast.error("Chuyển tiền thất bại");
            setIsLoading(false);
         }
      },
   });

   return (
      <div className="py-4">
         <FullPageSpiner isLoading={isLoading} />
         <h5 className="text-primary-500 mb-4">Tính năng chuyển tiền cho các tài khoản khác trên hệ thống</h5>

         <form>
            <div className="mb-4">
               <label htmlFor="transfer-input-receiver" className="font-semibold text-primary-500">
                  Tài khoản người nhận{" "}
                  {formik.errors.receiver && (
                     <i className="text-sm font-normal text-red-500">{formik.errors.receiver.toString()}</i>
                  )}
               </label>

               <input
                  id="transfer-input-receiver"
                  type="text"
                  name="receiver"
                  onChange={formik.handleChange}
                  placeholder="Nhập username người nhận"
                  className="border border-gray-300 rounded-md w-full py-1.5 px-3 mt-2"
               ></input>
            </div>

            <div className="mb-4">
               <label htmlFor="transfer-input-quantity" className="font-semibold text-primary-500">
                  Số tiền cần chuyển{" "}
                  {formik.errors.quantity && (
                     <i className="text-sm font-normal text-red-500">{formik.errors.quantity.toString()}</i>
                  )}
               </label>

               <div className="w-full relative">
                  <InputNumber
                     className="w-full !py-1.5"
                     name="quantity"
                     value={formik.values.quantity}
                     formatter={(value) => `$ ${(value * 1).toString()}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                     parser={(value: any) => value.replace(/\$\s?|(,*)/g, "").replace(/\D+/g, "")}
                     onChange={(value) => {
                        formik.setFieldValue("quantity", value);
                     }}
                  />

                  <div className="absolute bg-white right-1.5 top-1.5 p-1">
                     <p className="text-gray-400">VND</p>
                  </div>
               </div>
            </div>

            <div className="mb-8">
               <label htmlFor="transfer-input-note" className="font-semibold text-primary-500">
                  Nội dung chuyển khoản
               </label>

               <input
                  id="transfer-input-note"
                  type="text"
                  name="bodyTransfer"
                  onChange={formik.handleChange}
                  placeholder="Nhập nội dung chuyển khoản"
                  className="border border-gray-300 rounded-md w-full py-1.5 px-3 mt-2"
               ></input>
            </div>

            <div className="">
               <TransferConfirmModal
                  handleSubmit={formik.handleSubmit}
                  title="Xác nhận chuyển khoản"
                  isActive={formik.errors.quantity || formik.errors.receiver ? false : true}
                  description={
                     <p>
                        Số tiền{" "}
                        <span className="font-semibold">
                           {new Intl.NumberFormat("vi").format(formik.values.quantity)} VND
                        </span>{" "}
                        sẽ được chuyển tới tài khoản <span className="font-semibold">{formik.values.receiver}</span>
                     </p>
                  }
               />
            </div>
         </form>
      </div>
   );
}

export default Transfer;
