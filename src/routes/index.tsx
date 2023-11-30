import { Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoutes, PublicRoutes } from "./routes";
import MainLayout from "components/layouts/main/MainLayout";
import AuthLayout from "components/layouts/auth/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

const RouteApp = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout></MainLayout>}>
                <Route index element={<Navigate to="bang-dieu-khien" />} />
                {ProtectedRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <ProtectedRoute permission={route?.permission}>
                                {route.element}
                            </ProtectedRoute>
                        }
                    ></Route>
                ))}
            </Route>

            <Route element={<AuthLayout></AuthLayout>}>
                {PublicRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    ></Route>
                ))}
            </Route>

            <Route path="*" element={<Navigate to={"/404"} />} />
        </Routes>
    );
};

export default RouteApp;
