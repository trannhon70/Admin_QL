import { useRef, useState, memo, useCallback } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Modal, Popover, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye } from "react-icons/ai";

import PrimaryInput from "components/ui/input/PrimaryInput";
import EditorInit from "./components/EditorInit";
import { NotificationType, NotificationStatusType } from "common/constant";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";
import { userAction } from "redux/user/user.slice";
import { notifiAction } from "redux/notification/notification.slice";
import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import SecondaryButton from "components/ui/button/SecondaryButton";

type NewsType = {
    title?: string;
    content?: string;
    status?: number;
    typeSend?:number;
    users?:Array<string>;
    statusSend?:number
};

function ViewNotificationSendModal(props:any) {
    const {item} = props
    const editorContentRef: any = useRef(null);

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const listUser = useSelector((state: any) => state.user.listUsersSelect) || [];
    const arrIdUser:any = []
    for (const element of listUser) {
        arrIdUser.push(element?._id)
    }
    const newListUser = [{_id:"Chọn tất cả", userName: "Chọn tất cả"},...listUser]
    const isLoading = useSelector((state: any) => state.news.isLoading);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        initialValues: {
            title: "Thông báo mới",
            content: item?.content,
            status: 2,
            typeSend: item?.typeSend,
            users:item?.userId.map((el:any)=> el?._id.toString()),
            statusSend:item?.statusSend
        },
        validationSchema: Yup.object({
            content: Yup.string().required("* Required"),
            users: Yup.array().required("* Required")
        }),
        onSubmit: async (values: NewsType) => {
            if (values.users?.includes("Chọn tất cả") === true) {
                values.users = arrIdUser
            }
            // try {
            //     const result = dispatch(
            //         notifiAction.updateNotificationSendCDS({
            //             _id: item?._id,
            //             ...values,
            //         })
            //     );
            //     result.then((data: any) => {
            //         if (data.error) {
            //             toast.error("Update Fail");
            //             return;
            //         }
            //         if (data.payload.message === "save success") {
            //             toast.success("sửa thông báo thành công")
            //             handleSearch()
            //         }
            //         if (data.payload.message === "send success") {
            //             toast.success("sửa và gửi thông báo thành công")
            //         }
            //         navigate("/quan-ly-thong-bao");
            //     });
            // } catch (err: any) {
            //     toast.error(err.message || "error");
            // }
        },
    });

    useCallback(() => {
        dispatch(userAction.getListSelect());
    }, []);

    if (isLoading) return <SimpleSpiner isLoading={isLoading} />;

    const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const handleShow = () => {
        setIsModalOpen(true);
     };
     const handleOk = () => {
        setIsModalOpen(false);
     };
     const handleCancel = () => {
        setIsModalOpen(false);
     };
     
    return (
        <>
            <Popover content="Xem thông báo">
            <AiOutlineEye size={24} className="mr-2 text-sky-500" onClick={handleShow} />
            </Popover>
         
            <Modal
                title={<h5>Sửa thông báo</h5>}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
                footer={null}
                className="relative"
            >
            <FullPageSpiner isLoading={isLoading} />
            <div>
                {/* ============= */}

                <div className="ms-3 mb-4">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <PrimaryInput
                                onChange={formik.handleChange}
                                value = 'Thông báo mới'
                                disabled = {true}
                                name="title"
                                label={
                                    <>
                                        Tiêu đề: {" "}
                                        {formik.errors.title &&
                                            formik.touched.title && (
                                                <i className="text-sm text-red-500">
                                                    {formik.errors.title}
                                                </i>
                                            )}
                                    </>
                                }
                            ></PrimaryInput>
                        </div>
                        <div className="mb-3">
                            <label className="mb-1" htmlFor="content">
                                Nội dung thông báo: {" "}
                                {formik.errors.content &&
                                    formik.touched.content && (
                                        <i className="text-sm text-red-500">
                                            {formik.errors.content}
                                        </i>
                                    )}
                            </label>
                            <Editor
                                apiKey={
                                    "w17lpon88s3owkb87t8wnmyrb7dnvziqf3mrghzfk7ft8cpl"
                                }
                                initialValue={item?.content}
                                onInit={(evt, editor) => {
                                    editorContentRef.current = editor;
                                }}
                                init={EditorInit(editorContentRef)}
                                disabled = {true}
                                onEditorChange={(e) => {
                                    formik.handleChange({
                                        target: { name: "content", value: e },
                                    });
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="select-typeSend">Hình thức gửi:</label>
                            <Select
                                id="select-typeSend"
                                placeholder="Hình thức gửi"
                                className="w-full [&>div]:!h-10 [&>div]:!py-1"
                                options={NotificationType}
                                defaultValue={item?.typeSend}
                                onChange={(value) =>
                                    formik.setFieldValue("typeSend", value)
                                }
                                disabled = {true}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="user-select">Gửi đến account: </label>
                            <Select
                                id="user-select"
                                mode="multiple"
                                allowClear
                                placeholder="Chọn account"
                                className="w-full [&>div]:!py-1"
                                options={newListUser?.map((user: any) => ({
                                    value: user._id,
                                    label: user.userName,
                                }))}
                                defaultValue={item?.userId?.map((user: any) => ({
                                    value: user._id,
                                    label: user.userName,
                                }))}
                                onChange={(value) =>
                                    formik.setFieldValue("users", value)
                                }
                                filterOption={filterOption}
                                maxTagCount={10}
                                disabled = {true}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="select-statusSend">Trạng thái gửi:</label>
                            <Select
                                id="select-statusSend"
                                placeholder="Trạng thái gửi"
                                className="w-full [&>div]:!h-10 [&>div]:!py-1"
                                options={NotificationStatusType}
                                defaultValue={item?.statusSend}
                                onChange={(value) =>
                                    formik.setFieldValue("statusSend", value)
                                }
                                disabled = {true}
                            />
                        </div>
                        <div className="flex justify-end mt-5">
                            <SecondaryButton
                                className="px-10 text-base ml-5"
                                content="Đóng"
                                onClick={(e:any) => {
                                    e.preventDefault();
                                    setIsModalOpen(false);
                                }}
                            ></SecondaryButton>
                        </div>
                    </form>
                </div>
            </div>
            </Modal>
        </>
    );
}
export default memo(ViewNotificationSendModal);
