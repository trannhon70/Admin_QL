import { ReactElement, useEffect, useState } from "react";
import { Collapse, Modal } from "antd";
import SecondaryButton from "components/ui/button/SecondaryButton";
import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import { BsCreditCard2Back, BsFillCaretRightFill } from "react-icons/bs";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { topUpAction } from "redux/top-up/top-up.slice";
import { toast } from "react-toastify";
import { CARD_TOP_UP_STATUS } from "common/constant";

type PropsType = {
   buttonStyle?: string;
   buttonIcon?: ReactElement<HTMLElement>;
   onSubmit: Function;
   memberInfo: any;
};

const TopUpRequestModal = (props: PropsType) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const userInfo = useSelector((state: any) => state.user.updateUser) || {};
   const listCardTopUp = useSelector((state: any) => state.topUp.cardTopUp) || {};

   const dispatch = useDispatch<any>();

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

   const handleUpdate = ({ id, status }: { id: string; status: string }) => {
      setIsLoading(true);

      try {
         const result = dispatch(topUpAction.updateCardTopUp({ id, status }));
         result.then((data: any) => {
            setIsLoading(false);
            if (data.error) {
               toast.error(data?.error?.message || "Cập nhật thất bại");
               return;
            }
            //
            toast.success(data.message || "Cập nhật thành công");
            dispatch(topUpAction.getUserCardTopUp(userInfo?._id));
            props.onSubmit();
         });
      } catch (error) {
         toast.error("Cập nhật thất bại");
         setIsLoading(false);
      }
   };

   const items = listCardTopUp?.items?.map((item: any, id: number) => ({
      key: id,
      label: (
         <div className="flex justify-between">
            <p>
               {item.networkOperator}: {new Intl.NumberFormat("vi").format(item.cardPrice || 0)} VND
            </p>
            <p>{item.created_at ? format(new Date(item.created_at), "dd-MM-yyyy") : ""}</p>
         </div>
      ),
      children: (
         <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2 pt-3">
            <div className="w-full">
               <div className="grid grid-cols-12 w-full">
                  <div className="col-span-4">
                     <p>Số seri: </p>
                  </div>
                  <div className="col-span-8">
                     <p className="font-semibold">{item.seri}</p>
                  </div>
               </div>

               <div className="grid grid-cols-12 w-full">
                  <div className="col-span-4">
                     <p>Mã số thẻ: </p>
                  </div>
                  <div className="col-span-8">
                     <p className="font-semibold">{item.code}</p>
                  </div>
               </div>
            </div>

            <div className="w-full">
               <div className="flex justify-end gap-2 w-full">
                  <PrimaryButton
                     content="Xác nhận"
                     background="bg-yellow-400"
                     onClick={() => {
                        handleUpdate({ id: item._id, status: CARD_TOP_UP_STATUS.APPROVED });
                     }}
                  ></PrimaryButton>
                  <SecondaryButton
                     content="Hủy bỏ"
                     background="bg-white hover:bg-gray-200"
                     onClick={() => {
                        handleUpdate({ id: item._id, status: CARD_TOP_UP_STATUS.CANCELLED });
                     }}
                  ></SecondaryButton>
               </div>
            </div>
         </div>
      ),
      style: {
         marginBottom: 20,
         background: "#dbeafe",
         borderRadius: 5,
      },
   }));

   useEffect(() => {
      if (userInfo?._id) dispatch(topUpAction.getUserCardTopUp(userInfo?._id));
   }, [userInfo]);

   return (
      <>
         <div className="relative">
            <SecondaryButton
               className="hover:border-yellow-500"
               background="bg-white hover:bg-yellow-400"
               content="Yêu cầu nạp thẻ"
               onClick={handleShow}
               icon={<BsCreditCard2Back className="me-2" size={20} />}
            ></SecondaryButton>
            {items?.length ? (
               <span className="absolute rounded-full text-center font-semibold text-white bg-red-600 -top-2 -right-2 h-6 w-6">
                  {items?.length}
               </span>
            ) : (
               <></>
            )}
         </div>

         <Modal
            title={<h5>Thông tin thẻ nạp</h5>}
            open={isModalOpen}
            onOk={handleOk}
            width={900}
            onCancel={handleCancel}
            footer={null}
         >
            <FullPageSpiner isLoading={isLoading} />

            <div className="py-8">
               {items?.length ? (
                  <Collapse
                     className="max-h-[600px] overflow-y-scroll"
                     bordered={false}
                     defaultActiveKey={["0"]}
                     expandIcon={({ isActive }) => (
                        <BsFillCaretRightFill className={`${isActive ? "rotate-90" : ""} duration-300`} />
                     )}
                     style={{
                        background: "#FFFFFF",
                     }}
                     items={items}
                  />
               ) : (
                  <div className="py-20">
                     <h5 className="text-center">Không có yêu cầu nạp thẻ nào!</h5>
                  </div>
               )}
            </div>
         </Modal>
      </>
   );
};

export default TopUpRequestModal;
