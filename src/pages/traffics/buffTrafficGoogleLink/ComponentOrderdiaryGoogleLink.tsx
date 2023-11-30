import React, { useState } from "react";
import { Pagination, Popover, Space, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getPagingUserTask } from "api/task.api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FormatNumberVND } from "../../../util";
import moment from "moment";
import { RiFileCopy2Fill } from "react-icons/ri";
import { GoSearch } from "react-icons/go";
import PrimaryButton from "components/ui/button/PrimaryButtton";
const columns: ColumnsType<any> = [
  {
    title: "STT",
    dataIndex: "name",
    key: "name",
    render: (text, record, index) => index + 1,
  },

  {
    title: "Người tạo",
    dataIndex: "customerId",
    key: "customerId",
    render: (text, record, index) => {
      return <div>{text.email}</div>;
    },
  },

  //   {
  //     title: "Từ khóa",
  //     dataIndex: "keyWord",
  //     key: "keyWord",
  //     render: (text, record, index) => text,
  //   },
  {
    title: "Traffic/ngày ",
    dataIndex: "numberTraffic",
    key: "numberTraffic",
    render: (text, record, index) => text,
    sorter: (a, b) => a.numberTraffic - b.numberTraffic,
  },
  {
    title: "Tổng traffic ",
    dataIndex: "follow",
    key: "follow",
    render: (text, record, index) => text,
    sorter: (a, b) => a.follow - b.follow,
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
    render: (value) => {
      return (
        <Popover content={value} title="">
          {value.substring(0, 40)}...
        </Popover>
      );
    },
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    render: (value) => FormatNumberVND(value),
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Số lượng",
    key: "follow",
    dataIndex: "follow",
    sorter: (a, b) => a.follow - b.follow,
  },
  {
    title: "Tổng tiền",
    key: "totalMoney",
    dataIndex: "totalMoney",
    render: (value) => FormatNumberVND(value),
    sorter: (a, b) => a.totalMoney - b.totalMoney,
  },
  {
    title: "Thời gian",
    key: "createdAt",
    dataIndex: "createdAt",
    render: (value) => moment(value).format("DD/MM/YYYY"),
  },
  {
    title: "Hoạt động",
    key: "script",
    dataIndex: "script",
    render: (value, record, index) => {
      return (
        <RiFileCopy2Fill
          size={20}
          className="text-lime-600 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(`${record.script}`);
            message.success(
              `Bạn đã copy đoạn script của trang ${record.link} thành công!`
            );
          }}
        />
      );
    },
  },
];

const ComponentOrderdiaryGoogleLink = () => {
  const userInfo = useSelector((state: any) => state.user.currentUser);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState<string>("");

  const getPagingUserTasks = async () => {
    const query = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      userId: userInfo._id,
      type: "64ded9246651772653147ad8",
      search: search,
      typeTask: 2,
    };

    const result: any = await getPagingUserTask(query);

    setTotalPage(result.counts);
    setData(result.data);
  };

  useEffect(() => {
    getPagingUserTasks();
  }, [pageIndex, pageSize]);

  const handleSearch = () => {
    getPagingUserTasks();
  };
  return (
    <div className="mt-3">
      <div className="grid grid-cols-12 gap-x-2 gap-y-3 mb-3">
        <div className="col-span-12 lg:col-span-7 flex sm:flex-nowrap flex-wrap gap-2">
          <div className="flex sm:w-1/3 w-full rounded-md border border-gray-300 bg-white items-center py-1.5">
            <input
              className="bg-white pl-3 w-full"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            ></input>
            <GoSearch size={20} className="mx-3" />
          </div>

          <PrimaryButton
            className="w-full sm:w-1/3 lg:w-max !py-1.5 px-5"
            content="Tìm kiếm"
            onClick={handleSearch}
            icon={<GoSearch size={20} className="mr-1" />}
          ></PrimaryButton>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data.map((item: any, index: number) => ({
          ...item,
          key: index,
        }))}
        pagination={false}
      />
      <Pagination
        className="mt-3"
        current={pageIndex}
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

export default ComponentOrderdiaryGoogleLink;
