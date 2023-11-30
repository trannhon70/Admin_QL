import { useState } from "react";
import { useDispatch } from "react-redux";
import { BiHide, BiShow } from "react-icons/bi";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import logo from "assets/images/logo.svg";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import InputCustom from "components/ui/input/InputCustom";
import { userAction } from "redux/user/user.slice";
import { toast } from "react-toastify";
import SecondaryButton from "components/ui/button/SecondaryButton";

export default function SignUp() {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState<boolean>(false);

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        initialValues: {
            username: "",
            password: "",
            email: "",
            confirmPassword: "",
            fullName: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is Required"),
            password: Yup.string()
                .required("Password is Required")
                .matches(/^.{6,}$/, "Password must be minimum 6 characters"),
            email: Yup.string().required("* Required").email("Invalid email"),
            confirmPassword: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password")], "Passwords do not match"),
            fullName: Yup.string().required("FullName is Required"),
        }),
        onSubmit: (values: {
            username: string;
            password: string;
            email: string;
            confirmPassword: string;
            fullName: string;
        }) => {
            //
            try {
                const result = dispatch(
                    userAction.signUp({
                        ...values,
                        userName: values.username,
                    })
                );
                result.then((data: any) => {
                    if (data.error) {
                        toast.error(
                            data?.error?.message || "Đăng ký thất bại!"
                        );
                        return;
                    }
                    //
                    toast.success(
                        "Thành công, truy cập vào gmail để kích hoạt tài khoản!"
                    );
                });
            } catch (error) {
                toast.error("Đăng ký thất bại!");
            }
        },
    });

    return (
        <div>
            <div className="flex items-center py-6 px-6">
                <img src={logo} height={45} width={45} alt="logo.svg"></img>
                <h4 className={`font-medium`}>
                    CONGDONG
                    <span className="font-bold text-primary-900">SEO</span>
                </h4>
            </div>
            <div className="flex justify-center items-center min-w-[200px] pt-20 px-5">
                <div className="w-80">
                    <p className="text-center sm:text-2xl text-xl font-semibold mb-8">
                        Đăng Ký
                    </p>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-5">
                                <InputCustom
                                    placeholder="Tên đăng nhập"
                                    type="text"
                                    onChange={formik.handleChange}
                                    name="username"
                                ></InputCustom>
                                {formik.errors.username &&
                                    formik.touched.username && (
                                        <i className="text-sm text-red-500">
                                            {formik.errors.username}
                                        </i>
                                    )}
                            </div>

                            <div className="mb-5">
                                <InputCustom
                                    placeholder="Email"
                                    type="text"
                                    onChange={formik.handleChange}
                                    name="email"
                                ></InputCustom>
                                {formik.errors.email &&
                                    formik.touched.email && (
                                        <i className="text-sm text-red-500">
                                            {formik.errors.email}
                                        </i>
                                    )}
                            </div>

                            <div className="mb-5">
                                <InputCustom
                                    placeholder="Họ Tên"
                                    type="text"
                                    onChange={formik.handleChange}
                                    name="fullName"
                                ></InputCustom>
                                {formik.errors.fullName &&
                                    formik.touched.fullName && (
                                        <i className="text-sm text-red-500">
                                            {formik.errors.fullName}
                                        </i>
                                    )}
                            </div>

                            <div className="relative mb-5">
                                <InputCustom
                                    placeholder="Mật khẩu"
                                    type={
                                        showPass === true ? "text" : "password"
                                    }
                                    onChange={formik.handleChange}
                                    name="password"
                                ></InputCustom>
                                {formik.errors.password &&
                                    formik.touched.password && (
                                        <i className="text-sm text-red-500">
                                            {formik.errors.password}
                                        </i>
                                    )}
                                <button
                                    className="absolute right-2 top-3 text-gray-900"
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {showPass ? <BiShow /> : <BiHide />}
                                </button>
                            </div>

                            <div className="relative mb-5">
                                <InputCustom
                                    placeholder="Nhập lại mật khẩu"
                                    type={
                                        showPass === true ? "text" : "password"
                                    }
                                    onChange={formik.handleChange}
                                    name="confirmPassword"
                                ></InputCustom>
                                {formik.errors.confirmPassword &&
                                    formik.touched.confirmPassword && (
                                        <i className="text-sm text-red-500">
                                            {formik.errors.confirmPassword}
                                        </i>
                                    )}
                            </div>

                            <div className="mb-5">
                                <PrimaryButton
                                    className="w-full justify-center mb-4"
                                    content="Đăng Ký"
                                    type="submit"
                                ></PrimaryButton>

                                <SecondaryButton
                                    content="Đăng nhập"
                                    className="w-full"
                                    type="button"
                                    onClick={() => navigate("/dang-nhap")}
                                ></SecondaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
