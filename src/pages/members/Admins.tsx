import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import { userAction } from "redux/user/user.slice";
import AdminsTable from "./components/AdminsTable";
import { ROLES } from "common/constant";

function Admins() {
    const dispatch = useDispatch<any>();

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        dispatch(
            userAction.getListAdmins({
                page: pageIndex,
                limit: pageSize,
                search,
                role: ROLES.ADMIN,
            })
        );
    };
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        dispatch(
            userAction.getListAdmins({
                page: pageIndex,
                limit: pageSize,
                role: ROLES.ADMIN,
            })
        );
    }, [pageIndex, pageSize]);

    return (
        <div className="p-4">
            <div className="mb-4">
                <Breadcrumb
                    items={[
                        { title: "Quản lý thành viên" },
                        { title: "Quản trị viên" },
                    ]}
                ></Breadcrumb>
            </div>
            <div className="mb-4">
                <h3 className="font-semibold mb-4">Quản trị viên</h3>

                <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2 mb-3">
                    <div className="flex sm:flex-nowrap gap-2 sm:w-96 w-full">
                        <div className="flex w-full rounded-md border border-gray-300 bg-white items-center py-1.5">
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
                        <PrimaryButton
                            className="!py-1.5 px-5"
                            content="Tìm kiếm"
                            onClick={handleSearch}
                        ></PrimaryButton>
                    </div>

                    <div className="w-full sm:w-max">
                        <Link to="/quan-ly-thanh-vien/them-thanh-vien">
                            <PrimaryButton
                                className="w-full !py-1.5 px-5"
                                content="Thêm mới"
                                icon={
                                    <IoAddCircleOutline
                                        size={20}
                                        className="mr-1"
                                    />
                                }
                            ></PrimaryButton>
                        </Link>
                    </div>
                </div>
            </div>
            <AdminsTable
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                pageSize={pageSize}
                setPageSize={setPageSize}
                handleSearch={handleSearch}
            />
        </div>
    );
}
export default Admins;
