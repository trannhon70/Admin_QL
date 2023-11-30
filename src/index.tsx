import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import { SocketContext, socket } from "contextStore/webSocketContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <SocketContext.Provider value = {socket}>
            <Provider store={store}>
                <App />
            </Provider>
        </SocketContext.Provider>
    </React.StrictMode>
);
