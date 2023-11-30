import { Space, Spin } from "antd";

const FullPageSpiner = ({ isLoading = false }: { isLoading: boolean }) => {
    if (!isLoading) return <></>;
    return (
       <div className="w-full h-full bg-gray-300 fixed opacity-50 top-0 left-0 flex justify-center items-center z-50">
          <Space size="middle">
             <Spin size="large"></Spin>
          </Space>
       </div>
    );
};

export default FullPageSpiner;
