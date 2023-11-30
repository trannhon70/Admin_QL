import { userAction } from "redux/user/user.slice";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
    children,
    permission,
}: {
    children: any;
    permission?: string;
}): ReactElement => {
    const loginPath = "/dang-nhap";
    const notFoundPath = "/404";

    const dispatch = useDispatch<any>();
    const isLogedIn = useSelector((state: any) => state.user.isLogedIn);
    const userInfo = useSelector((state: any) => state.user.currentUser);

    useEffect(() => {
        dispatch(userAction.getProfile());
    }, []);

    if (!isLogedIn) return <Navigate to={loginPath} replace />;
    if (!permission || userInfo?.role === permission) return <>{children}</>;
    return <Navigate to={notFoundPath} replace />;
};

export default ProtectedRoute;
