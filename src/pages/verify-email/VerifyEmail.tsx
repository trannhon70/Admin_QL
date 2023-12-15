import { userAPI } from "api/user.api";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function VerifyEmail() {
    const search = useLocation().search;
    const token = new URLSearchParams(search).get("token");
    const email = new URLSearchParams(search).get("email");
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    
    useEffect( () => {
        const query = {
            token: token,
            email: email
        }
        userAPI.VerifyEmail(query).then((res)=>{
            if(res.status === 1){
                toast.success('Xác thực tài khoản thành công!')
            }
            
        })
    }, [token, email]);
    return (
        <div className="flex flex-col items-center justify-end h-80 py-5">
            <h2 className="font-semibold text-gray-700 text-center mb-5">
                Tài khoản đã được kích hoạt!
            </h2>
            <div className="">
                <PrimaryButton
                    className="!px-10"
                    onClick={() => {
                        navigate("/them-nguoi-dung");
                    }}
                    content="Quay lại"
                ></PrimaryButton>
            </div>
        </div>
    );
}
export default VerifyEmail;
