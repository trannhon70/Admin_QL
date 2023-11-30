import React, { useState } from "react";
import { Pagination, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getPagingUserTask } from "api/task.api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FormatNumberVND } from "../../../util";

const columns: ColumnsType<any> = [
  {
    title: "STT",
    dataIndex: "name",
    key: "name",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
    render: (value) => value,
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    render: (value) => FormatNumberVND(value),
  },
  {
    title: "Follow",
    key: "follow",
    dataIndex: "follow",
  },
  {
    title: "Tổng tiền",
    key: "totalMoney",
    dataIndex: "totalMoney",
    render: (value) => FormatNumberVND(value),
  },
  {
    title: "Mô tả",
    key: "note",
    dataIndex: "note",
  },
];
const ComponentOrderdiaryTiktok = () => {
  const userInfo = useSelector((state: any) => state.user.currentUser);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [data, setData] = useState<any>([]);

  const getPagingUserTasks = async () => {
    const query = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      userId: userInfo._id,
      type: "64c08584c2213f0eec1c6456",
    };

    const result: any = await getPagingUserTask(query);
    setTotalPage(result.counts);
    setData(result.data);
  };

  useEffect(() => {
    getPagingUserTasks();
  }, [pageIndex, pageSize]);

  return (
    <div className="mt-3">
      <Table columns={columns} dataSource={data} pagination={false} />
      <Pagination
        className="mt-3"
        total={totalPage}
        showSizeChanger={true}
        pageSizeOptions={[1, 10, 20, 50, 100]}
        onChange={(page, pageSize) => {
          setPageIndex(page !== 0 ? page : 1);
          setPageSize(pageSize);
        }}
      />
    </div>
  );
};

export default ComponentOrderdiaryTiktok;
