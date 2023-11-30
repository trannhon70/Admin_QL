import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouteApp from "./routes";

function App() {
    return (
        <BrowserRouter>
            <RouteApp></RouteApp>
            <ToastContainer autoClose={2000} />
        </BrowserRouter>
    );
}

export default App;
