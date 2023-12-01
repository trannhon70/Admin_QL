import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import InputCustom from "components/ui/input/InputCustom";
import logo from "assets/images/logo.svg";
import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import { userAction } from "redux/user/user.slice";

function ForgotPassword() {
    const dispatch = useDispatch<any>();
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: false,
        initialValues: {
            userName: "",
            email: "",
        },
        validationSchema: Yup.object({
            userName: Yup.string().required("*Username is Required"),
            email: Yup.string()
                .required("*Email is required")
                .email("Invalid email"),
        }),
        onSubmit: (values: { userName: string; email: string }) => {
            //
            // setIsLoading(true);
            // const result = dispatch(userAction.resetPassword(values));
            // result.then((data: any) => {
            //     if (data.error) {
            //         toast.error(data?.error?.message || "Get fail");
            //         setIsLoading(false);
            //         return;
            //     }
            //     toast.success("Mật khẩu mới đã được gửi tới email của bạn");
            //     setIsLoading(false);
            // });
        },
    });

    if (isLoading) return <FullPageSpiner isLoading={isLoading} />;

    return (
        <div className="relative">
            <div className="flex items-center py-6 px-6">
                <img src={logo} height={45} width={45} alt="logo.svg"></img>
                <h4 className={`font-medium`}>
                    CONGDONG
                    <span className="font-bold text-primary-900">SEO</span>
                </h4>
            </div>
            <div className="flex justify-center items-center min-w-[200px] pt-20 px-5">
                <div className="w-80">
                    <h3 className="text-center font-semibold mb-8">
                        Quên mật khẩu
                    </h3>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="flex flex-col gap-y-4 mb-3"
                    >
                        <div>
                            <InputCustom
                                placeholder="Tên đăng nhập"
                                type="text"
                                name="userName"
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                            ></InputCustom>
                            {formik.errors.userName &&
                                formik.touched.userName && (
                                    <i className="text-sm text-red-500">
                                        {formik.errors.userName}
                                    </i>
                                )}
                        </div>

                        <div>
                            <InputCustom
                                placeholder="Email"
                                type="text"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            ></InputCustom>
                            {formik.errors.email && formik.touched.email && (
                                <i className="text-sm text-red-500">
                                    {formik.errors.email}
                                </i>
                            )}
                        </div>

                        <PrimaryButton
                            content="Lấy lại mật khẩu"
                            type="submit"
                            className="w-full justify-center"
                        ></PrimaryButton>
                    </form>
                    <div>
                        <p className="text-center">
                            Đăng nhập lại!{" "}
                            <Link
                                to="/dang-nhap"
                                className="text-primary-700 font-semibold hover:underline"
                            >
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ForgotPassword;
