import { Breadcrumb, Modal, Pagination, Popover, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  checkFacebookComment,
  checkGoogleMapRating,
  checkYoutubeComment,
  createPaymentUserGoogleMap,
  deletegooglemapErrors,
  getPagingReviewGoogleMap,
} from "api/task.api";
import ModelsuccessPay from "components/manage/ModelSuccessPay";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FormatNumberVND, renderStatus } from "../../../util";

const ManageCommentYoutube = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [chooseTask, setChooseTask] = useState<any>();
  const [checkFollow, setCheckFollow] = useState<any>(null);
  const [body, setBody] = useState<any>({});
  const [modalPay, setModalPay] = useState<boolean>(false);
  const handleOkPay = () => {
    setModalPay(false);
  };

  const handleCancelPay = () => {
    setModalPay(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setCheckFollow(null);
    setIsModalOpen(false);
  };

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên người dùng",
      dataIndex: "customerId",
      key: "customerId",
      render: (value) => (value.fullName ? value.fullName : value.userName),
    },
    {
      title: "URL google map",
      key: "link",
      dataIndex: "link",
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
      render: (value) => FormatNumberVND(value),
      sorter: (a, b) => a.money - b.money,
    },
    {
      title: "Nội dung bình luận",
      key: "comment",
      dataIndex: "comment",
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
        } else {
          return (
            <div className="text-center">
              <span className="bg-red-500 text-white rounded-lg text-center py-1 px-2">
                Chưa hoàn thành
              </span>
            </div>
          );
        }
      },
    },
    {
      title: "Ngày tạo",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (value) => moment(value).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày thanh toán",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (value) => moment(value).add(7, "days").format("DD/MM/YYYY"),
    },
    {
      title: "Hoạt động",
      key: "",
      dataIndex: "",
      render: (value, record) => {
        return (
          <div className="flex">
            {(() => {
              if (record.status === "") {
                return (
                  <div className="flex">
                    <AiFillEye
                      onClick={() => checkYoutubeComments(record)}
                      className="cursor-pointer"
                      size={20}
                    />
                    <AiFillDelete
                      onClick={() => {
                        deletegooglemapError(record);
                      }}
                      className="cursor-pointer ml-2"
                      size={20}
                    />
                  </div>
                );
              }
              if (record.status === "approved") {
                return (
                  <div>
                    <AiFillEye
                      onClick={() => setModalPay(true)}
                      className="cursor-pointer"
                      size={20}
                    />
                  </div>
                );
              }
              if (record.status === "pending") {
                return (
                  <div className="flex">
                    <AiFillEye
                      onClick={() => checkYoutubeComments(record)}
                      className="cursor-pointer"
                      size={20}
                    />
                  </div>
                );
              }
            })()}
          </div>
        );
      },
    },
  ];

  const deletegooglemapError = async (data: any) => {
    const result: any = await deletegooglemapErrors(data?._id);
    if (result.uniqueCode === 1) {
      getPagingReviewGoogleMaps();
      message.success("Xóa thành công");
    }
    setIsModalDeleteOpen(true);
    setChooseTask(data);
  };

  const getPagingReviewGoogleMaps = async () => {
    const query = {
      type: "64c08592c2213f0eec1c6458",
      search: search,
      pageIndex: pageIndex,
      pageSize: pageSize,
      typeTask: 2,
    };
    const result: any = await getPagingReviewGoogleMap(query);

    const newResult = result?.data.map((element: any, index: number) => {
      return {
        key: index,
        ...element,
      };
    });
    setData(newResult);
    setTotalPage(result?.counts);
  };

  useEffect(() => {
    getPagingReviewGoogleMaps();
  }, [pageSize, pageIndex]);

  const handleSearch = () => {
    getPagingReviewGoogleMaps();
  };

  const checkYoutubeComments = async (data: any) => {
    setIsModalOpen(true);
    const body = {
      urlVideo: data?.task?.link,
      comment: data.comment,
    };
    const result = await checkYoutubeComment(body);

    setCheckFollow(result);
    setBody({
      ...data,
    });
  };

  const onClickPayAccount = async () => {
    const dataRef = {
      socialMedia: body.socialMediaPlatform,
      customerId: body.customerId?._id,
      taskId: body.task?._id,
      workerId: body?._id,
    };
    const result: any = await createPaymentUserGoogleMap(dataRef);
    if (result.statusCode === 1) {
      message.success("Thanh toán thành công!");
      handleCancel();
      getPagingReviewGoogleMaps();
    }
  };

  const handleDeleteOk = async () => {
    setIsModalDeleteOpen(false);
    const result: any = await deletegooglemapErrors(chooseTask?._id);
    if (result.uniqueCode === 1) {
      message.success("Xóa nhiệm vụ thành công!");
      getPagingReviewGoogleMaps();
    }
    if (result.uniqueCode === 2) {
      message.success("Xóa nhiệm vụ thất bại!");
      getPagingReviewGoogleMaps();
    }
  };

  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };
  return (
    <div className="p-4" id="manage">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { title: "Quản lý nhiệm vụ review google map" },
            { title: "Nhiệm vụ review google map" },
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
            <Table columns={columns} dataSource={data} pagination={false} />
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
        title="Bảng thông tin tài khoản đã bình luận hay chưa"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        bodyStyle={{ height: "400px" }}
      >
        {checkFollow !== null ? (
          checkFollow?.comment ? (
            <div>
              <div className="block text-center text-2xl text-lime-700 font-bold h-80">
                <div className="block h-16 m-5">
                  {" "}
                  Tài khoản này đã thực hiện bình luận
                </div>
                <div className="flex justify-center ">
                  <BsCheckCircleFill size={70} />{" "}
                </div>
              </div>
              <div className="flex items-center justify-end">
                <button
                  onClick={onClickPayAccount}
                  className="w-auto py-2 px-5 bg-green-600 rounded-lg mr-4 text-white text-lg hover:bg-green-700"
                >
                  Thanh toán
                </button>
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
                  Tài khoản này chưa thực hiện bình luận
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
      <Modal
        title={<div>{`Bạn muốn xóa nhiệm vụ ?`}</div>}
        open={isModalDeleteOpen}
        onOk={handleDeleteOk}
        okText="Có"
        onCancel={handleDeleteCancel}
        cancelText="Không"
      ></Modal>
      <ModelsuccessPay
        isModel={modalPay}
        handleOk={handleOkPay}
        handleCancel={handleCancelPay}
      />
    </div>
  );
};

export default ManageCommentYoutube;
