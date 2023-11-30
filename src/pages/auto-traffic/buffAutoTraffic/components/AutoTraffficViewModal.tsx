import { ReactElement, useState } from "react";
import { InputNumber, Modal, Popover, Select, Tooltip } from "antd";
import { useFormik } from "formik";
import { AiOutlineEye } from "react-icons/ai";
import moment from "moment";


import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import { FormatNumberVND } from "../../../../util";
import SecondaryButton from "components/ui/button/SecondaryButton";
import { statusString } from "../dataFake";

type PropsType = {
   buttonStyle?: string;
   buttonIcon?: ReactElement<HTMLElement>;
   onSubmit?: Function;
   info?: any,
   handleSearch?: any,
   userInfo?: any
};

const AutoTraffficViewModal = (props: PropsType) => {
   const {info, userInfo} = props;
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const handleShow = () => {
      setIsModalOpen(true);
   };
   const handleOk = () => {
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
         user: userInfo?._id,
         name: info?.name,
         domain: info?.domain,
         keyword: info?.keyword,
         isFirstPage: info?.isFirstPage,
         isClickLink: info?.isClickLink,
         isCopyText: info?.isCopyText,
         isClickButton: info?.isClickButton,
         isScroll: info?.isScroll,
         status: info?.status,
         package: info?.package,
         totalAmount:info?.totalAmount,
         quantity:info?.originQuantity,
         startDate:info?.startDate,
         endDate:info?.endDate,
         createdAt: info?.createdAt
      },
      onSubmit: async (values: any) => {
         setIsLoading(true);
      },
   });

   return (
      <>
         <Tooltip title="Xem chi tiết">
            <AiOutlineEye 
               size={24} 
               className=" text-sky-500 my-auto mx-auto block cursor-pointer" 
               onClick={handleShow} />
         </Tooltip>
         
         <Modal
            title={<h5>Xem chi tiết nhiệm vụ</h5>}
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
                     Nhiệm vụ
                  </label>
                  <input
                     className="border border-gray-300 rounded-md w-full p-2.5"
                     name="name"
                     id="input-user"
                     value={formik.values.name}
                     disabled
                  ></input>
               </div>

               <div className="w-full mb-4">
                  <label htmlFor="input-account-number" className="line-clamp-1 text-base font-semibold mb-1">
                     Tên miền
                  </label>

                  <input
                     id="input-account-number"
                     type="text"
                     name="domain"
                     value={formik.values.domain}
                     className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                     disabled
                  ></input>
               </div>

               <div className="w-full mb-4">
                  <label htmlFor="select-bank" className="line-clamp-1 text-base font-semibold mb-1">
                     Từ khóa{" "}
                  </label>
                  <Select
                     id="select-bank"
                     value={formik.values.keyword}
                     className="w-full [&>div]:!h-10"
                     disabled
                  />
               </div>

               <div className="w-full mb-4">
                  <label htmlFor="input-account-balance" className="line-clamp-1 text-base font-semibold mb-1">
                     Gói onsite
                  </label>

                  <div className="w-full relative">
                     <InputNumber
                        className="w-full !py-1.5"
                        name="creditWanted"
                        value={formik.values.package}
                        disabled
                     />
                  </div>
               </div>

               <div className="w-full mb-4">
                  <label htmlFor="input-account-balance" className="line-clamp-1 text-base font-semibold mb-1">
                     Số traffic cho nhiệm vụ này{" "}
                  </label>

                  <div className="w-full relative">
                     <InputNumber
                        className="w-full !py-1.5"
                        name="quantity"
                        value={formik.values.quantity}
                        disabled
                     />
                  </div>
               </div>

               <div className="w-full mb-4">
                  <label htmlFor="input-body-transfer" className="line-clamp-1 text-base font-semibold mb-1">
                     Tổng thành tiền
                  </label>

                  <input
                     id="input-body-transfer"
                     type="text"
                     name="paymentContent"
                     disabled
                     value={FormatNumberVND(formik.values.totalAmount)}
                     className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                  ></input>
               </div>

               <div className="w-full mb-4">
                  <label htmlFor="select-status" className="line-clamp-1 text-base font-semibold mb-1">
                     Trạng thái{" "}
                  </label>
                  <Select
                     id="select-status"
                     value={formik.values.status}
                     className="w-full [&>div]:!h-10"
                     options={statusString || []}
                     disabled
                  />
               </div>

               <div className="w-full mb-8">
                  <label htmlFor="input-createdAt" className="line-clamp-1 text-base font-semibold mb-1">
                     Ngày tạo
                  </label>

                  <input
                     id="input-createdAt"
                     name="createdAt"
                     disabled
                     value={moment(formik.values.createdAt).format("DD/MM/YYYY")}
                        //
                     className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                  ></input>
               </div>
               
               <div className="w-full mb-8">
                  <label htmlFor="input-startDate" className="line-clamp-1 text-base font-semibold mb-1">
                     Ngày bắt đầu
                  </label>

                  <input
                     id="input-startDate"
                     name="startDate"
                     disabled
                     value={moment(formik.values.startDate).format("DD/MM/YYYY")}
                     className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                  ></input>
               </div>

               <div className="w-full mb-8">
                  <label htmlFor="input-endDate" className="line-clamp-1 text-base font-semibold mb-1">
                     Ngày kết thúc
                  </label>

                  <input
                     id="input-endDate"
                     name="endDate"
                     disabled
                     value={moment(formik.values.endDate).format("DD/MM/YYYY")}
                     className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                  ></input>
               </div>

               <div className="flex justify-end gap-3">
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

export default AutoTraffficViewModal;
