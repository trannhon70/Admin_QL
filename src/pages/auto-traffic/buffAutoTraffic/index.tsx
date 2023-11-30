import { useEffect, useState } from "react";
import ManageMenu from "components/manageMenu";
import MakeProgressAutoTraffic from "./MakeProgressAutoTraffic";
import OrderdiaryAutoTraffic from "./OrderdiaryAutoTraffic";
import { LOCAL_STORAGE } from "helper/storage.helper";
const BuffAutoTraffic = () => {
  const [active, setActive] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<any>()
  const renderComponent = (value: number) => {
    switch (value) {
      case 1:
        return <MakeProgressAutoTraffic />;
      case 2:
        return <OrderdiaryAutoTraffic/>;
      default:
        return null;
    }
  };
  useEffect(() => {
    const result = LOCAL_STORAGE.getCurrentUser();
    setUserInfo(result);
 }, []);
  return (
    <div className="p-4">
      <div className="text-cyan-700 font-bold text-lg">TẠO NHIỆM VỤ TĂNG TRAFFIC TỰ ĐỘNG</div>
      <ManageMenu active={active} setActive={setActive} />

      <div>{renderComponent(active)}</div>
    </div>
  );
};

export default BuffAutoTraffic;
