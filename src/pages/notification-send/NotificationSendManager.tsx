import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { Breadcrumb, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import ListNewsTable from "./components/ListNotificationSendTable";
import { notifiAction } from "redux/notification/notification.slice";
import { NotificationStatusType, NotificationType } from "common/constant";
import { userAction } from "redux/user/user.slice";

function NotificationSendManager() {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const listUser = useSelector((state: any) => state.user.listUsersSelect) || [];

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [search, setSearch] = useState("");
    const [typeSendFilter, setTypeSendFilter] = useState([]);
    const [userIdFilter, setUserIdFilter] = useState([]);
    const [statusTypeFilter, setStatusTypeFilter] = useState([]);

    const handleSearch = () => {
        dispatch(
            notifiAction.getListNotificationCDS({
                pageIndex,
                pageSize,
                search,
                typeSendFilter,
                userIdFilter,
                statusTypeFilter,
            })
        );
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        handleSearch()
    }, [pageIndex, pageSize]);

    useEffect(() => {
        dispatch(userAction.getListSelect());
    }, []);

    return (
        <div className="p-4">
            <div className="mb-4">
                <Breadcrumb
                    items={[
                        { title: "Quản lý thông báo" },
                        { title: "Thông báo cho người dùng congdongseo" },
                    ]}
                ></Breadcrumb>
            </div>
            <div className="mb-4">
                <h3 className="font-semibold mb-4">Thông báo cho người dùng congdongseo</h3>

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
                        <Select
                            id="typeSend-select"
                            mode="multiple"
                            allowClear
                            placeholder="Hình thức gửi"
                            className="sm:w-1/3 w-full [&>div]:!py-1 [&>div>div]:!flex-nowrap [&>div>div]:!overflow-hidden"
                            options={NotificationType?.map((type: any) => ({
                                value: type.value,
                                label: type.label,
                            }))}
                            onChange={(values) => {
                                setTypeSendFilter(values);
                            }}
                            maxTagCount={1}
                        />
                        <Select
                            id="userId-select"
                            mode="multiple"
                            allowClear
                            placeholder="Gửi đến account"
                            className="sm:w-1/3 w-full [&>div]:!py-1 [&>div>div]:!flex-nowrap [&>div>div]:!overflow-hidden"
                            options={listUser?.map((user: any) => ({
                                value: user._id,
                                label: user.userName,
                            }))}
                            onChange={(values) => {
                                setUserIdFilter(values);
                            }}
                            maxTagCount={1}
                        />
                        <Select
                            id="statusType-status"
                            mode="multiple"
                            allowClear
                            placeholder="Trạng thái gửi"
                            className="sm:w-1/3 w-full [&>div]:!py-1 [&>div>div]:!flex-nowrap [&>div>div]:!overflow-hidden"
                            options={NotificationStatusType?.map((statusType: any) => ({
                                value: statusType.value,
                                label: statusType.label,
                            }))}
                            onChange={(values) => {
                                setStatusTypeFilter(values);
                            }}
                            maxTagCount={1}
                        />
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
                                navigate("/quan-ly-thong-bao/tao-thong-bao");
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
export default NotificationSendManager;
