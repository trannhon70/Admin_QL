import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { Breadcrumb, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import ListNewsTable from "./components/ListNewsTable";
import { sectorAction } from "redux/sector/sector.slice";
import { newsAction } from "redux/news/news.slice";
import { NewsStatus } from "common/constant";

function NewsManager() {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const sectors = useSelector((state: any) => state.sector.sectors) || [];

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [search, setSearch] = useState("");
    const [sectorsFilter, setSectorsFilter] = useState([]);
    const [statusFilter, setStatusFilter] = useState([]);

    const handleSearch = () => {
        dispatch(
            newsAction.getListNews({
                page: pageIndex,
                limit: pageSize,
                search,
                sectors: sectorsFilter,
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
        dispatch(newsAction.getListNews({ page: pageIndex, limit: pageSize }));
    }, [pageIndex, pageSize]);

    return (
        <div className="p-4">
            <div className="mb-4">
                <Breadcrumb
                    items={[
                        { title: "Quản lý bài viết" },
                        { title: "Bài viết" },
                    ]}
                ></Breadcrumb>
            </div>
            <div className="mb-4">
                <h3 className="font-semibold mb-4">Bài viết</h3>

                <div className="hidden lg:flex justify-end mb-3">
                    <PrimaryButton
                        className="!py-1.5 px-5"
                        background="bg-green-500"
                        content="Xuất Excel"
                        icon={<IoAddCircleOutline size={20} className="mr-1" />}
                    ></PrimaryButton>
                </div>

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
                        <Select
                            id="sector-select"
                            mode="multiple"
                            allowClear
                            placeholder="Chọn danh mục"
                            className="sm:w-1/3 w-full [&>div]:!py-1 [&>div>div]:!flex-nowrap [&>div>div]:!overflow-hidden"
                            options={sectors?.map((sector: any) => ({
                                value: sector._id,
                                label: sector.sectorName,
                            }))}
                            onChange={(values) => {
                                setSectorsFilter(values);
                            }}
                        />
                        <Select
                            id="select-status"
                            mode="multiple"
                            allowClear
                            placeholder="Trạng thái"
                            className="sm:w-1/3 w-full [&>div]:!py-1 [&>div>div]:!flex-nowrap [&>div>div]:!overflow-hidden"
                            options={NewsStatus}
                            onChange={(values) => {
                                setStatusFilter(values);
                            }}
                        />
                    </div>

                    <div className="col-span-12 lg:col-span-5 flex flex-wrap sm:flex-nowrap justify-between gap-2">
                        <PrimaryButton
                            className="lg:hidden flex w-full sm:w-1/3 lg:w-auto !py-1.5 px-5"
                            background="bg-green-500"
                            content="Xuất Excel"
                            icon={
                                <IoAddCircleOutline
                                    size={20}
                                    className="mr-1"
                                />
                            }
                        ></PrimaryButton>

                        <PrimaryButton
                            className="w-full sm:w-1/3 lg:w-max !py-1.5 px-5"
                            content="Tìm kiếm"
                            onClick={handleSearch}
                            icon={<GoSearch size={20} className="mr-1" />}
                        ></PrimaryButton>

                        <PrimaryButton
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
                        ></PrimaryButton>
                    </div>
                </div>
            </div>
            <ListNewsTable
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                pageSize={pageSize}
                setPageSize={setPageSize}
                handleSearch={handleSearch}
            />
        </div>
    );
}
export default NewsManager;
