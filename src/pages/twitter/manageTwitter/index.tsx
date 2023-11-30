import { Breadcrumb, Modal, Pagination, Select, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  checkChannelFollowedDoneTwitter,
  createPaymentUserYoutube,
  getAllTask,
  getPagingTaskById,
} from "api/task.api";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { IoCloseCircleSharp } from "react-icons/io5";
import { OptionStatus, renderStatus } from "../../../util";
import ModelsuccessPay from "components/manage/ModelSuccessPay";

const ManageTwitter = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [task, setTask] = useState<any>([]);
  const [taskFilter, setTaskFilter] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkFollow, setCheckFollow] = useState<any>(null);
  const [body, setBody] = useState<any>({});
  const [modalPay, setModalPay] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setCheckFollow(null);
    setIsModalOpen(false);
  };

  const handleOkPay = () => {
    setModalPay(false);
  };

  const handleCancelPay = () => {
    setModalPay(false);
  };

  const handleSearch = () => {
    getPagingTaskByIds();
  };

  const getPagingTaskByIds = async () => {
    const query = {
      id: taskFilter,
      search: search,
      pageIndex: pageIndex,
      pageSize: pageSize,
      status: status ? status : "",
    };
    const result: any = await getPagingTaskById(query);
    setData(result.data);
    setTotalPage(result.counts);
  };

  useEffect(() => {
    if (taskFilter) {
      getPagingTaskByIds();
    }
  }, [taskFilter, pageIndex, pageSize]);

  const getAllTasks = async () => {
    const query = {
      type: "64daf65e41fe3afae6825872",
    };
    const result = await getAllTask(query);
    setTask(result.data);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "title",
      key: "title",
      render: (value) => value,
    },
    // {
    //   title: "Tên người dùng",
    //   dataIndex: "customUrl",
    //   key: "customUrl",
    //   render: (value) => value,
    // },
    {
      title: "URL của kênh",
      key: "linkChannel",
      dataIndex: "linkChannel",
    },
    {
      title: "Kênh",
      key: "channel",
      dataIndex: "channel",
      render: (value) => value,
    },
    {
      title: "Tình trạng",
      key: "status",
      dataIndex: "status",
      render: (value) => {
        if (value === "approved") {
          return (
            <div className="text-center">
              <span className="bg-green-500 text-white rounded-lg text-center py-1 px-2">
                {renderStatus(value)}
              </span>
            </div>
          );
        }
        if (value === "pending") {
          return (
            <div className="text-center">
              <span className="bg-orange-500 text-white rounded-lg text-center py-1 px-2">
                {renderStatus(value)}
              </span>
            </div>
          );
        }
        if (value === "newRedo") {
          return (
            <div className="text-center">
              <span className="bg-yellow-500 text-white rounded-lg text-center py-1 px-2">
                {renderStatus(value)}
              </span>
            </div>
          );
        }
        if (value === "error") {
          return (
            <div className="text-center">
              <span className="bg-red-500 text-white rounded-lg text-center py-1 px-2">
                {renderStatus(value)}
              </span>
            </div>
          );
        }
      },
    },
    {
      title: "Ngày thực hiện",
      key: "duration",
      dataIndex: "duration",
      render: (value) => moment(value).format("DD/MM/YYYY"),
      sorter: (a: any, b: any) => a.duration - b.duration,
    },
    {
      title: "Ngày thanh toán",
      key: "duration",
      dataIndex: "duration",
      render: (value) => moment(value).add(7, "days").format("DD/MM/YYYY"),
      sorter: (a: any, b: any) => a.duration - b.duration,
    },
    {
      title: "Hoạt động",
      key: "",
      dataIndex: "",
      render: (value, record) => {
        if (record.status === "approved") {
          return (
            <div>
              <AiFillEye
                onClick={() => setModalPay(true)}
                className="cursor-pointer"
                size={20}
              />
              {/* <AiFillEye
                onClick={() => handleCheck(record)}
                className="cursor-pointer"
                size={20}
              /> */}
            </div>
          );
        }
        if (record.status === "pending") {
          return (
            <div>
              <AiFillEye
                onClick={() => handleCheck(record)}
                className="cursor-pointer"
                size={20}
              />
            </div>
          );
        }
      },
    },
  ];

  const handleCheck = async (e: any) => {
    setIsModalOpen(true);
    const body = {
      ...e,
      taskId: taskFilter,
    };

    const result: any = await checkChannelFollowedDoneTwitter(body);
    setCheckFollow(result.userInfo?.completeList);
    setBody(body);
  };

  const onClickPayAccount = async () => {
    const result: any = await createPaymentUserYoutube(body);
    if (result.statusCode === 1) {
      message.success("Thanh toán thành công!");
      handleCancel();
      getPagingTaskByIds();
    }
  };

  return (
    <div className="p-4" id="manage">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { title: "Quản lý nhiệm vụ twitter" },
            { title: "Nhiệm vụ twitter" },
          ]}
        ></Breadcrumb>
      </div>
      <div className="mb-4">
        <div className="grid grid-cols-12 gap-x-2 gap-y-3 mb-3">
          <div className="col-span-12 lg:col-span-7 flex sm:flex-nowrap flex-wrap gap-2">
            <Select
              id="sector-select"
              style={{ height: "40px" }}
              allowClear
              placeholder="Chọn nhiệm vụ"
              className="sm:w-1/3 w-full [&>div]:!py-1 [&>div>div]:!flex-nowrap [&>div>div]:!overflow-hidden "
              options={task?.map((task: any) => ({
                value: task._id,
                label: task.link,
              }))}
              onChange={(values) => {
                setTaskFilter(values);
              }}
            />
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
              id="sector-select"
              style={{ height: "40px" }}
              allowClear
              placeholder="Chọn nhiệm vụ"
              className="sm:w-1/3 w-full [&>div]:!py-1 [&>div>div]:!flex-nowrap [&>div>div]:!overflow-hidden "
              options={OptionStatus}
              onChange={(values) => {
                setStatus(values);
              }}
            />

            <PrimaryButton
              className="w-full sm:w-1/3 lg:w-max !py-1.5 px-5"
              content="Tìm kiếm"
              onClick={handleSearch}
              icon={<GoSearch size={20} className="mr-1" />}
            ></PrimaryButton>
          </div>
        </div>
        <div className="p-4 rounded-lg border border-gray-300 bg-white">
          <div className="overflow-x-scroll bg-white">
            <Table
              columns={columns}
              dataSource={data.map((item: any, index: number) => ({
                ...item,
                key: index,
              }))}
              pagination={false}
            />
          </div>
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
      </div>
      <Modal
        title="Bảng thông tin tài khoản đã followed hay chưa"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        bodyStyle={{ height: "400px" }}
      >
        {checkFollow !== null ? (
          checkFollow?.length > 0 ? (
            <div>
              <div className="block text-center text-2xl text-lime-700 font-bold h-80">
                {body.status !== "pending" ? (
                  "Nhiệm vụ đã được thanh toán"
                ) : (
                  <>
                    <div className="block h-16 m-5">
                      {" "}
                      Tài khoản này đã thực hiện follow
                    </div>
                    <div className="flex justify-center ">
                      <BsCheckCircleFill size={70} />{" "}
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center justify-end">
                {body.status !== "pending" ? (
                  ""
                ) : (
                  <button
                    onClick={onClickPayAccount}
                    className="w-auto py-2 px-5 bg-green-600 rounded-lg mr-4 text-white text-lg hover:bg-green-700"
                  >
                    Thanh toán
                  </button>
                )}

                <button
                  onClick={handleCancel}
                  className="w-auto py-2 px-5 bg-red-600 rounded-lg mr-4 text-white text-lg hover:bg-red-700"
                >
                  Thoát
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="block text-center text-2xl text-red-700 font-bold h-80">
                <div className="block h-16 m-5">
                  {" "}
                  Tài khoản này chưa thực hiện follow
                </div>
                <div className="flex justify-center ">
                  <IoCloseCircleSharp size={70} />{" "}
                </div>
              </div>
              <div className="flex items-center justify-end">
                <button
                  onClick={handleCancel}
                  className="w-auto py-2 px-5 bg-red-600 rounded-lg mr-4 text-white text-lg hover:bg-red-700"
                >
                  Thoát
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-full">
            <img className="w-[200px] h-[200px]" src="/source.gif" alt="" />
          </div>
        )}
      </Modal>
      <ModelsuccessPay
        isModel={modalPay}
        handleOk={handleOkPay}
        handleCancel={handleCancelPay}
      />
    </div>
  );
};

export default ManageTwitter;
