import { Avatar, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordLine, RiMoneyEuroCircleLine } from "react-icons/ri";
import { AiOutlineLogout, AiOutlineUser, AiFillCaretDown } from "react-icons/ai";
import { useState, useEffect } from "react";

import type { MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userAction, setUser } from "redux/user/user.slice";
import ChangePassword from "pages/profile/ChangePassword";
import defaultAvatar from "assets/images/avatar/default.jpg";
import { getUser } from "redux/user/user.selector";

const AvatarGroup = (props: any) => {
   const navigate = useNavigate();
   const dispatch = useDispatch<any>();
   const userInfo = useSelector(getUser);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const onClick: MenuProps["onClick"] = async ({ key } : any) => {
      const handleClick: any = {
         "1": () => navigate("/thong-tin-tai-khoan"),
         "2": () => navigate("/nap-tien"),
         "3": () => setIsModalOpen(true),
         "4": () => {
            dispatch(userAction.logout({userId: userInfo.id}));
            dispatch(userAction.signOut());
            dispatch(setUser({}))
            navigate("/dang-nhap");
         },
      };
      handleClick?.[key]();
   };

   const hangdleOnClick = (e: any) => {
      e.preventDefault();
   };

useEffect(()=>{
   dispatch(userAction.getbyIdUser())
},[])

   const items: MenuProps["items"] = [
      {
         label: "Tài khoản",
         key: "1",
         icon: <AiOutlineUser size={18} />,
      },
      // {
      //    label: "Nạp tiền",
      //    key: "2",
      //    icon: <RiMoneyEuroCircleLine size={18} />,
      // },
      // {
      //    label: "Đổi mật khẩu",
      //    key: "3",
      //    icon: <RiLockPasswordLine size={17} />,
      // },
      {
         label: "Đăng xuất",
         key: "4",
         icon: <AiOutlineLogout size={17} />,
      },
   ];

   return (
      <>
         {props.hiddenDropdown === true ? (
            <></>
         ) : (
            <div style={{textAlign:"right", width:"100%"}}>
               <ChangePassword isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

               <Dropdown menu={{ items, onClick }} placement="bottomRight">
                  <button onClick={hangdleOnClick}>
                     <Space>
                        <Avatar src={userInfo?.avatar || defaultAvatar} size={38}></Avatar>
                        <div>
                           <p className="text-start text-sm font-medium">{userInfo?.name}</p>
                           <p className="text-start text-sm text-gray-500 font-medium uppercase">
                              {userInfo?.role?.name || "USER"}
                           </p>
                        </div>
                        <AiFillCaretDown />
                     </Space>
                  </button>
               </Dropdown>
            </div>
         )}
      </>
   );
};

export default AvatarGroup;
