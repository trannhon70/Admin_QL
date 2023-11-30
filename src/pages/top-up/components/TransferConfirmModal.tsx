import { ReactNode, useState } from "react";
import { Modal } from "antd";
import { BiTransfer } from "react-icons/bi";
import PrimaryButton from "components/ui/button/PrimaryButtton";

type PropsType = {
   title?: string;
   description: ReactNode;
   handleSubmit: Function;
   isActive: boolean;
};

const TransferConfirmModal = (props: PropsType) => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleShow = () => {
      setIsModalOpen(true);
   };
   const handleOk = () => {
      setIsModalOpen(false);
   };
   const handleCancel = () => {
      setIsModalOpen(false);
   };

   return (
      <>
         <PrimaryButton
            className="!px-10"
            icon={<BiTransfer className="me-2" size={20} />}
            content="Chuyển tiền"
            type="button"
            onClick={props?.isActive ? handleShow : () => {}}
         />

         <Modal title={props?.title || ""} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <div className="py-3 mb-5">{props.description}</div>
            <div className="flex justify-end gap-3">
               <button
                  className="bg-primary-500 text-white rounded-md py-2 px-3"
                  type="button"
                  onClick={() => {
                     setIsModalOpen(false);
                     props.handleSubmit();
                  }}
               >
                  Xác nhận
               </button>
               <button onClick={handleCancel} className="bg-white rounded-md py-2 px-3" type="button">
                  Hủy
               </button>
            </div>
         </Modal>
      </>
   );
};

export default TransferConfirmModal;
