import { Pagination } from "antd";

export default function PaginationCustom({
    list,
    pageIndex,
    pageSize,
    setPageSize,
    setPageIndex,
}: any) {
    const handleChange = (page: number, pageSize: number) => {
        setPageIndex(page || 1);
        setPageSize(pageSize || 5);
    };

    return (
        <div className="flex items-center justify-end border-t border-gray-200 py-5 lg:px-0 sm:px-6 px-4">
            <div className="flex items-center justify-between ">
                <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                    <Pagination
                        current={pageIndex}
                        pageSize={pageSize}
                        total={list}
                        showSizeChanger={true}
                        onChange={handleChange}
                        pageSizeOptions={[5, 10, 30, 50]}
                        defaultPageSize={5}
                    ></Pagination>
                </div>
            </div>
        </div>
    );
}
