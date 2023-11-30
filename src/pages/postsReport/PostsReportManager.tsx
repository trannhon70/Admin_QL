import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { Breadcrumb, Select } from "antd";
import { useDispatch } from "react-redux";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import { sectorAction } from "redux/sector/sector.slice";
import { ReportStatus } from "common/constant";
import { postsReportAction } from "redux/postsReport/postsReport.slice";
import ListReportPostsTable from "./components/ListReportPostsTable";
import { LOCAL_STORAGE } from "helper/storage.helper";

function PostsReportManager() {
    const dispatch = useDispatch<any>();

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState([]);
    const [userInfo, setUserInfo] = useState<any>();

    const handleSearch = () => {
        dispatch(
            postsReportAction.getListReportPosts({
                pageIndex: pageIndex,
                pageSize: pageSize,
                search,
                status: statusFilter,
            })
        );
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        dispatch(sectorAction.getAll({}));
    }, []);

    useEffect(() => {
        // dispatch(newsAction.getListNews({ page: pageIndex, limit: pageSize }));
        handleSearch()
    }, [pageIndex, pageSize]);

    useEffect(() => {
        const result = LOCAL_STORAGE.getCurrentUser();
        setUserInfo(result);
     }, []);

    return (
        <div className="p-4">
            <div className="mb-4">
                <Breadcrumb
                    items={[
                        { title: "Quản lý bài viết" },
                        { title: "Bài đăng trên diễn đàn" },
                    ]}
                ></Breadcrumb>
            </div>
            <div className="mb-4">
                <h3 className="font-semibold mb-4">Bài đăng trên diễn đàn</h3>

                {/* <div className="hidden lg:flex justify-end mb-3">
                    <PrimaryButton
                        className="!py-1.5 px-5"
                        background="bg-green-500"
                        content="Xuất Excel"
                        icon={<IoAddCircleOutline size={20} className="mr-1" />}
                    ></PrimaryButton>
                </div> */}

                <div className="grid grid-cols-12 gap-x-2 gap-y-3 mb-3">
                    <div className="col-span-12 lg:col-span-7 flex sm:flex-nowrap flex-wrap gap-2">
                        <div className="flex sm:w-1/3 w-full rounded-md border border-gray-300 bg-white items-center py-1.5">
                            <input
                                className="bg-white pl-3 w-full"
                                value={search}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setSearch(e.target.value)}
                                onKeyDown={handleEnter}
                            ></input>
                            <GoSearch size={20} className="mx-3" />
                        </div>
                        {/* <Select
                            id="sector-select"
                            mode="multiple"
                            allowClear
                            placeholder="Chọn lĩnh vực"
                            className="sm:w-1/3 w-full [&>div]:!py-1 [&>div>div]:!flex-nowrap [&>div>div]:!overflow-hidden"
                            options={sectors?.map((sector: any) => ({
                                value: sector._id,
                                label: sector.sectorName,
                            }))}
                            onChange={(values) => {
                                setSectorsFilter(values);
                            }}
                        /> */}
                        <Select
                            id="select-status"
                            mode="multiple"
                            allowClear
                            placeholder="Trạng thái"
                            className="sm:w-1/3 w-full [&>div]:!py-1 [&>div>div]:!flex-nowrap [&>div>div]:!overflow-hidden"
                            options={ReportStatus}
                            onChange={(values) => {
                                setStatusFilter(values);
                            }}
                        />
                        <PrimaryButton
                            className="w-full sm:w-1/3 lg:w-max md:w-[20%] !py-1.5 px-5"
                            content="Tìm kiếm"
                            onClick={handleSearch}
                            icon={<GoSearch size={20} className="mr-1" />}
                        ></PrimaryButton>
                    </div>

                    <div className="col-span-12 lg:col-span-5 flex flex-wrap sm:flex-nowrap justify-between gap-2">
                        {/* <PrimaryButton
                            className="lg:hidden flex w-full sm:w-1/3 lg:w-auto !py-1.5 px-5"
                            background="bg-green-500"
                            content="Xuất Excel"
                            icon={
                                <IoAddCircleOutline
                                    size={20}
                                    className="mr-1"
                                />
                            }
                        ></PrimaryButton> */}
                        {/* <PrimaryButton
                            className="w-full sm:w-1/3 lg:w-max !py-1.5 px-5"
                            content="Thêm mới"
                            onClick={() => {
                                navigate("/quan-ly-bai-viet/tao-bai-viet");
                            }}
                            icon={
                                <IoAddCircleOutline
                                    size={20}
                                    className="mr-1"
                                />
                            }
                        ></PrimaryButton> */}
                    </div>
                    {/* {
                        selectedId?.length !== 0 ?
                        <PrimaryButton
                            className="sm:w-1/3 lg:w-max md:w-max w-max !py-1.5 px-5"
                            content="Duyệt tất cả"
                            onClick={handleApproveAll}
                            icon={<BsCheck2All size={20} className="mr-1" />}
                        ></PrimaryButton> :
                        <></>
                    } */}
                </div>
            </div>
            <ListReportPostsTable
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                pageSize={pageSize}
                setPageSize={setPageSize}
                handleSearch={handleSearch}
                userInfo = {userInfo}
            />
        </div>
    );
}
export default PostsReportManager;

