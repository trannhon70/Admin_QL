import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Breadcrumb, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RiArrowGoBackLine } from "react-icons/ri";

import PrimaryInput from "components/ui/input/PrimaryInput";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import EditorInit from "./components/EditorInit";
import { NotificationType, NotificationStatusType } from "common/constant";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";
import { userAction } from "redux/user/user.slice";
import { notifiAction } from "redux/notification/notification.slice";

type NewsType = {
    title?: string;
    content?: string;
    status?: number;
    typeSend?:number;
    users?:Array<string>;
    statusSend?:number
};

function CreateNotification() {
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

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        initialValues: {
            title: "Thông báo mới",
            content: "",
            status: 2,
            typeSend: 1,
            users:[],
            statusSend:2
        },
        validationSchema: Yup.object({
            content: Yup.string().required("* Required"),
            users: Yup.array().required("* Required")
        }),
        onSubmit: async (values: NewsType) => {
            if (values.users?.includes("Chọn tất cả") === true) {
                values.users = arrIdUser
            }
            try {
                const result = dispatch(
                    notifiAction.createNotification({
                        ...values,
                    })
                );
                result.then((data: any, message:string) => {
                    if (data.error) {
                        toast.error("Create Fail");
                        return;
                    }
                    if (data.payload.message === "send success") {
                        toast.success("gửi thông báo thành công")
                    }
                    if (data.payload.message === "save success") {
                        toast.success("lưu nháp thông báo thành công")
                    }
                    navigate("/quan-ly-thong-bao");
                });
            } catch (err: any) {
                toast.error(err.message || "create fail");
            }
        },
    });

    useEffect(() => {
        dispatch(userAction.getListSelect());
    }, []);

    if (isLoading) return <SimpleSpiner isLoading={isLoading} />;

    const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return (
        <div className="p-4">
            <div className="mb-4">
                <Breadcrumb
                    items={[
                        { title: "Quản lý thông báo" },
                        { title: "Tạo thông báo" },
                    ]}
                ></Breadcrumb>
            </div>

            <div className="mb-6 flex justify-between">
                <h3 className="font-semibold">Tạo thông báo cho người dùng</h3>
                <button
                    className="flex items-center border-b hover:border-gray-500 border-transparent"
                    onClick={() => navigate("/quan-ly-thong-bao")}
                >
                    <RiArrowGoBackLine size={20} className="me-1" />
                    <span>Quay Lại</span>
                </button>
            </div>

            {/* ============= */}

            <div className="ms-3 mb-40">
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
                            initialValue={""}
                            onInit={(evt, editor) => {
                                editorContentRef.current = editor;
                            }}
                            init={EditorInit(editorContentRef)}
                            onEditorChange={(e, editor:any) => {
                                formik.handleChange({
                                    target: { name: "content", value: e },
                                });
                                formik.setFieldValue("contentString", editor.getContent({ format: "text" }))
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
                            defaultValue={1}
                            onChange={(value) =>
                                formik.setFieldValue("typeSend", value)
                            }
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
                            onChange={(value) =>
                                formik.setFieldValue("users", value)
                            }
                            filterOption={filterOption}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="select-statusSend">Trạng thái gửi:</label>
                        <Select
                            id="select-statusSend"
                            placeholder="Trạng thái gửi"
                            className="w-full [&>div]:!h-10 [&>div]:!py-1"
                            options={NotificationStatusType}
                            defaultValue={2}
                            onChange={(value) =>
                                formik.setFieldValue("statusSend", value)
                            }
                        />
                    </div>
                    <div className="flex justify-end">
                        <PrimaryButton
                            className="px-10 text-base"
                            type="submit"
                            content="Tạo thông báo"
                        ></PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default CreateNotification;
