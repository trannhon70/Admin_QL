import { ReactElement, useState } from "react";
import { Modal } from "antd";

type PropsType = {
    buttonStyle?: string;
    buttonIcon?: ReactElement<HTMLElement>;
    title: string;
    description?: string;
    handleSubmit: Function;
};

const ConfirmModal = (props: PropsType) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShow = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        props.handleSubmit();
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
       <>
          <button className={`${props.buttonStyle}`} onClick={handleShow}>
             {props.buttonIcon}
          </button>

          <Modal title={props.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
             <div className="py-3">
                <p className="mb-5">{props.description}</p>
             </div>
             <div className="flex justify-end gap-3">
                <button className="bg-primary-500 text-white rounded-md py-2 px-3" onClick={handleOk}>
                   Xác nhận
                </button>
                <button onClick={handleCancel} className="bg-white rounded-md py-2 px-3">
                   Hủy
                </button>
             </div>
          </Modal>
       </>
    );
};

export default ConfirmModal;
