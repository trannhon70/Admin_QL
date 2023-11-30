import {
  Breadcrumb,
  Modal,
  Pagination,
  Popover,
  Select,
  Table,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  createPaymentUserGoogle,
  deleteWorkerUserGoogle,
  getPagingReviewGoogle,
  getPagingReviewGoogleMap,
} from "api/task.api";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import moment from "moment";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { FormatNumberVND, renderStatus } from "../../../util";

const ManageGoogle = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [chooseTask, setChooseTask] = useState<any>();
  const [statusFilter, setStatusFilter] = useState("");

  const AccountStatus = [
    {
      value: "approved",
      label: "Đã duyệt",
    },
    {
      value: "pending",
      label: "Chờ duyệt",
    },
    {
      value: "error",
      label: "Chưa hoàn thành",
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên người dùng",
      dataIndex: "customerId",
      key: "customerId",
      align: "center",
      width: 220,
      render: (value) => (value.fullName ? value.fullName : value.userName),
    },
    {
      title: "URL google search",
      key: "link",
      dataIndex: "link",
      align: "left",
      width: 300,
      render: (value) => {
        return (
          <Popover content={value} title="">
            {value.substring(0, 40)}...
          </Popover>
        );
      },
    },
    {
      title: "Tiền thanh toán",
      key: "money",
      dataIndex: "money",
      align: "center",
      width: 120,
      render: (value) => FormatNumberVND(value),
    },
    {
      title: "Từ khóa tìm kiếm",
      key: "keyWord",
      dataIndex: "keyWord",
      align: "center",
      width: 200,
      render: (value) => value,
    },
    {
      title: "Tình trạng",
      key: "status",
      dataIndex: "status",
      align: "center",
      width: 150,
      render: (value) => {
        if (value === "approved") {
          return (
            <div className="text-center">
              <span className="bg-green-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                {renderStatus(value)}
              </span>
            </div>
          );
        }
        if (value === "pending") {
          return (
            <div className="text-center">
              <span className="bg-orange-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                {renderStatus(value)}
              </span>
            </div>
          );
        }
        if (value === "newRedo") {
          return (
            <div className="text-center">
              <span className="bg-yellow-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                {renderStatus(value)}
              </span>
            </div>
          );
        }
        if (value === "error") {
          return (
            <div className="text-center">
              <span className="bg-red-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                {renderStatus(value)}
              </span>
            </div>
          );
        } else {
          return (
            <div className="text-center">
              <span className="bg-red-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                Chưa hoàn thành
              </span>
            </div>
          );
        }
      },
    },
    {
      title: "Ngày làm nhiệm vụ",
      key: "createdAt",
      dataIndex: "createdAt",
      align: "center",
      width: 150,
      render: (value) => moment(value).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày thanh toán",
      key: "completeAt",
      dataIndex: "completeAt",
      align: "center",
      width: 150,
      render: (value) => moment(value).format("DD/MM/YYYY"),
    },
    {
      title: "Số ngày còn lại",
      key: "dayLeft",
      dataIndex: "dayLeft",
      align: "center",
      width: 100,
      sorter: (a: any, b: any) => a.dayLeft - b.dayLeft,
      sortDirections: ["descend", "ascend"],
      render: (value) => {
        return value <= 3 ? (
          value < 0 ? (
            <div>-</div>
          ) : (
            <div className="text-red-600">{value}</div>
          )
        ) : (
          <div>{value}</div>
        );
      },
    },
    {
      title: "Hoạt động",
      key: "",
      dataIndex: "",
      align: "center",
      width: 250,
      render: (value, record) => {
        return (
          <PrimaryButton
            className="w-full sm:w-1/3 md:w-full lg:w-max !py-1.5 px-5 inline-block mx-auto"
            content={
              record?.status === "pending"
                ? "Thanh toán"
                : record?.status === ""
                ? "Hủy nhiệm vụ"
                : "Đã thanh toán"
            }
            onClick={
              record?.status === "pending"
                ? () => onClickPayAccount(record)
                : () => onClickDeleteWorker(record)
            }
            disabled={
              record?.status === "pending"
                ? false
                : record?.status === ""
                ? false
                : true
            }
            background={
              record?.status === "pending"
                ? ""
                : record?.status === ""
                ? "bg-yellow-500"
                : "bg-green-500"
            }
          ></PrimaryButton>
        );
      },
    },
  ];

  const getPagingReviewGoogles = async () => {
    const query = {
      type: "64ded9246651772653147ad8",
      search: search,
      pageIndex: pageIndex,
      pageSize: pageSize,
      statusFilter: statusFilter === undefined ? "" : statusFilter,
      typeTask: 1,
    };
    const result: any = await getPagingReviewGoogle(query);
    const newResult = result.data.map((element: any, index: number) => {
      return {
        key: index,
        ...element,
      };
    });
    setData(newResult);
    setTotalPage(result.counts);
  };

  useEffect(() => {
    getPagingReviewGoogles();
  }, [pageSize, pageIndex]);

  const handleSearch = () => {
    getPagingReviewGoogles();
  };

  const onClickPayAccount = async (task: any) => {
    const dataRef = {
      socialMedia: task?.socialMediaPlatform,
      customerId: task?.customerId?._id,
      taskId: task?.task?._id,
      workerId: task?._id,
    };
    const result: any = await createPaymentUserGoogle(dataRef);
    if (result.statusCode === 1) {
      message.success("Thanh toán thành công!");
      getPagingReviewGoogles();
    }
    if (result.statusCode === 2) {
      message.success("Thanh toán thất bại!");
      getPagingReviewGoogles();
    }
  };

  const onClickDeleteWorker = async (task: any) => {
    setIsModalOpen(true);
    setChooseTask(task);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    const dataRef = {
      workerId: chooseTask?._id,
    };
    const result: any = await deleteWorkerUserGoogle(dataRef);
    if (result.statusCode === 1) {
      message.success("Xóa nhiệm vụ thành công!");
      getPagingReviewGoogles();
    }
    if (result.statusCode === 2) {
      message.success("Xóa nhiệm vụ thất bại!");
      getPagingReviewGoogles();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4" id="manage">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { title: "Quản lý nhiệm vụ google" },
            { title: "Nhiệm vụ google user search" },
          ]}
        ></Breadcrumb>
      </div>
      <div className="mb-4">
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
            <Select
              id="select-status"
              allowClear
              placeholder="Trạng thái"
              className="sm:w-full md:w-1/4 lg:w-1/5 [&>div]:!h-9 [&>div]:!py-1"
              options={AccountStatus}
              onChange={(values) => {
                setStatusFilter(values);
              }}
            />
            <PrimaryButton
              className="md:w-1/6 sm:w-full lg:w-max !py-1.5 px-5"
              content="Tìm kiếm"
              onClick={handleSearch}
              icon={<GoSearch size={20} className="mr-1" />}
            ></PrimaryButton>
          </div>
        </div>
        <div className="p-4 rounded-lg border border-gray-300 bg-white">
          <div className="overflow-x-scroll bg-white">
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
          <Pagination
            className="mt-3"
            total={totalPage}
            showSizeChanger={true}
            pageSizeOptions={[1, 10, 20, 50, 100]}
            onChange={(page, pageSize) => {
              setPageIndex(page !== 0 ? page : 1);
              setPageSize(pageSize);
            }}
            current={pageIndex}
          />
          <Modal
            title={<div>{`Bạn muốn xóa nhiệm vụ ?`}</div>}
            open={isModalOpen}
            onOk={handleOk}
            okText="Có"
            onCancel={handleCancel}
            cancelText="Không"
          ></Modal>
        </div>
      </div>
    </div>
  );
};

export default ManageGoogle;
