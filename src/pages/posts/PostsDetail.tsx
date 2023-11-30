import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { RiDeleteBin6Line, RiArrowGoBackLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Popover, Space, Spin } from "antd";
import moment from "moment";
import { BiCommentDetail } from "react-icons/bi";

import { postsAction } from "redux/posts/posts.slice";
import ConfirmModal from "components/ui/modal/ConfirmModal";
import avatarDefault from "assets/images/avatar/default.jpg";

function PostsDetail () {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const post =  useSelector((state: any) => state.posts.currentPost) || {};
  const isLoading = useSelector((state: any) => state.news.isLoading);
  const [reRender, setReRender] = useState<boolean>(false)

  const { slug } = useParams();
  const newSlug = slug?.split("&")[0];
  const id = slug?.split("&")[1];
  const objSlug = {
    slug: newSlug,
    _id: id,
  };

  useEffect(() => {
    dispatch(postsAction.getOne(objSlug));
  }, [reRender]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Space size="middle">
          <Spin size="large"></Spin>
        </Space>
      </div>
    );
  }

  const handleApprove = async (id: any, userId: any) => {
    const credit = 1;
    await dispatch(
      postsAction.updateOne({
        _id: id,
        userId,
        credit,
      })
    );
    setReRender(!reRender)
  };

 
  return (
    <div className="container mx-auto pt-4 px-5">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { title: "Quản lý bài viết" },
            { title: "Bài đăng trên diễn đàn" },
            { title: "Chi tiết bài đăng" },
          ]}
        ></Breadcrumb>
      </div>
      <div className="mb-6 flex justify-between">
        <h3 className="font-semibold">Bài đăng trên diễn đàn: {post?.title}</h3>
        <button
          className="flex items-center border-b hover:border-gray-500 border-transparent"
          onClick={() => navigate("/quan-ly-bai-dang-CDS")}
        >
          <RiArrowGoBackLine size={20} className="me-1" />
          <span>Quay Lại</span>
        </button>
      </div>

      <div className="border border-gray-300 rounded-md p-5">
        <div className="flex justify-end gap-2 mb-2">
          {/* <Link to={`/quan-ly-bai-dang-CDS/chinh-sua/${slug}`}>
                        <LuEdit2 size={20} className="mr-2 text-sky-500" />
                    </Link> */}
        <span>Trạng thái: </span>
          {post?.status === 1 ? (
             <div className="text-center">
                <span className="bg-green-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                Đã duyệt
                </span>
             </div>
          ) : ( post?.status === 2 ?
              <div className="text-center">
                  <span className="bg-orange-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                      Bài chờ duyệt
                  </span>
              </div>:
              <div className="text-center">
                <span className="bg-yellow-500 text-white rounded-lg text-center py-1 px-2 whitespace-nowrap">
                    Bài sửa chờ duyệt
                </span>
            </div>
          )}
          <Popover content="Xóa bài đăng">
            <span>
                <ConfirmModal
                    buttonStyle=""
                    buttonIcon={
                    <RiDeleteBin6Line size={20} className="text-gray-400" />
                    }
                    title="Xóa bài đăng trên diễn đàn!"
                    description={`Bài đăng: '${post?.title}' sẽ bị xóa vĩnh viễn`}
                    handleSubmit={async () => {
                    await dispatch(
                        postsAction.deletePost({
                        postId: post?._id,
                        sectorId: post?.sector?._id,
                        })
                    );
                    navigate("/quan-ly-bai-dang-CDS");
                    }}
                ></ConfirmModal>
            </span>
          </Popover>
        </div>
        <img
          src={post?.mainPicture?.url}
          alt="image-title"
          className="w-[280px] rounded-lg border aspect-auto mb-3"
        />
        <div className="border-b border-gray-300 mb-1">
          <h1 className="mb-2">{post?.title}</h1>

          <div className="flex items-center text-gray-500 mb-3">
            <p className="">
              {post?.createDate
                ? moment(post?.createDate).format("DD/MM/YYYY")
                : ""}
            </p>
            <div className="px-5 flex">
              <BsEye className="my-auto" /> &nbsp;
              <p> {post?.views || 0}</p>
            </div>
            <div className="px-2 flex">
              <BiCommentDetail className="my-auto" /> &nbsp;
              <p> {post?.comments || 0}</p>
            </div>
          </div>
        </div>

        {/* <div className="flex mb-4">
                    <Link to="/trang-chu" className="p-1">
                        <BsFacebook className="p-1" size={32} />
                    </Link>
                    <Link to="/trang-chu" className="p-1">
                        <BsLinkedin className="p-1" size={32} />
                    </Link>
                    <Link to="/trang-chu" className="p-1">
                        <BsTwitter className="p-1" size={32} />
                    </Link>
                </div> */}

        <div className="mb-12">
          <div className="min-h-[200px] mb-10 ">
            <div
              className="mt-6 mb-10"
              id="news-content"
              dangerouslySetInnerHTML={{ __html: post?.content }}
            ></div>
            <div className="grid grid-cols-12 mt-5 gap-6">
              {post?.pictureInPost?.map((pic: any, index: number) => (
                <div
                  key={index}
                  className="col-span-12 md:col-span-6 lg:col-span-4 relative aspect-square rounded-xl border overflow-hidden"
                >
                  <img src={pic?.url} alt="image-content" className="w-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex mb-6">
            <h6 className="mr-5 mt-4">Người đăng bài:</h6>
            <div className="relative aspect-square w-12 me-4">
              <img
                className="absolute rounded-full object-cover h-full w-full"
                src={post?.createBy?.avatar || avatarDefault}
                alt="avata.png"
              ></img>
            </div>
            <div className="flex items-center">
              <p className="font-semibold">{post?.createBy?.userName}</p>
            </div>
          </div>
          {post?.status === 1 ? (
            <button
              className="border px-4 py-2 rounded-lg bg-green-500 
                                cursor-no-drop text-white float-right mr-5 mb-5 hover:opacity-50"
            >
              Bài đã duyệt
            </button>
          ) : (
            <button 
                className="border px-4 py-2 rounded-lg cursor-pointer 
                bg-[#f97316] text-white float-right mr-5 mb-5 hover:opacity-50"
                onClick={() => handleApprove(post?._id, post?.createBy?._id)}
            >
              Duyệt bài
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostsDetail;
