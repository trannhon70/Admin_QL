import ManageMenu from "components/manageMenu";
import { useState } from "react";
import ComponentMakeProgressGoogleMapImage from "./ComponentMakeProgressGoogleMapImage";
import ComponentOrderdiaryGoogleMapImgage from "./ComponentOrderdiaryGoogleMapImgage";

const GoogleMapBuffImage = () => {
  const [active, setActive] = useState<number>(1);

  const renderComponent = (value: number) => {
    switch (value) {
      case 1:
        return <ComponentMakeProgressGoogleMapImage />;
      case 2:
        return <ComponentOrderdiaryGoogleMapImgage />;
      default:
        return null;
    }
  };
  return (
    <div className="p-4">
      <div className="text-cyan-700 font-bold text-lg">REVIEW MAP IMAGE</div>
      <ManageMenu active={active} setActive={setActive} />

      <div>{renderComponent(active)}</div>
    </div>
  );
};

export default GoogleMapBuffImage;
