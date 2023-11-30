import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputNumber, Modal, Popover, Select } from "antd";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useFormik } from "formik";
import * as Yup from "yup";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import { topUpAction } from "redux/top-up/top-up.slice";
import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import SecondaryButton from "components/ui/button/SecondaryButton";
import { LuEdit2 } from "react-icons/lu";
import { paymentManagerAction } from "redux/payment-manager/payment-manager.slice";

type PropsType = {
   buttonStyle?: string;
   buttonIcon?: ReactElement<HTMLElement>;
   onSubmit?: Function;
   info?: any,
   handleSearch?: any
   userInfo?:any
};

const PaymentEditModal = (props: PropsType) => {
   const {info, handleSearch, userInfo} = props
   const dispatch = useDispatch<any>();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   // const [userInfo, setUserInfo] = useState<any>();

   const listBank = useSelector((state: any) => state.topUp.listBank) || [];
   

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

   const banks = listBank.map((bank: any) => ({
      label: bank?.name,
      value: bank?.name,
   }));

   const handleShow = () => {
      setIsModalOpen(true);
   };
   const handleOk = () => {
      // props.onSubmit();

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
         userIdBuy:info?.userIdBuy?.userName,
         accountBank: info?.accountBank,
         paymentNeed: info?.paymentNeed,
         creditWanted: info?.creditWanted,
         paymentContent: info?.paymentContent,
         paymentDate: info?.paymentDate === null ? format(Date.now(), "yyyy-MM-dd hh:mm") :format(new Date(info?.paymentDate), "yyyy-MM-dd hh:mm"),
         bank: info?.bank,
         status: info?.status,
         userApprove: userInfo?.userName,
         _id: info?._id
      },
      onSubmit: async (values: any) => {
         setIsLoading(true);
         try {
            values.userApprove = userInfo?._id
            const result = dispatch(paymentManagerAction.updateOneInfo(values));
            result.then((data: any) => {
               setIsLoading(false);
               if (data.error) {
                  toast.error(data?.error?.message || "Thêm thông tin thất bại");
                  return;
               }

               toast.success(data.message || "Thêm thông tin thành công");
               setIsModalOpen(false)
               handleSearch()
               // props.onSubmit();
            });
         } catch (error) {
            toast.error("Thêm thông tin thất bại");
            setIsLoading(false);
         }
      },
   });

   // useEffect(() => {
   //    const result = LOCAL_STORAGE.getCurrentUser();
   //    setUserInfo(result);
   // }, []);

   return (
      <>
         <Popover content="Thêm nội dung thanh toán">
            <LuEdit2 size={24} className="mr-2 text-sky-500 cursor-pointer" onClick={handleShow} />
         </Popover>
         

         <Modal
            title={<h5>Thêm thông tin thanh toán</h5>}
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
                     Người nạp
                  </label>
                  <input
                     className="border border-gray-300 rounded-md w-full p-2.5"
                     name="userIdBuy"
                     id="input-user"
                     value={formik.values.userIdBuy}
                     disabled
                  ></input>
               </div>

               <div className="w-full mb-4">
                  <label htmlFor="input-account-number" className="line-clamp-1 text-base font-semibold mb-1">
                     Số tài khoản
                  </label>

                  <input
                     id="input-account-number"
                     type="text"
                     name="accountBank"
                     value={formik.values.accountBank}
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
                     Số tiền thanh toán{" "}
                     {formik.errors.paymentNeed && formik.touched.paymentNeed && (
                        <i className="text-sm font-normal text-red-500">{formik.errors.paymentNeed.toString()}</i>
                     )}
                  </label>

                  <div className="w-full relative">
                     <InputNumber
                        className="w-full !py-1.5"
                        name="paymentNeed"
                        value={new Intl.NumberFormat("en").format(formik.values.paymentNeed || 0)}
                        disabled
                     />
                     <div className="absolute bg-white right-1.5 top-1.5 p-1">
                        <p className="text-gray-400">VND</p>
                     </div>
                  </div>
               </div>

               <div className="w-full mb-4">
                  <label htmlFor="input-account-balance" className="line-clamp-1 text-base font-semibold mb-1">
                     Credit muốn mua{" "}
                     {formik.errors.creditWanted && formik.touched.creditWanted && (
                        <i className="text-sm font-normal text-red-500">{formik.errors.creditWanted.toString()}</i>
                     )}
                  </label>

                  <div className="w-full relative">
                     <InputNumber
                        className="w-full !py-1.5"
                        name="creditWanted"
                        value={formik.values.creditWanted || 0}
                        disabled
                     />
                  </div>
               </div>

               <div className="w-full mb-4">
                  <label htmlFor="select-status" className="line-clamp-1 text-base font-semibold mb-1">
                     Trạng thái{" "}
                  </label>
                  <Select
                     id="select-status"
                     value={formik.values.status}
                     className="w-full [&>div]:!h-10"
                     options={info?.status === 2 ||  info?.status === 1 ? status.slice(0,2) :status || []}
                     onChange={(value) => {
                        formik.setFieldValue("status", value);
                     }}
                     disabled = {info?.status === 3 ? true : false}
                  />
               </div>

               <div className="w-full mb-4">
                  <label htmlFor="input-body-transfer" className="line-clamp-1 text-base font-semibold mb-1">
                     Nội dung chuyển khoản
                  </label>

                  <input
                     id="input-body-transfer"
                     type="text"
                     name="paymentContent"
                     value={formik.values.paymentContent}
                     onChange={formik.handleChange}
                     className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                  ></input>
               </div>

               <div className="w-full mb-8">
                  <label htmlFor="input-paymentDate" className="line-clamp-1 text-base font-semibold mb-1">
                     Ngày thanh toán
                  </label>

                  <input
                     id="input-paymentDate"
                     type="datetime-local"
                     name="paymentDate"
                     value={formik.values.paymentDate}
                     onChange={formik.handleChange}
                     className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                  ></input>
               </div>

               <div className="mb-4">
                  <label htmlFor="input-admin" className="line-clamp-1 text-base font-semibold mb-1">
                     Người xác nhận
                  </label>
                  <input
                     className="border border-gray-300 rounded-md w-full p-2.5"
                     name="userApprove"
                     id="input-admin"
                     value={formik.values.userApprove}
                     disabled
                  ></input>
               </div>

               <div className="my-4">
                  <label htmlFor="input-admin" className="line-clamp-1 text-base font-semibold mb-1">
                     Ảnh hóa đơn
                  </label>
                  <img src={info?.imageInvoice} alt="imageInvoice" className="rounded-lg w-[450px] block mx-auto"/>
               </div>      

               <div className="flex justify-end gap-3">
                  <PrimaryButton className="py-2 px-6" type="submit" content="Thay đổi"></PrimaryButton>
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

export default PaymentEditModal;
