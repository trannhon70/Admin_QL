import { LOCAL_STORAGE } from "helper/storage.helper";
import { createContext, useContext, useState } from "react";
import {io, Socket} from 'socket.io-client';


const socketOptions = {
    transportOptions: {
        polling: {
            extraHeaders: {
                Authorization: `Bearer ${LOCAL_STORAGE.getAccessToken()}`,
                autoConnect: false
            }
        }
    }
};
export const socket = io(`${process.env.REACT_APP_BASE_API_URL}`,socketOptions);

export const SocketContext:any = createContext<Socket>(socket)

export const SocketContextProvider = SocketContext.Provider