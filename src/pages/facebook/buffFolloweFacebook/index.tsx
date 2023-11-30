import { useState } from "react";
import ManageMenu from "components/manageMenu";
import ComponentMakeProgressFacebook from "./ComponentMakeProgressFacebook";
import ComponentOrderdiaryFacebook from "./ComponentOrderdiaryFacebook";
const BuffFollowFacebook = () => {
  const [active, setActive] = useState<number>(1);
  const renderComponent = (value: number) => {
    switch (value) {
      case 1:
        return <ComponentMakeProgressFacebook />;
      case 2:
        return <ComponentOrderdiaryFacebook />;
      default:
        return null;
    }
  };
  return (
    <div className="p-4">
      <div className="text-cyan-700 font-bold text-lg">
        BUFF FOLLOW FACEBOOK
      </div>
      <ManageMenu active={active} setActive={setActive} />

      <div>{renderComponent(active)}</div>
    </div>
  );
};

export default BuffFollowFacebook;
