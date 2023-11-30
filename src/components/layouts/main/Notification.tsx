'use strict'
import { Popover, Tabs, TabsProps, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { BsFillBellFill, BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {Socket} from 'socket.io-client';
import { notifiAction } from "redux/notification/notification.slice";
import moment from "moment";
import { Link } from "react-router-dom";
import { MdCircle } from "react-icons/md";
import { ROLES } from "common/constant";
import PrimaryButton from "components/ui/button/PrimaryButtton";
import { SocketContext } from "contextStore/webSocketContext";
import { API_CONFIG } from "config";
import { notificationAPI } from "api/notification.api";

const Notification = () => {
    const userInfo = useSelector((state:any) => state.user.currentUser);

    const [allNotifi, setAllNotifi] = useState<any>([]);
    const [totalAllNotifi, setTotalAllNotifi] = useState<number>(0);
    const [notSeenNotifi, setNotSeenNotifi] = useState<any>([]);
    const [totalNotSeenNotifi, setTotalNotSeenNotifi] = useState<number>(0);
    const [seenNotifi, setSeenNotifi] = useState<any>([]);
    const [totalSeenNotifi, setTotalSeenNotifi] = useState<number>(0);
    const [clickSeenNotifi, setClickSeenNotifi] = useState<any>(null);
    const [pageSizeAll, setPageSizeAll] = useState<number>(10);
    const [pageSizeNotSeen, setPageSizeNotSeen] = useState<number>(10);
    const [pageSizeSeen, setPageSizeSeen] = useState<number>(10);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [render, setRender] = useState<boolean>(false);
    const [checkNoti, setCheckNoti] = useState<any>(null);
    const [checkNotification, setCheckNotification] = useState<any>(null);
    const [isHover, setIsHover] = useState<boolean>(false);
    const [indexHover, setIndexHover] = useState<string>("");
    const socket:Socket = useContext(SocketContext);
    const dispatch = useDispatch();

    useEffect(() => {
        setRender(true)
    },[render])

    const contentNotification = () => {
        return (
            <div className="">
                <Tabs defaultActiveKey="1" items={items} type="card"/>
            </div>
        )
    }

    const contentDeleteNotification = (_id:string) => {
        const handleDeleteNotification = async () => {
            const objDelete: {
                _id: string
            } = {
                _id
            }
            const result:any = await notificationAPI.deleteNotification(objDelete);
            if (result?.uniqueCode === 1) {
                setCheckNotification(result?.message);
                toast.success("Xóa thông báo thành công");
            }
            if (result?.uniqueCode === 2) {
                toast.error("Xóa thông báo thất bại");
            }
        }
        return (
            <div 
                className="cursor-pointer hover:font-semibold"
                onClick={handleDeleteNotification}
            >
                <span>Xóa thông báo</span>
            </div>
        )
    }

    const notificationChildren = (options:any, count:number) =>{
        return (
            <>
                {options?.map((notifi:any, index: number) => {
                    return(
                        <div 
                            className="relative"
                            key={index}
                            onMouseEnter={() => {
                                setIsHover(true);
                                setIndexHover(`${notifi?._id}-${index}`)
                            }}
                            onMouseLeave={() => {
                                setIsHover(false);
                                setIndexHover("")
                            }}
                        >
                            <Link
                                to={
                                    notifi?.title === "Duyệt đơn mua credit" ?
                                        `${API_CONFIG.UI_URL}/thanh-toan-chuyen-khoan` :
                                        (notifi?.title === "Báo cáo bài viết" ? `${API_CONFIG.UI_URL}/quan-ly-bao-cao-CDS` : 
                                        `${API_CONFIG.UI_URL}/quan-ly-bai-dang-CDS/chi-tiet/${notifi?.slug}&${notifi?.postId}`)
                                    }
                                // to={`http://localhost:3001/quan-ly-bai-dang-CDS/chi-tiet/${notifi?.slug}&${notifi?.postId}`}
                                key={index}
                                onClick={() => handleSeen(notifi?._id)}
                                reloadDocument
                            >
                                <div className="border-t border-b mb-3 py-2">
                                    <div className="flex">
                                        <h5 className="my-auto font-semibold">{notifi?.title}</h5> 
                                        {
                                            notifi?.isSeen === false ? 
                                            <MdCircle className="ml-auto my-auto text-green-500"/> : 
                                            <></>
                                        }
                                    </div>
                                    <p className="mt-3">{notifi?.content}</p>
                                    <div className="flex text-base mt-2"> 
                                        <p className="font-semibold">{notifi?.title === "Duyệt đơn mua credit" ? "Người mua:" : "Người đăng:" }</p>
                                        <p className="ml-2">{notifi?.userId?.userName}</p>
                                    </div>
                                    <p className="text-gray-300">{moment(notifi?.createDate).fromNow()}</p>
                                </div>
                            </Link>
                            {
                                isHover && indexHover.split("-")[0] === notifi?._id ? 
                                <div 
                                    className="w-7 h-7 absolute bottom-3 right-1 bg-white hover:bg-primary-800 
                                    group rounded-full flex shadow-covered z-100 cursor-pointer"
                                    >
                                        <Popover 
                                            content={() => contentDeleteNotification(notifi?._id?.toString())} 
                                            trigger="click"
                                            placement="leftBottom"
                                        >
                                            <BsThreeDots className="m-auto text-[17px] block text-primary-800 group-hover:text-white"/>
                                        </Popover>
                                </div> : 
                                <></>
                            }
                        </div>
                    )
                })}
                
            </>
        )
    }

    const handleSeen = async (id:string) => {
        const body = {
            _id:id
        }
        const result = await dispatch(notifiAction.updateNotification(body))
        if(result?.payload?.uniqueCode === 1) {
            setClickSeenNotifi(result?.payload?.data)
        }
    }

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Chưa xem',
          children: 
          <div>
                {notificationChildren(notSeenNotifi, totalNotSeenNotifi)}
                { notSeenNotifi.length !== totalNotSeenNotifi ?
                    <PrimaryButton
                        className="w-full sm:w-1/3 lg:w-max !py-1.5 px-5 mx-auto"
                        content="Xem thêm"
                        onClick={() => setPageSizeNotSeen(prevPageSize => prevPageSize + 10)}
                    ></PrimaryButton> :
                    <></>
                }
          </div>,
        },
        {
          key: '2',
          label: 'Đã xem',
          children: 
            <div>
                {notificationChildren(seenNotifi, totalSeenNotifi)}
                {
                    seenNotifi.length !== totalSeenNotifi  ?
                    <PrimaryButton
                        className="w-full sm:w-1/3 lg:w-max !py-1.5 px-5 mx-auto"
                        content="Xem thêm"
                        onClick={() => setPageSizeSeen(prevPageSize => prevPageSize + 10)}
                    ></PrimaryButton> :
                    <></>
                }
            </div>
        },
        {
          key: '3',
          label: 'Tất cả',
          children: 
            <div>
                {notificationChildren(allNotifi, totalAllNotifi)}
                {
                    allNotifi.length !== totalAllNotifi ?
                    <PrimaryButton
                        className="w-full sm:w-1/3 lg:w-max !py-1.5 px-5 mx-auto"
                        content="Xem thêm"
                        onClick={() => setPageSizeAll(prevPageSize => prevPageSize + 10)}
                    ></PrimaryButton> :
                    <></>
                }
            </div>
        },
      ];

    useEffect (() => {
        (
            async () => {
                if (userInfo?.role === ROLES.ADMIN) {
                    const dataAllNotifi = await dispatch(notifiAction.getAllNotification({pageIndex, pageSizeAll}));
                    if (dataAllNotifi?.payload?.uniqueCode === 1) {
                        setAllNotifi(dataAllNotifi?.payload?.data);
                        setTotalAllNotifi(dataAllNotifi?.payload?.total)
                    }

                    const dataNotSeenNotifi = await dispatch(notifiAction.getNotSeenNotification(
                        {
                            isSeen: false,
                            pageIndex, 
                            pageSizeNotSeen
                        }
                    ));
                    if (dataNotSeenNotifi?.payload?.uniqueCode === 1) {
                        setNotSeenNotifi(dataNotSeenNotifi?.payload?.data);
                        setTotalNotSeenNotifi(dataNotSeenNotifi?.payload?.total)
                    }

                    const dataSeenNotifi = await dispatch(notifiAction.getSeenNotification( {
                        isSeen: true,
                        pageIndex, 
                        pageSizeSeen
                    }));
                    if (dataSeenNotifi?.payload?.uniqueCode === 1) {
                        setSeenNotifi(dataSeenNotifi?.payload?.data);
                        setTotalSeenNotifi(dataSeenNotifi?.payload?.total)
                    }
                    setCheckNoti(null);
                    setCheckNotification(null);
                    setClickSeenNotifi(null);
                }
            }
        )();
    },[
        clickSeenNotifi, 
        userInfo?.role, 
        pageSizeAll, 
        pageSizeNotSeen, 
        pageSizeSeen, 
        socket,
        checkNoti,
        checkNotification
    ]);

    useEffect (() => {
        socket.on('connect', () => {
            console.log('connected')
        });
        socket.on("onNotification", (data:any) => {
            const newPost = data?.content;
            setCheckNoti(newPost);
        });

        return () => {
            console.log('disconnect');
            socket.off('connect');
            socket.off('onNotification');
        }
    }, [allNotifi,notSeenNotifi])

    return (
        userInfo?.role === ROLES.ADMIN ?
            <Popover 
                trigger="click" 
                placement="bottom" 
                title="Thông báo" 
                content={contentNotification} 
                overlayStyle = {{minWidth:"335px", maxWidth:"335px"}}
                overlayInnerStyle={{maxHeight:"90vh", overflowY:"auto", fontSize: "22px"}}
            >
                <div className="bg-gray-300 w-[40px] h-[40px] rounded-full flex ml-auto mr-2 shadow-covered relative">
                    <BsFillBellFill className="text-2xl mx-auto my-auto text-primary-800 cursor-pointer hover:text-primary-600"/>
                        {
                            totalNotSeenNotifi !== 0 ? 
                            <div className="bg-red-600 rounded-full w-[21px] h-[21px]  absolute text-white -right-1 -top-2 flex">
                                <div className="text-[11px] m-auto">{totalNotSeenNotifi > 50 ? "50+" : totalNotSeenNotifi}</div> 
                            </div> : 
                            <></>
                        }
                </div>
            </Popover> :
            <div className="ml-auto"></div>
    );
};
export default Notification;
