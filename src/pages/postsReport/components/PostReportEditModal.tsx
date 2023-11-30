import { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Popover, Select } from "antd";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useFormik } from "formik";


import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import SecondaryButton from "components/ui/button/SecondaryButton";
import { postsReportAction } from "redux/postsReport/postsReport.slice";
import { Link } from "react-router-dom";
import { LuEdit2 } from "react-icons/lu";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import { API_CONFIG } from "config";

type PropsType = {
   buttonStyle?: string;
   buttonIcon?: ReactElement<HTMLElement>;
   onSubmit?: Function;
   info?: any,
   handleSearch?: any,
   userInfo?: any
};

const PostReportEditModal = (props: PropsType) => {
   const {info, handleSearch, userInfo} = props
   const dispatch = useDispatch<any>();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   
   const status = [
      {
         value: 1,
         label: "Đã xử lý",
      },
      {
         value: 2,
         label: "Chưa xử lý",
      },
      {
         value: 3,
         label: "Chờ xác thực",
      },
   ]

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
         userIdReport: info?.userIdReport?.userName,
         contentReport:info?.contentReport,
         status: info?.status,
         reportDate: format(new Date(info?.createDate), "yyyy-MM-dd hh:mm"),
         userCreatePost: info?.userCreatePost?.userName,
      },
      onSubmit: async (values: any) => {
         setIsLoading(true);
         try {
            const objSend = {
               _id: info?._id,
               status: values.status
            }
            const result = dispatch(postsReportAction.updateReportOne(objSend));
            result.then((data: any) => {
               setIsLoading(false);
               if (data.error) {
                  toast.error(data?.error?.message || "Chỉnh sửa thất bại");
                  return;
               }

               toast.success(data.message || "Chỉnh sửa thành công");
               setIsModalOpen(false);
               handleSearch();
            });
         } catch (error) {
            toast.error("Chỉnh sửa thất bại");
            setIsLoading(false);
         }
      },
   });

   return (
      <>
         <Popover content="Thay đổi trang thái">
            <LuEdit2 size={24} className="mr-2 text-sky-500 cursor-pointer" onClick={handleShow} />
         </Popover>
         
         <Modal
            title={<h5>Xem báo cáo bài viết</h5>}
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
                     Người báo cáo
                  </label>
                  <input
                     className="border border-gray-300 rounded-md w-full p-2.5"
                     name="userIdReport"
                     id="input-userIdReport"
                     value={formik.values.userIdReport}
                     disabled
                  ></input>
               </div>
               <div className="mb-4">
                  <label htmlFor="input-user" className="line-clamp-1 text-base font-semibold mb-1">
                     Nôi dung báo cáo
                  </label>
                  <textarea
                     className="border border-gray-300 rounded-md w-full p-2.5"
                     name="contentReport"
                     id="textarea-contentReport"
                     value={formik.values.contentReport}
                     disabled
                  ></textarea>
               </div>
               <div className="w-full mb-4">
                  <label htmlFor="select-status" className="line-clamp-1 text-base font-semibold mb-1">
                     Trạng thái{" "}
                  </label>
                  <Select
                     id="select-status"
                     value={formik.values.status}
                     className="w-full [&>div]:!h-10"
                     options={status || []}
                     onChange={(value) => {
                        formik.setFieldValue("status", value);
                     }}
                  />
               </div>
               <div className="w-full mb-8">
                  <label htmlFor="input-paymentDate" className="line-clamp-1 text-base font-semibold mb-1">
                     Ngày báo cáo
                  </label>

                  <input
                     id="input-reportDate"
                     type="datetime-local"
                     name="reportDate"
                     disabled
                     value={formik.values.reportDate}
                     onChange={formik.handleChange}
                     className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                  ></input>
               </div>

               <div className="mb-4">
                  <label htmlFor="input-user" className="line-clamp-1 text-base font-semibold mb-1">
                        Tác giả đăng bài
                     </label>
                     <input
                        className="border border-gray-300 rounded-md w-full p-2.5"
                        name="userCreatePost"
                        id="input-userCreatePost"
                        value={formik.values.userCreatePost}
                        disabled
                     ></input>
               </div>

               <div className="mb-4">
                  <label htmlFor="input-user" className="line-clamp-1 text-base font-semibold mb-1">
                        Đường dẫn bài đăng
                     </label>
                     <Link to = {`${API_CONFIG.UI_URL}/quan-ly-bai-dang-CDS/chi-tiet/${info?.slug}&${info?.postId?._id}`}>
                        {`${API_CONFIG.UI_URL}/quan-ly-bai-dang-CDS/chi-tiet/${info?.slug}&${info?.postId?._id}`}
                     </Link>
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

export default PostReportEditModal;
