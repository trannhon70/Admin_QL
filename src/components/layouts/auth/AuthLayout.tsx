import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const AuthLayout = () => {
    return (
        <div className="h-screen flex flex-col justify-between">
            <div className="container mx-auto ">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default AuthLayout;
