import { ReactElement, useEffect, useState } from "react";
import { InputNumber, Modal, Select } from "antd";
import SecondaryButton from "components/ui/button/SecondaryButton";
import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { BsCurrencyExchange } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import { topUpAction } from "redux/top-up/top-up.slice";
import { format } from "date-fns";

type PropsType = {
   buttonStyle?: string;
   buttonIcon?: ReactElement<HTMLElement>;
   onSubmit: Function;
   memberInfo: any;
   type: number;
};

const TopUpModal = (props: PropsType) => {
   const dispatch = useDispatch<any>();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const listBank = useSelector((state: any) => state.topUp.listBank) || [];

   const banks = listBank.map((bank: any) => ({
      label: bank?.name,
      value: bank?.name,
   }));

   const handleShow = () => {
      setIsModalOpen(true);
   };
   const handleOk = () => {
      props.onSubmit();

      setIsModalOpen(false);
   };
   const handleCancel = () => {
      setIsModalOpen(false);
   };

   const formik = useFormik({
      validateOnChange: true,
      validateOnBlur: true,
      enableReinitialize: true,
      validateOnMount: false,
      initialValues: {
         accountNumber: "",
         quantity: 50000,
         receiver: props?.memberInfo?.userName,
         bodyTransfer: `naptien ${props?.memberInfo?.userName}`,
         transferDate: format(new Date(), "yyyy-MM-dd hh:mm"),
         bank: "",
      },
      validationSchema: Yup.object({
         quantity: Yup.number().required("* Required").min(50000, "* Nạp tối thiểu 50.000VND"),
         receiver: Yup.string().required("* Required"),
      }),
      onSubmit: async (values: any) => {
         setIsLoading(true);

         try {
            const result = dispatch(topUpAction.createTransferTopUp(values));
            result.then((data: any) => {
               setIsLoading(false);
               if (data.error) {
                  toast.error(data?.error?.message || "Nạp thất bại");
                  return;
               }
               //
               toast.success(data.message || "Nạp thành công");
               props.onSubmit();
            });
         } catch (error) {
            toast.error("Nạp thất bại");
            setIsLoading(false);
         }
      },
   });

   useEffect(() => {
      dispatch(topUpAction.getListBank());
   }, []);

   return (
      <>
         {props.type ? (
            <SecondaryButton
               className="hover:border-yellow-500"
               background="bg-white hover:bg-yellow-400"
               content="Nạp tiền"
               onClick={handleShow}
               icon={<RiMoneyEuroCircleLine className="me-2" size={20} />}
            />
         ) : (
            <button className={`${props.buttonStyle}`} onClick={handleShow}>
               <BsCurrencyExchange size={24} className="text-yellow-500" />
            </button>
         )}

         <Modal
            title={<h5>Nạp tiền vào tài khoản: {props?.memberInfo?.userName}</h5>}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={700}
            footer={null}
            className="relative"
         >
            <FullPageSpiner isLoading={isLoading} />

            <form onSubmit={formik.handleSubmit} className="pt-6">
               <div className="mb-4">
                  <label htmlFor="input-user" className="line-clamp-1 text-base font-semibold mb-1">
                     Người dùng{" "}
                  </label>
                  <input
                     disabled
                     className="border border-gray-300 rounded-md w-full p-2.5"
                     value={props.memberInfo?.userName}
                  ></input>
               </div>

               <div className="w-full mb-4">
                  <label htmlFor="input-account-number" className="line-clamp-1 text-base font-semibold mb-1">
                     Số tài khoản
                  </label>

                  <input
                     id="input-account-number"
                     type="text"
                     name="accountNumber"
                     onChange={formik.handleChange}
                     className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                  ></input>
               </div>

               <div className="w-full mb-4">
                  <label htmlFor="select-bank" className="line-clamp-1 text-base font-semibold mb-1">
                     Chọn ngân hàng{" "}
                  </label>
                  <Select
                     id="select-bank"
                     allowClear
                     value={formik.values.bank}
                     className="w-full [&>div]:!h-10"
                     options={banks || []}
                     onChange={(value) => {
                        formik.setFieldValue("bank", value);
                     }}
                  />
               </div>

               <div className="w-full mb-4">
                  <label htmlFor="input-account-balance" className="line-clamp-1 text-base font-semibold mb-1">
                     Số tiền nạp{" "}
                     {formik.errors.quantity && formik.touched.quantity && (
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

               <div className="w-full mb-4">
                  <label htmlFor="input-body-transfer" className="line-clamp-1 text-base font-semibold mb-1">
                     Nội dung chuyển khoản
                  </label>

                  <input
                     id="input-body-transfer"
                     type="text"
                     name="bodyTransfer"
                     value={formik.values.bodyTransfer}
                     onChange={formik.handleChange}
                     className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                  ></input>
               </div>

               <div className="w-full mb-8">
                  <label htmlFor="input-transferDate" className="line-clamp-1 text-base font-semibold mb-1">
                     Ngày chuyển khoản
                  </label>

                  <input
                     id="input-transferDate"
                     type="datetime-local"
                     name="transferDate"
                     value={formik.values.transferDate}
                     onChange={formik.handleChange}
                     className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                  ></input>
               </div>

               <div className="flex justify-end gap-3">
                  <PrimaryButton className="py-2 px-6" type="submit" content="Xác nhận"></PrimaryButton>
                  <SecondaryButton
                     onClick={handleCancel}
                     type="button"
                     className="bg-white rounded-md py-2 px-3"
                     content="Hủy"
                  ></SecondaryButton>
               </div>
            </form>
         </Modal>
      </>
   );
};

export default TopUpModal;
