import { useState } from "react";
import ManageMenu from "components/manageMenu";
import ComponentMakeProgressGoogleSearch from "./ComponentMakeProgressGoogleSearch";
import ComponentOrderdiaryGoogleSearch from "./ComponentOrderdiaryGoogleSearch";
const BuffTrafficGoogleSearch = () => {
  const [active, setActive] = useState<number>(1);
  const renderComponent = (value: number) => {
    switch (value) {
      case 1:
        return <ComponentMakeProgressGoogleSearch />;
      case 2:
        return <ComponentOrderdiaryGoogleSearch />;
      default:
        return null;
    }
  };
  return (
    <div className="p-4">
      <div className="text-cyan-700 font-bold text-lg">BUFF SUB CHANNEL</div>
      <ManageMenu active={active} setActive={setActive} />

      <div>{renderComponent(active)}</div>
    </div>
  );
};

export default BuffTrafficGoogleSearch;
