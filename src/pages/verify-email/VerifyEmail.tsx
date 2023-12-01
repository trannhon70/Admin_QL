import PrimaryButton from "components/ui/button/PrimaryButtton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userAction } from "redux/user/user.slice";

function VerifyEmail() {
    const search = useLocation().search;
    const emailToken = new URLSearchParams(search).get("emailToken");
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            // const result = dispatch(userAction.verifyEmail(emailToken || ""));
            // result.then((data: any) => {
            //     if (data?.error) {
            //         navigate("/404");
            //         return;
            //     }
            //     toast.success("Xác thực thành công!");
            // });
        } catch (error) {
            navigate("/404");
        }
    }, []);
    return (
        <div className="flex flex-col items-center justify-end h-80 py-5">
            <h2 className="font-semibold text-gray-700 text-center mb-5">
                Tài khoản đã được kích hoạt!
            </h2>
            <div className="">
                <PrimaryButton
                    className="!px-10"
                    onClick={() => {
                        navigate("/dang-nhap");
                    }}
                    content="Đăng nhập"
                ></PrimaryButton>
            </div>
        </div>
    );
}
export default VerifyEmail;
