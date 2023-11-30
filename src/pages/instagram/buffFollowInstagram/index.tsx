import ManageMenu from "components/manageMenu";
import { useState } from "react";
import ComponentMakeProgressInstagram from "./ComponentMakeProgressInstagram";
import ComponentOrderdiaryInstagram from "./ComponentOrderdiaryInstagram";

const BuffFolloweInstagram = () => {
  const [active, setActive] = useState<number>(1);
  const renderComponent = (value: number) => {
    switch (value) {
      case 1:
        return <ComponentMakeProgressInstagram />;
      case 2:
        return <ComponentOrderdiaryInstagram />;
      default:
        return null;
    }
  };
  return (
    <div className="p-4">
      <div className="text-cyan-700 font-bold text-lg">
        BUFF FOLLOW INSTAGRAM{" "}
      </div>
      <ManageMenu active={active} setActive={setActive} />

      <div>{renderComponent(active)}</div>
    </div>
  );
};

export default BuffFolloweInstagram;
