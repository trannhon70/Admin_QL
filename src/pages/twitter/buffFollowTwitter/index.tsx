import ManageMenu from "components/manageMenu";
import { useState } from "react";
import ComponentMakeProgressTwitter from "./ComponentMakeProgressTwitter";
import ComponentOrderdiaryTwitter from "./ComponentOrderdiaryTwitter";

const BuffFollowTwitter = () => {
  const [active, setActive] = useState<number>(1);
  const renderComponent = (value: number) => {
    switch (value) {
      case 1:
        return <ComponentMakeProgressTwitter />;
      case 2:
        return <ComponentOrderdiaryTwitter />;
      default:
        return null;
    }
  };
  return (
    <div className="p-4">
      <div className="text-cyan-700 font-bold text-lg">
        BUFF FOLLOW TWITTER{" "}
      </div>
      <ManageMenu active={active} setActive={setActive} />

      <div>{renderComponent(active)}</div>
    </div>
  );
};

export default BuffFollowTwitter;
