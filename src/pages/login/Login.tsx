import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";

import logo from "assets/images/logo.svg";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import InputCustom from "components/ui/input/InputCustom";
import { userAction } from "redux/user/user.slice";
import SecondaryButton from "components/ui/button/SecondaryButton";

export default function Login() {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState<boolean>(false);
    const isLogedIn = useSelector((state: any) => state.user.isLogedIn);

    function handleLogin(values: any) {
        dispatch(userAction.signIn(values));
    }

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is Required"),
            password: Yup.string()
                .required("Password is Required")
                .matches(/^.{6,}$/, "Password must be minimum 6 characters"),
        }),
        onSubmit: (values: { username: string; password: string }) => {
            handleLogin(values);
        },
    });

    if (isLogedIn) return <Navigate to="/" />;

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
                        Đăng Nhập
                    </p>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-5">
                                <InputCustom
                                    placeholder="Tên đăng nhập hoặc email"
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

                            <div className="flex flex-wrap justify-between mb-5">
                                <div>
                                    <input
                                        id="save-password"
                                        type="checkbox"
                                        className="me-2"
                                        defaultChecked
                                    ></input>
                                    <label
                                        htmlFor="save-password"
                                        className="text-base text-gray-700"
                                    >
                                        Lưu tài Khoản
                                    </label>
                                </div>
                                <div>
                                    <Link
                                        to="/quen-mat-khau"
                                        className="text-base text-primary-700 font-semibold hover:underline"
                                    >
                                        Quên mật khẩu
                                    </Link>
                                </div>
                            </div>
                            <div className="mb-5">
                                <PrimaryButton
                                    className="w-full justify-center mb-4"
                                    content="Đăng Nhập"
                                    type="submit"
                                ></PrimaryButton>

                                <SecondaryButton
                                    content="Đăng ký"
                                    className="w-full"
                                    type="button"
                                    onClick={() => navigate("/dang-ky")}
                                ></SecondaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
