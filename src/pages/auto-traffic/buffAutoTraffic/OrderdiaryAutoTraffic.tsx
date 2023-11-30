import React, { useState } from "react";
import { Modal, Pagination, Select, Switch, Table, Tooltip, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { GoSearch } from "react-icons/go";
import { FaPause, FaPlay } from "react-icons/fa";
import { GiOnTarget } from "react-icons/gi";
import { MdAttachMoney, MdRunningWithErrors } from "react-icons/md";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import AutoTraffficViewModal from "./components/AutoTraffficViewModal";
import { autoTrafficAPI } from "api/auto-trafic.api";
import { colorStatusCode, statusCode, statusString } from "./dataFake";
import ConfirmModal from "components/ui/modal/ConfirmModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FormatNumberVND } from "../../../util";import { AiFillCopy } from "react-icons/ai";
;

interface TagsList {
  id:number,
  number:number,
  content:string,
  icon: any,
  color:string
}

interface ListBD {
  countPause:number,
  countPlay: number,
  countRuning: [
    {
      _id:null,
      quantity: number
    }
  ],
  countTarget: [
    {
      _id:null,
      originQuantity: number
    }
  ],
  userMoney: number
}

const initListBD:ListBD = {
  countPause: 0,
  countPlay: 0,
  countRuning: [
    {
      _id:null,
      quantity: 0
    }
  ],
  countTarget: [
    {
      _id:null,
      originQuantity: 0
    }
  ],
  userMoney: 0
}

const ComponentOrderdiaryGoogleSearch = () => {
  const userInfo = useSelector((state: any) => state.user.currentUser);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [isSwitchChange, setIsSwitchChange] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<number[]>([]);
  const [ListBD, setListDB] = useState<ListBD>(initListBD);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const tagsList:Array<TagsList> = [
    {
      id:0,
      number: ListBD?.countPlay,
      content:"Tổng các nhiệm vụ đang chạy",
      icon:<FaPlay className="text-7xl text-[rgba(0,0,0,.15)] absolute bottom-2 right-2"/>,
      color:"bg-[#00c0ef]"
    },
    {
      id:1,
      number: ListBD?.countPause,
      content:"Tổng các nhiệm vụ đang tạm dừng",
      icon:<FaPause className="text-7xl text-[rgba(0,0,0,.15)] absolute bottom-2 right-2"/>,
      color:"bg-[#f012be]"
    },
    {
      id:2,
      number: ListBD?.countTarget[0].originQuantity,
      content:"Tổng số traffic mục tiêu",
      icon:<GiOnTarget className="text-7xl text-[rgba(0,0,0,.15)] absolute bottom-2 right-2"/>,
      color:"bg-[#0073b7]"
    },
    {
      id:3,
      number: ListBD?.countRuning[0].quantity,
      content:"Tổng số traffic đã chạy",
      icon:<MdRunningWithErrors className="text-7xl text-[rgba(0,0,0,.15)] absolute bottom-2 right-2"/>,
      color:"bg-[#f39c12]"
    },
    {
      id:4,
      number: FormatNumberVND(ListBD?.userMoney),
      content:"Số tiền còn lại trong tài khoản",
      icon:<MdAttachMoney className="text-7xl text-[rgba(0,0,0,.15)] absolute bottom-2 right-2"/>,
      color:"bg-[#00a65a]"
    }
  ]

  const getStatus = (status:number) => {
    switch (status) {
        case status:
          return (
            <div className="text-center">
               <span className={`${colorStatusCode[status]} text-white rounded-lg text-center py-1 px-2`}>
                {statusCode[status]}
               </span>
             </div>
          ) 
    }
  } 

  const handleChangeType = () => {
    setIsSwitchChange(!isSwitchChange)
  }

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "name",
      key: "name",
      width: 70,
      align: "center",
      render: (text, record, index) => index + 1,
    },
  
    {
      title: "Nhiệm vụ",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Tên miền",
      dataIndex: "domain",
      key: "domain",
      width: 200,
      ellipsis: true
    },
    {
      title: "Từ khóa",
      dataIndex: "keyword",
      key: "keyword",
      width: 120,
      ellipsis: true
    },
    {
      title: "Traffic mục tiêu",
      dataIndex: "originQuantity",
      key: "originQuantity",
      width: 100,
      align: "center",
      render: (text, record, index) => text,
      sorter: (a, b) => a.originQuantity - b.originQuantity,
    },
    {
      title: "Gói Onsite",
      dataIndex: "package",
      key: "package",
      align: "center",
      width: 80,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 150,
      render: (value) => {
        return getStatus(value)
      },
    },
    {
      title: <div className="flex">
        <div>Traffic đã làm</div>
        <Tooltip title={`${isSwitchChange ? "phần trăm" : "kiểu số"}`}>
          <Switch size="small" className="ml-2 my-auto hello" onChange={handleChangeType}/>
        </Tooltip>
      </div>,
      key: "quantity",
      dataIndex: "quantity",
      align: "center",
      width: 120,
      render: (value, record) => {
        return(
            isSwitchChange ? 
            <div>{(100-value*100/record.originQuantity).toFixed(2)}%</div> :
            <div>{record.originQuantity-value}</div>
        )
      }
    },
    {
      title: "Ngày tạo",
      key: "createdAt",
      dataIndex: "createdAt",
      width: 110,
      align: "center",
      render: (value) => moment(value).format("DD/MM/YYYY"),
    },
    {
      title: "Thời gian bắt đầu",
      key: "startDate",
      dataIndex: "startDate",
      width: 110,
      align: "center",
      render: (value) => moment(value).format("DD/MM/YYYY"),
    },
    {
      title: "Thời gian kết thúc",
      key: "endDate",
      dataIndex: "endDate",
      width: 110,
      align: "center",
      render: (value) => moment(value).format("DD/MM/YYYY"),
    },
    {
      title: "Hành động",
      key: "script",
      dataIndex: "script",
      width: 140,
      align: "center",
      render: (value, record, index) => {
        return (
          <div className="flex">
            <div className="text-xl cursor-pointer my-auto mx-auto">
              {
                  record?.status === 0 ?
                  <></> :
                  (
                    record?.status === 1 || record?.status === 3 ?
                    <Tooltip title={"cho chạy nhiệm vụ"}>
                      <FaPlay 
                        className="text-[#00a307] mx-auto" 
                        onClick={() => handlePlayMission(record._id)}/>
                    </Tooltip> :
                     (
                      record?.status === 2 ? 
                        <Tooltip title={"tạm dừng"}>
                          <FaPause 
                            className="text-red-500 mx-auto"
                            onClick={() => handlePauseMission(record._id)}/>
                        </Tooltip> :
                        <></>
                     )
                  )
              }
            </div>
            <AutoTraffficViewModal info={record} userInfo={userInfo}/>
            <ConfirmModal
                buttonStyle=""
                buttonIcon={
                  <Tooltip title="xóa nhiệm vụ">
                      <RiDeleteBin6Line size={24} className="text-sky-500 m-auto" />
                  </Tooltip>
                }
                title="Xóa nhiệm vụ traffic!"
                description={`Nhiệm vụ: '${record?.name}' sẽ bị xóa vĩnh viễn`}
                handleSubmit={async () => {
                  const result = await autoTrafficAPI.deleteOneMissionTraffic(record?._id);
                  if(result.status === 200) message.success("Xóa nhiệm vụ thành công!");
                  if(result.status === 500) message.error("Xóa nhiệm vụ thất bại!");
                  getPagingUserTasks();
                }}
            ></ConfirmModal>
            <Tooltip title="sao chép đoạn script">
              <AiFillCopy 
                className="my-auto text-sky-500 m-auto cursor-pointer" 
                size={24}
                onClick={() => handleCopyScript(record?.script, record?.domain)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handlePlayMission = async(id:any) => {
    const result = await autoTrafficAPI.runMissionTraffic(id);
    if (result.status === 200){
      message.success('nhiệm vụ đã được kích hoạt')
      getPagingUserTasks();
    }
    if (result.status === 500){
      message.error('nhiệm vụ chưa thể chạy!')
    }
  }

  const handlePauseMission = async(id:any) => {
    const result = await autoTrafficAPI.pauseMissionTraffic(id);
    if (result.status === 200){
      message.success('nhiệm vụ đã được tạm dừng')
      getPagingUserTasks();
    }
    if (result.status === 500){
      message.error('nhiệm vụ chưa thể tạm dừng')
    }
  }

  const getPagingUserTasks = async () => {
    const query = {
      pageIndex,
      pageSize,
      search,
      statusFilter
    };

    const result: any = await autoTrafficAPI.getPaggingMissionTrafficByUser(query);

    setTotalPage(result?.result?.totalDoc);
    setData(result?.result?.data);
    getMissionRun();
  };

  useEffect(() => {
    getPagingUserTasks();
  }, [pageIndex, pageSize]);

  const handleSearch = () => {
    getPagingUserTasks();
  };

  const onSelectChange = (selectedRowKeys : any, selectedRows:any) => {
    const arrId:Array<string> = [];
    selectedRows.map((row:any) => {
        arrId.push(row?._id)
    });
    setSelectedId([...arrId]);
    setSelectedRowKeys(selectedRowKeys);
};

const handleDeleteManyMission = async() => {
  setIsModalOpen(true);
}

const getMissionRun = async() => {
 const result:any = await autoTrafficAPI.getInfoTagsList();
 setListDB(result.result)
}

const handleCopyScript = (script:string, domain:string) => {
  navigator.clipboard.writeText(`${script}`);
  message.success(
    `Bạn đã copy đoạn script của trang ${domain} thành công!`
  );
}

const handleCancel = () => {
  setIsModalOpen(false);
};

const handleOk = async () => {
  setIsModalOpen(false);
  try {
    const objSend = {
      selectedId
    }
    const result = await autoTrafficAPI.deleteManyMissionTraffic(objSend);
    if (result.status === 200) {
      message.success('Xóa thành công!');
      getPagingUserTasks();
      setSelectedId([]);
      setSelectedRowKeys([]);
    }
    if (result.status === 500 || result.status === 502) {
      message.success('Không thể xóa nhiệm vụ!');
    }
  } catch (error) {
    console.log('error', error)
  }
};

  return (
    <div className="mt-3">
      <div>
        <div className="lg:flex flex-wrap md:block block gap-3 my-5 w-full">
          {
            tagsList.map((item:any, index:number) => (
              <div 
                className={`${item.color} lg:w-[24%] md:w-full w-full lg:my-0 md:my-3 my-3 text-white rounded-lg p-5 relative`}
                key={index}
              >
                <div className="lg:text-5xl md:text-4xl text-3xl font-bold break-words">{item.number}</div>
                <div className="lg:text-base md:text-base text-sm font-semibold">{item.content}</div>
                {item.icon}
              </div>
            ))
          }
        </div>
      </div>
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
              className="w-full md:w-1/3 lg:w-1/4 [&>div]:!h-9 [&>div]:!py-1"
              options={statusString}
              onChange={(values) => {
                setStatusFilter(values);
              }}
              mode="multiple"
              maxTagCount={1}
            />

          <PrimaryButton
            className="w-full sm:w-1/3 lg:w-max !py-1.5 px-5"
            content="Tìm kiếm"
            onClick={handleSearch}
            icon={<GoSearch size={20} className="mr-1" />}
          ></PrimaryButton>
        </div>
      </div>
      <div className="overflow-x-scroll bg-white">
        <Table
          columns={columns}
          dataSource={data.map((item: any, index: number) => ({
            ...item,
            key: index,
          }))}
          pagination={false}
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
        }}
        />
      </div>
      <Pagination
        className="mt-3 float-right"
        current={pageIndex}
        total={totalPage}
        showSizeChanger={true}
        pageSizeOptions={[1, 10, 20, 50, 100]}
        onChange={(page, pageSize) => {
          setPageIndex(page !== 0 ? page : 1);
          setPageSize(pageSize);
        }}
      />
      <div>
        {
          selectedId.length !== 0 ?
          <PrimaryButton
            className="w-full sm:w-1/3 lg:w-max !py-1.5 px-5 mt-3"
            content="Xóa các mục đã chọn"
            onClick={handleDeleteManyMission}
            icon={<RiDeleteBin6Line size={20} className="mr-1" />}
          ></PrimaryButton> :
          <></>
        }
      </div>
      <Modal
            open={isModalOpen}
            onOk={handleOk}
            title="Bạn muốn xóa các nhiệm vụ đã chọn?"
            okText="Có"
            onCancel={handleCancel}
            cancelText="Không"
        >
            <p>{`Các nhiệm vụ này sẽ bị xóa vĩnh viễn!`}</p>
        </Modal>
    </div>
  );
};

export default ComponentOrderdiaryGoogleSearch;
