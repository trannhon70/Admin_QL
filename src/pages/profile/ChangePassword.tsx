import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiOutlineKey,
} from "react-icons/ai";
import { Modal } from "antd";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import SecondaryButton from "components/ui/button/SecondaryButton";
import { userAction } from "redux/user/user.slice";
import { toast } from "react-toastify";
import FullPageSpiner from "components/ui/spiner/FullPageSpiner";

function ChangePassword(props: {
    showButton?: any;
    isModalOpen: boolean;
    setIsModalOpen: Function;
}) {
    const dispatch = useDispatch<any>();
    const [isShowPass, setShowPass] = useState(false);
    const [isShowNewPass, setShowNewPass] = useState(false);
    const userInfo = useSelector((state: any) => state.user.currentUser) || {};
    const [isLoading, setIsLoading] = useState(false);

    const handleCancel = () => {
        formik.setValues(formik.initialValues);
        formik.touched.confirmPassword = false;
        formik.touched.oldPassword = false;
        formik.touched.newPassword = false;

        props.setIsModalOpen(false);
    };

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required("Required"),
            newPassword: Yup.string()
                .required("Required")
                .matches(/^.{6,}$/, "Password must be minimum six characters"),
            confirmPassword: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
        }),
        onSubmit: (values) => {
            setIsLoading(true);
            const result = dispatch(
                userAction.changePassword({ id: userInfo._id, ...values })
            );
            result.then((data: any) => {
                if (data.error) {
                    toast.error(data?.error?.message || "Update fail");
                    setIsLoading(false);
                    return;
                }
                toast.success("Update successfully!");
                setIsLoading(false);
                handleCancel();
            });
        },
    });

    return (
        <>
            {props?.showButton}
            <Modal
                title={""}
                open={props.isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="relative py-3">
                    <FullPageSpiner isLoading={isLoading} />
                    <form
                        className={`${isLoading ? "opacity-0" : ""}`}
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="w-full mb-6">
                            <div className="relative w-full mb-6">
                                <label
                                    htmlFor="oldPassword"
                                    className="font-semibold mb-1"
                                >
                                    Mật khẩu cũ{" "}
                                    {formik.errors.oldPassword &&
                                        formik.touched.oldPassword && (
                                            <i className="text-sm text-red-500">
                                                {formik.errors.oldPassword.toString()}
                                            </i>
                                        )}
                                </label>
                                <input
                                    aria-label="input"
                                    className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                                    onChange={formik.handleChange}
                                    type={`${isShowPass ? "text" : "password"}`}
                                    value={formik.values.oldPassword}
                                    id="oldPassword"
                                    name="oldPassword"
                                ></input>

                                <button
                                    className="absolute right-2 bottom-2"
                                    type="button"
                                    onClick={() => setShowPass(!isShowPass)}
                                >
                                    {isShowPass ? (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) : (
                                        <AiOutlineEye size={20} />
                                    )}
                                </button>
                            </div>

                            <div className="relative w-full mb-6">
                                <label
                                    htmlFor="newPassword"
                                    className="font-semibold mb-1"
                                >
                                    Mật khẩu mới{" "}
                                    {formik.errors.newPassword &&
                                        formik.touched.newPassword && (
                                            <i className="text-sm text-red-500">
                                                {formik.errors.newPassword.toString()}
                                            </i>
                                        )}
                                </label>
                                <input
                                    aria-label="input"
                                    className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                                    onChange={formik.handleChange}
                                    value={formik.values.newPassword}
                                    type={`${
                                        isShowNewPass ? "text" : "password"
                                    }`}
                                    id="newPassword"
                                    name="newPassword"
                                ></input>
                                <button
                                    className="absolute right-2 bottom-2"
                                    type="button"
                                    onClick={() =>
                                        setShowNewPass(!isShowNewPass)
                                    }
                                >
                                    {isShowNewPass ? (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) : (
                                        <AiOutlineEye size={20} />
                                    )}
                                </button>
                            </div>

                            <div className="w-full mb-6">
                                <label
                                    htmlFor="confirmPassword"
                                    className="font-semibold mb-1"
                                >
                                    Nhập lại mật khẩu{" "}
                                    {formik.errors.confirmPassword &&
                                        formik.touched.confirmPassword && (
                                            <i className="text-sm text-red-500">
                                                {formik.errors.confirmPassword.toString()}
                                            </i>
                                        )}
                                </label>
                                <input
                                    aria-label="input"
                                    id="confirmPassword"
                                    type={`${
                                        isShowNewPass ? "text" : "password"
                                    }`}
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
                                    className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                                    name="confirmPassword"
                                ></input>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <PrimaryButton
                                type="submit"
                                content="Cập nhật"
                                icon={<AiOutlineKey className="text-xl me-2" />}
                            />
                            <SecondaryButton
                                content="Hủy"
                                type="button"
                                onClick={handleCancel}
                            />
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
export default ChangePassword;
