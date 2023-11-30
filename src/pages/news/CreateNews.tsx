import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Breadcrumb, Select } from "antd";
import { BiImageAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import PrimaryInput from "components/ui/input/PrimaryInput";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import EditorInit from "./components/EditorInit";
import { sectorAction } from "redux/sector/sector.slice";
import { toSlug } from "common/function";
import { newsAction } from "redux/news/news.slice";
import { RiArrowGoBackLine } from "react-icons/ri";
import { appAction } from "redux/app/app.slice";
import { NewsStatus } from "common/constant";
import SimpleSpiner from "components/ui/spiner/SimpleSpiner";
import PrimaryTextarea from "components/ui/input/PrimaryTextarea";

type NewsType = {
    title?: string;
    slug?: string;
    views?: number;
    like?: number;
    description?: string;
    content?: string;
    status?: number;
    sectors?: Array<string>;
    thumbnail?: string;
};

function CreateNews() {
    const editorContentRef: any = useRef(null);

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const sectors = useSelector((state: any) => state.sector.sectors) || [];
    const isLoading = useSelector((state: any) => state.news.isLoading);

    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<any>("");

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileSelected = e.currentTarget.files?.[0];
        if (typeof fileSelected === "undefined") return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnailUrl(reader.result);
        };
        if (fileSelected.type.match(/image.*/)) {
            setThumbnailFile(fileSelected);
            reader.readAsDataURL(fileSelected);
        }
    };

    const handleUploadImg = async (file: File | null) => {
        //
        try {
            const formData = new FormData();
            if (file) formData.append("file", file);

            // call api upload
            const uploadResult = await dispatch(appAction.uploadFile(formData));
            return uploadResult.payload.data.url;
        } catch (err) {
            throw new Error("Upload fail");
        }
    };

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        initialValues: {
            title: "",
            slug: "",
            views: 0,
            like: 0,
            description: "",
            content: "",
            status: 3,
            sectors: [],
            thumbnail: "_",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("* Required"),
            slug: Yup.string().required("* Required"),
            description: Yup.string().required("* Required"),
            content: Yup.string().required("* Required"),
            thumbnail: Yup.string().required("* Required"),
        }),
        onSubmit: async (values: NewsType) => {
            try {
                if (!thumbnailFile) {
                    formik.errors.thumbnail = "* Required";
                    return;
                }
                const uploadResult = await handleUploadImg(thumbnailFile);

                const result = dispatch(
                    newsAction.createNews({
                        ...values,
                        thumbnail: uploadResult,
                    })
                );
                result.then((data: any) => {
                    if (data.error) {
                        toast.error("Create Fail");
                        return;
                    }
                    navigate("/quan-ly-bai-viet");
                });
            } catch (err: any) {
                toast.error(err.message || "create fail");
            }
        },
    });

    useEffect(() => {
        dispatch(sectorAction.getAll({}));
    }, []);

    if (isLoading) return <SimpleSpiner isLoading={isLoading} />;

    return (
        <div className="p-4">
            <div className="mb-4">
                <Breadcrumb
                    items={[
                        { title: "Quản lý bài viết" },
                        { title: "Tạo bài viết" },
                    ]}
                ></Breadcrumb>
            </div>

            <div className="mb-6 flex justify-between">
                <h3 className="font-semibold">Tạo bài viết</h3>
                <button
                    className="flex items-center border-b hover:border-gray-500 border-transparent"
                    onClick={() => navigate("/quan-ly-bai-viet")}
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
                            name="title"
                            label={
                                <>
                                    Tiêu đề{" "}
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
                        <div className="grid grid-cols-6 ">
                            <PrimaryInput
                                onChange={formik.handleChange}
                                value={formik.values.slug}
                                name="slug"
                                label={
                                    <>
                                        Đường dẫn tĩnh{" "}
                                        {formik.errors.slug &&
                                            formik.touched.slug && (
                                                <i className="text-sm text-red-500">
                                                    {formik.errors.slug}
                                                </i>
                                            )}
                                    </>
                                }
                                className="col-span-4 lg:col-span-5"
                            ></PrimaryInput>

                            <PrimaryButton
                                content="Tạo đường dẫn"
                                type="button"
                                onClick={() => {
                                    formik.setFieldValue(
                                        "slug",
                                        toSlug(
                                            formik.values.title
                                                ? formik.values.title
                                                : ""
                                        )
                                    );
                                }}
                                className="col-span-2 lg:col-span-1 mt-5 h-10 py-2 px-3 ms-1"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-x-1 mb-3 ">
                        <PrimaryInput
                            onChange={formik.handleChange}
                            name="views"
                            label="Lượt xem"
                            type="number"
                            className="col-span-3"
                        ></PrimaryInput>

                        <PrimaryInput
                            onChange={formik.handleChange}
                            name="like"
                            label="Lượt thích"
                            type="number"
                            className="col-span-3"
                        ></PrimaryInput>
                    </div>

                    <div className="mb-3">
                        <PrimaryTextarea
                            onChange={formik.handleChange}
                            name="description"
                            label={
                                <>
                                    Mô tả{" "}
                                    {formik.errors.description &&
                                        formik.touched.description && (
                                            <i className="text-sm text-red-500">
                                                {formik.errors.description}
                                            </i>
                                        )}
                                </>
                            }
                        ></PrimaryTextarea>
                    </div>
                    <div className="mb-3">
                        <label className="mb-1" htmlFor="content">
                            Nội dung{" "}
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
                            init={EditorInit(handleUploadImg, editorContentRef)}
                            onEditorChange={(e) => {
                                formik.handleChange({
                                    target: { name: "content", value: e },
                                });
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="select-status">Trạng thái</label>
                        <Select
                            id="select-status"
                            allowClear
                            placeholder="Trạng thái"
                            className="w-full [&>div]:!h-10 [&>div]:!py-1"
                            options={NewsStatus}
                            onChange={(value) =>
                                formik.setFieldValue("status", value)
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sector-select">Chuyên mục</label>
                        <Select
                            id="sector-select"
                            mode="multiple"
                            allowClear
                            placeholder="Chọn danh mục"
                            className="w-full [&>div]:!py-1"
                            options={sectors?.map((sector: any) => ({
                                value: sector._id,
                                label: sector.sectorName,
                            }))}
                            onChange={(value) =>
                                formik.setFieldValue("sectors", value)
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label>
                            Hình ảnh{" "}
                            {formik.errors.thumbnail && (
                                <i className="text-sm text-red-500">
                                    {formik.errors.thumbnail}
                                </i>
                            )}
                        </label>
                        <div className="flex">
                            <div>
                                {thumbnailUrl && (
                                    <div className="relative border border-dashed border-gray-300 rounded-md aspect-video max-w-[300px] h-36 me-4">
                                        <img
                                            className="h-full w-full absolute object-cover"
                                            src={thumbnailUrl}
                                            alt="thumbnail"
                                        ></img>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-center border border-dashed border-gray-300 rounded-md bg-white h-36 w-full p-2">
                                <label
                                    htmlFor="input-thumbnail"
                                    className="h-full w-full flex items-center"
                                >
                                    <BiImageAdd
                                        size={50}
                                        className="text-gray-400 mx-auto"
                                    />
                                </label>
                                <input
                                    id="input-thumbnail"
                                    className="hidden"
                                    accept="image/*"
                                    type="file"
                                    onChange={handleSelectFile}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <PrimaryButton
                            className="px-10 text-base"
                            type="submit"
                            content="Tạo bài viết"
                        ></PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default CreateNews;
