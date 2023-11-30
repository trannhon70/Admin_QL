import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Layout } from "antd";

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Layout className="min-h-screen">
                <Sidebar collapsed={collapsed}></Sidebar>
                <Layout>
                    <Header
                        collapsed={collapsed}
                        setCollapsed={(val: boolean) => setCollapsed(val)}
                    ></Header>
                    <div className="h-full">
                        <Outlet></Outlet>
                    </div>
                </Layout>
            </Layout>
        </>
    );
};
export default React.memo(MainLayout);
