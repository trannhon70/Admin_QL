import { Space, Spin } from "antd";

const SimpleSpiner = ({ isLoading = false }: { isLoading: boolean }) => {
    if (!isLoading) return <></>;
    return (
        <div className="w-full h-80 max-h-full flex justify-center items-center">
            <Space size="middle">
                <Spin size="large"></Spin>
            </Space>
        </div>
    );
};

export default SimpleSpiner;
