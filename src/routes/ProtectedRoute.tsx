import { userAction } from "redux/user/user.slice";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { LOCAL_STORAGE } from "helper/storage.helper";

const ProtectedRoute = ({
    children,
    permission,
}: {
    children: any;
    permission?: string;
}): ReactElement => {
    const loginPath = "/dang-nhap";
    const notFoundPath = "/404";


    if (!LOCAL_STORAGE.getAccessToken()) return <Navigate to={loginPath} replace />;
    if (LOCAL_STORAGE.getAccessToken()) return <>{children}</>;
    return <Navigate to={notFoundPath} replace />;
};

export default ProtectedRoute;
