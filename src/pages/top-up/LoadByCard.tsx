import { Select } from "antd";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { topUpAction } from "redux/top-up/top-up.slice";
import * as Yup from "yup";

function LoadByCard() {
   const CardPriceOptions = [
      {
         label: "10.000 VND",
         value: 10000,
      },
      {
         label: "20.000 VND",
         value: 20000,
      },
      {
         label: "50.000 VND",
         value: 50000,
      },
      {
         label: "100.000 VND",
         value: 100000,
      },
      {
         label: "200.000 VND",
         value: 200000,
      },
   ];
   const NetwordOperators = [
      {
         label: "Viettel",
         value: "Viettel",
      },
      {
         label: "Mobifone",
         value: "Mobifone",
      },
      {
         label: "Vinaphone",
         value: "Vinaphone",
      },
   ];

   const dispatch = useDispatch<any>();
   const [isLoading, setIsLoading] = useState(false);

   const formik = useFormik({
      validateOnChange: true,
      validateOnBlur: true,
      enableReinitialize: true,
      validateOnMount: false,
      initialValues: {
         networkOperator: "Viettel",
         cardPrice: 10000,
         seri: "",
         code: "",
         acceptRule: false,
      },
      validationSchema: Yup.object({
         networkOperator: Yup.string().required("* Required"),
         cardPrice: Yup.number().required("* Required"),
         seri: Yup.string().required("* Required"),
         code: Yup.string().required("* Required"),
         acceptRule: Yup.bool().oneOf([true], "* Required"),
      }),
      onSubmit: async (values: any) => {
         setIsLoading(true);

         try {
            const result = dispatch(topUpAction.createCardTopUp(values));
            result.then((data: any) => {
               setIsLoading(false);
               if (data.error) {
                  toast.error(data?.error?.message || "Nạp thất bại");
                  return;
               }
               //
               toast.success(data.message || "Nạp thành công");
            });
         } catch (error) {
            toast.error("Nạp thất bại");
            setIsLoading(false);
         }
      },
   });

   return (
      <div className="py-4">
         <FullPageSpiner isLoading={isLoading} />
         <div className="mb-4">
            <h5 className="text-primary-500 mb-2">Tỷ giá: Nạp thẻ 100,000 VND = 60,000 VNĐ</h5>{" "}
            <p className="font-semibold text-red-500 mb-2">
               - Nạp sai mệnh giá hoặc sai loại thẻ cào sẽ mất toàn bộ số tiền đã nạp.
            </p>
            <p className="text-primary-500 mb-2">
               - Khi nạp thẻ cào, bạn sẽ phải trả phí 40% giá trị của thẻ để chi trả cho phí dịch vụ của nhà mạng.
            </p>
            <p className="text-primary-500">
               - Bạn nạp thẻ 100,000 sẽ mất 40,000 phí dịch vụ và thực nhận của tài khoản bạn là 60,000 tương ứng với
               60,000 VNĐ
            </p>
         </div>
         <hr></hr>
         <form onSubmit={formik.handleSubmit} className="pt-4">
            <div className="mb-4">
               <label htmlFor="select-card-type" className="font-semibold text-primary-500">
                  Chọn nhà mạng{" "}
                  {formik.errors.networkOperator && formik.touched.networkOperator && (
                     <i className="text-sm font-normal text-red-500">{formik.errors.networkOperator.toString()}</i>
                  )}
               </label>
               <Select
                  id="select-card-type"
                  allowClear
                  value={formik.values.networkOperator}
                  className="w-full mt-2"
                  options={NetwordOperators}
                  onChange={(value) => {
                     formik.setFieldValue("networkOperator", value);
                  }}
               />
            </div>

            <div className="mb-4">
               <label htmlFor="select-card-type" className="font-semibold text-primary-500">
                  Chọn mệnh giá{" "}
                  {formik.errors.cardPrice && formik.touched.cardPrice && (
                     <i className="text-sm font-normal text-red-500">{formik.errors.cardPrice.toString()}</i>
                  )}
               </label>
               <Select
                  id="select-card-type"
                  allowClear
                  value={formik.values.cardPrice}
                  className="w-full mt-2"
                  options={CardPriceOptions}
                  onChange={(value) => {
                     formik.setFieldValue("cardPrice", value);
                  }}
               />
            </div>

            <div className="mb-4">
               <label htmlFor="seri-input" className="font-semibold text-primary-500">
                  Nhập số seri{" "}
                  {formik.errors.seri && formik.touched.seri && (
                     <i className="text-sm font-normal text-red-500">{formik.errors.seri.toString()}</i>
                  )}
               </label>

               <input
                  id="seri-input"
                  type="text"
                  name="seri"
                  onChange={formik.handleChange}
                  className="border border-gray-300 rounded-md w-full py-1.5 px-3 mt-2"
               ></input>
            </div>

            <div className="mb-4">
               <label htmlFor="card-input" className="font-semibold text-primary-500">
                  Nhập mã thẻ{" "}
                  {formik.errors.code && formik.touched.code && (
                     <i className="text-sm font-normal text-red-500">{formik.errors.code.toString()}</i>
                  )}
               </label>

               <input
                  id="card-input"
                  type="text"
                  name="code"
                  onChange={formik.handleChange}
                  className="border border-gray-300 rounded-md w-full py-1.5 px-3 mt-2"
               ></input>
            </div>

            <div className="mb-4">
               <input
                  id="check-input"
                  name="acceptRule"
                  checked={formik.values.acceptRule}
                  onChange={() => formik.setFieldValue("acceptRule", !formik.values.acceptRule)}
                  type="checkbox"
                  className="me-2"
               ></input>
               <label htmlFor="check-input" className="font-semibold text-primary-500">
                  Xác nhận nhập chính xác thông tin thẻ.{" "}
                  <span className="text-red-500">
                     Nếu nhập sai mệnh giá hoặc sai loại thẻ cào sẽ mất toàn bộ số tiền đã nạp.
                  </span>
                  {formik.errors.acceptRule && formik.touched.acceptRule && (
                     <i className="text-sm font-normal text-red-500">{formik.errors.acceptRule.toString()}</i>
                  )}
               </label>
            </div>

            <div>
               <PrimaryButton content="Nạp thẻ" type="submit" className="!px-10" />
            </div>
         </form>
      </div>
   );
}
export default LoadByCard;
