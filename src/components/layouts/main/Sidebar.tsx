import { useEffect, useState } from "react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, useLocation } from "react-router-dom";

import logo from "assets/images/logo.svg";
import { MenuData, MenuItemType, ChildMenuItemType } from "./MenuData";
import { useSelector } from "react-redux";

const Sidebar = ({ collapsed }: any) => {
  const location = useLocation();
  const [currentKey, seCurrentKey] = useState([""]);
  const userInfo = useSelector((state: any) => state.user.currentUser);

  const getItems = (items: Array<MenuItemType>) => {
    const result: any[] = [];
    items.forEach((val: MenuItemType) => {
      const children: any[] = [];
      val.children.forEach((child) => {
        if (!child.permission || userInfo?.role === child.permission) {
          children.push({
            ...child,
            key: child.id,
            label: <Link to={child.link}>{child.label}</Link>,
          });
        }
      });
      if (!val?.permission || val?.permission === userInfo?.role) {
        result.push({
          key: val.id,
          icon: val.icon,
          label: val.label,
          children,
        });
      }
    });
    return result;
  };

  const getChildItems = (
    items: Array<MenuItemType>
  ): Array<ChildMenuItemType> => {
    const children: Array<ChildMenuItemType> = [];
    items.forEach((item: any) => {
      children.push(...item.children);
    });
    return children;
  };

  useEffect(() => {
    const childrenItems: Array<ChildMenuItemType> = getChildItems(MenuData);
    const currentPath = location.pathname;

    const activeKeys = childrenItems.filter((val: any) =>
      currentPath.includes(val.link)
    );
    if (activeKeys.length) seCurrentKey([activeKeys[0].id]);
    else seCurrentKey([""]);
  }, [location]);

  const items = getItems(MenuData);
  return (
    <>
      <Sider
        className="border-r border-gray-300"
        style={{ background: "#FFF" }}
        trigger={null}
        collapsible
        width={280}
        collapsed={collapsed}
      >
        <div className="flex items-center py-6 px-6">
          <img src={logo} alt="logo.svg"></img>
          <span
            className={`text-base font-medium
                    ${
                      collapsed
                        ? "transition duration-300 opacity-0"
                        : "transition duration-300 opacity-1"
                    }`}
          >
            CONGDONG
            <span className="font-bold text-primary-900">SEO</span>
          </span>
        </div>

        <Menu
          theme="light"
          mode="inline"
          style={{ fontWeight: 600, border: "none" }}
          selectedKeys={currentKey}
          items={items}
        />
      </Sider>
    </>
  );
};
export default Sidebar;
