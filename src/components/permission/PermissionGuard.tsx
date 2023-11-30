import { ReactElement } from "react";
import { useSelector } from "react-redux";

const PermissionGuard = ({
    children,
    permission,
}: {
    children: any;
    permission: string;
}): ReactElement => {
    const userInfo = useSelector((state: any) => state.user.currentUser);

    if (!permission || userInfo?.role === permission) return <>{children}</>;
    return <></>;
};

export default PermissionGuard;
