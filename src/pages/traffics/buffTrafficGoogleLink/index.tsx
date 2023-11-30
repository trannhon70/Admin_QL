import { useState } from "react";
import ManageMenu from "components/manageMenu";
import ComponentMakeProgressGoogleLink from "./ComponentMakeProgressGoogleLink";
import ComponentOrderdiaryGoogleLink from "./ComponentOrderdiaryGoogleLink";

const BuffTrafficGoogleLink = () => {
  const [active, setActive] = useState<number>(1);
  const renderComponent = (value: number) => {
    switch (value) {
      case 1:
        return <ComponentMakeProgressGoogleLink />;
      case 2:
        return <ComponentOrderdiaryGoogleLink />;
      default:
        return null;
    }
  };
  return (
    <div className="p-4">
      <div className="text-cyan-700 font-bold text-lg">Google user Link</div>
      <ManageMenu active={active} setActive={setActive} />

      <div>{renderComponent(active)}</div>
    </div>
  );
};

export default BuffTrafficGoogleLink;
