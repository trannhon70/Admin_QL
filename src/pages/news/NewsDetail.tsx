import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsEye, BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";
import { RiDeleteBin6Line, RiArrowGoBackLine } from "react-icons/ri";
import { LuEdit2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Breadcrumb, Space, Spin } from "antd";

import { newsAction } from "redux/news/news.slice";
import ConfirmModal from "components/ui/modal/ConfirmModal";
import avatarDefault from "assets/images/avatar/default.jpg";

function NewsDetail() {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const news = useSelector((state: any) => state.news.currentNews) || {};
    const isLoading = useSelector((state: any) => state.news.isLoading);

    const { slug } = useParams();

    useEffect(() => {
        dispatch(newsAction.getOne(slug || ""));
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Space size="middle">
                    <Spin size="large"></Spin>
                </Space>
            </div>
        );
    }

    return (
        <div className="container mx-auto pt-4 px-5">
            <div className="mb-4">
                <Breadcrumb
                    items={[
                        { title: "Quản lý bài viết" },
                        { title: "Chi tiết bài viết" },
                    ]}
                ></Breadcrumb>
            </div>
            <div className="mb-6 flex justify-between">
                <h3 className="font-semibold">Bài viết</h3>
                <button
                    className="flex items-center border-b hover:border-gray-500 border-transparent"
                    onClick={() => navigate("/quan-ly-bai-viet")}
                >
                    <RiArrowGoBackLine size={20} className="me-1" />
                    <span>Quay Lại</span>
                </button>
            </div>

            <div className="border border-gray-300 rounded-md p-5">
                <div className="flex justify-end gap-2 mb-2">
                    <Link to={`/quan-ly-bai-viet/chinh-sua/${slug}`}>
                        <LuEdit2 size={20} className="mr-2 text-sky-500" />
                    </Link>
                    <ConfirmModal
                        buttonStyle=""
                        buttonIcon={
                            <RiDeleteBin6Line
                                size={20}
                                className="text-gray-400"
                            />
                        }
                        title="Delete News !"
                        description={`Bài viết: ${news?.title} sẽ bị xóa vĩnh viễn`}
                        handleSubmit={async () => {
                            await dispatch(newsAction.deleteNews(news?._id));
                            navigate("/quan-ly-bai-viet");
                        }}
                    ></ConfirmModal>
                </div>
                <div className="border-b border-gray-300 mb-1">
                    <h1 className="mb-2">{news?.title}</h1>

                    <div className="flex items-center text-gray-500 mb-3">
                        <p className="">
                            {news?.createdDate
                                ? format(
                                      new Date(news?.createdDate),
                                      "eeee, dd/MM/yyyy, HH:mm",
                                      { locale: vi }
                                  )
                                : ""}
                        </p>
                        <p className="mx-2">
                            <BsEye />
                        </p>
                        <p> {news?.views || 1}</p>
                    </div>
                </div>

                <div className="flex mb-4">
                    <Link to="/trang-chu" className="p-1">
                        <BsFacebook className="p-1" size={32} />
                    </Link>
                    <Link to="/trang-chu" className="p-1">
                        <BsLinkedin className="p-1" size={32} />
                    </Link>
                    <Link to="/trang-chu" className="p-1">
                        <BsTwitter className="p-1" size={32} />
                    </Link>
                </div>

                <div>
                    <h5>{news?.description}</h5>
                </div>

                <div className="mb-12">
                    <div
                        className="mt-6 mb-10"
                        id="news-content"
                        dangerouslySetInnerHTML={{ __html: news?.content }}
                    ></div>

                    <div className="flex mb-6">
                        <div className="relative aspect-square w-12 me-4">
                            <img
                                className="absolute rounded-full object-cover h-full w-full"
                                src={news?.creator?.avatar || avatarDefault}
                                alt="avata.png"
                            ></img>
                        </div>
                        <div className="flex items-center">
                            <p className="font-semibold">
                                {news?.creator?.userName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsDetail;
