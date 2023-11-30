import ManageMenu from "components/manageMenu";
import { useState } from "react";
import ComponentMakeProgressGoogleMap from "./ComponentMakeProgressGoogleMap";
import ComponentOrderdiaryGoogleMap from "./ComponentOrderdiaryGoogleMap";

const BuffGoogleMap = () => {
  const [active, setActive] = useState<number>(1);

  const renderComponent = (value: number) => {
    switch (value) {
      case 1:
        return <ComponentMakeProgressGoogleMap />;
      case 2:
        return <ComponentOrderdiaryGoogleMap />;
      default:
        return null;
    }
  };
  return (
    <div className="p-4">
      <div className="text-cyan-700 font-bold text-lg">REVIEW MAP</div>
      <ManageMenu active={active} setActive={setActive} />

      <div>{renderComponent(active)}</div>
    </div>
  );
};

export default BuffGoogleMap;
