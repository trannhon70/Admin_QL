import ManageMenu from "components/manageMenu";
import { useState } from "react";
import ComponentMakeProgressTiktok from "./ComponentMakeProgressTiktok";
import ComponentOrderdiaryTiktok from "./ComponentOrderdiaryTiktok";

const BuffsubChannelTiktok = () => {
  const [active, setActive] = useState<number>(1);

  const renderComponent = (value: number) => {
    switch (value) {
      case 1:
        return <ComponentMakeProgressTiktok />;
      case 2:
        return <ComponentOrderdiaryTiktok />;
      default:
        return null;
    }
  };
  return (
    <div className="p-4">
      <div className="text-cyan-700 font-bold text-lg">BUFF FOLLOW TIKTOK </div>
      <ManageMenu active={active} setActive={setActive} />

      <div>{renderComponent(active)}</div>
    </div>
  );
};

export default BuffsubChannelTiktok;
