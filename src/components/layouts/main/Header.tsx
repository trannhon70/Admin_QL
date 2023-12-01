import { MdOutlineSort, MdMenu } from "react-icons/md";
import { Button } from "antd";
import AvatarGroup from "components/ui/avatar/AvatarGroup";
import { useEffect, useState } from "react";


const Header = ({ collapsed, setCollapsed }: any) => {
    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }
    const [screenSize, setScreenSize] = useState(getCurrentDimension());
    if (screenSize.width < 1000 && !collapsed) setCollapsed(true);

    useEffect(() => {
        const updateDimension = () => {
            const screenSize = getCurrentDimension();
            if (screenSize.width < 1000 && !collapsed) setCollapsed(true);

            setScreenSize(screenSize);
        };
        window.addEventListener("resize", updateDimension);

        return () => {
            window.removeEventListener("resize", updateDimension);
        };
    }, [screenSize]);

    return (
        <div className="flex border-b border-gray-300 bg-white py-6 px-4  ">
            <Button
                type="text"
                icon={
                    collapsed ? (
                        <MdMenu size={25} />
                    ) : (
                        <MdOutlineSort size={25} />
                    )
                }
                onClick={() => setCollapsed(!collapsed)}
            />
            <div ></div>
         
            <AvatarGroup></AvatarGroup>
        </div>
    );
};
export default Header;
