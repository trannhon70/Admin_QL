import { Modal } from "antd";
import { BsFillPatchCheckFill } from "react-icons/bs";
interface IProps {
  isModel: any;
  handleOk: any;
  handleCancel: any;
}
const ModelsuccessPay = (props: IProps) => {
  const { isModel, handleOk, handleCancel } = props;
  return (
    <Modal
      open={isModel}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      bodyStyle={{ height: "300px" }}
    >
      <div className="flex justify-center h-32 items-end text-3xl text-green-600 mb-5 font-semibold ">
        Tài khoản này đã được thanh toán
      </div>
      <div className="w-full flex justify-center items-center text-green-600 ">
        <BsFillPatchCheckFill size={70} />{" "}
      </div>
    </Modal>
  );
};

export default ModelsuccessPay;
