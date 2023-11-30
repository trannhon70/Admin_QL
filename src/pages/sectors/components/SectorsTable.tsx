import { Table } from "antd";
import { format } from "date-fns";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import SectorModal from "./SectorModal";
import PaginationCustom from "components/ui/pagination/PaginationCustom";
import ConfirmModal from "components/ui/modal/ConfirmModal";
import { sectorAction } from "redux/sector/sector.slice";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";

type PropsType = {
    pageIndex: number;
    setPageIndex: Function;
    pageSize: number;
    setPageSize: Function;
    handleSearch: Function;
};
function SectorsTable({
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    handleSearch,
}: PropsType) {
    const columns: any = [
        {
            title: "STT",
            dataIndex: "index",
            sorter: (a: any, b: any) => a.index - b.index,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Tên",
            dataIndex: "sectorName",
        },
        {
            title: "Icon",
            dataIndex: "icon",
        },
        {
            title: "Ngày tạo",
            sorter: (a: any, b: any) => {
                return (
                    new Date(a.createdDate).getTime() -
                    new Date(b.createdDate).getTime()
                );
            },
            dataIndex: "createdDate",
        },
        {
            title: "Hoạt động",
            dataIndex: "action",
            width: "120px",
        },
    ];

    const dispatch = useDispatch<any>();

    const sectors = useSelector((state: any) => state.sector.listSectors) || [];
    const isLoading = useSelector((state: any) => state.sector.isLoading);

    const handleChangePageIndex = (_page = 1) => {
        setPageIndex(_page);
    };
    const handleChangePageSize = (_pageSize = 5) => {
        setPageSize(_pageSize);
    };

    const listSectors = sectors?.items?.map((item: any, id: number) => {
        return {
           index: id + 1,
           key: id,
           sectorName: <p className="line-clamp-2">{item.sectorName}</p>,
           icon: (
              <div className="relative h-10 w-10 aspect-video">
                 <img src={item.icon} alt="thumbnail.png" className="absolute object-cover h-full w-full"></img>
              </div>
           ),
           createdDate: (
              <p className="line-clamp-2">
                 {item.createdDate ? format(new Date(item.createdDate), "dd-MM-yyyy") : "-"}
              </p>
           ),
           action: (
              <div className="flex">
                 <SectorModal title="Chỉnh sửa danh mục" refreshData={handleSearch} sector={item}></SectorModal>

                 <ConfirmModal
                    buttonStyle=""
                    buttonIcon={<RiDeleteBin6Line size={24} className="text-gray-400" />}
                    title="Delete!"
                    description={`Danh mục: ${item.sectorName} sẽ bị xóa vĩnh viễn`}
                    handleSubmit={async () => {
                       await dispatch(sectorAction.deleteOne(item._id));
                       handleSearch();
                    }}
                 ></ConfirmModal>
              </div>
           ),
        };
    });

    if (isLoading) return <SimpleSpiner isLoading={isLoading} />;

    return (
        <div className="p-4 rounded-lg border border-gray-300 bg-white">
            <div className="overflow-x-scroll bg-white">
                <Table
                    columns={columns}
                    dataSource={listSectors}
                    pagination={false}
                />
            </div>
            <PaginationCustom
                list={sectors?.count || 0}
                pageIndex={pageIndex}
                pageSize={pageSize}
                setPageSize={(_pageSize: number) =>
                    handleChangePageSize(_pageSize)
                }
                setPageIndex={(_page: number) => handleChangePageIndex(_page)}
            ></PaginationCustom>
        </div>
    );
}
export default SectorsTable;
