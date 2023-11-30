import ManageMenu from "components/manageMenu";
import { useState } from "react";
import ComponentMakeProgressCommentYoutube from "./ComponentMakeProgressCommentYoutube";
import ComponentOrderdiaryCommentYoutube from "./ComponentOrderdiaryCommentYoutube";
const BuffCommentYoutube = () => {
  const [active, setActive] = useState<number>(1);

  const renderComponent = (value: number) => {
    switch (value) {
      case 1:
        return <ComponentMakeProgressCommentYoutube />;
      case 2:
        return <ComponentOrderdiaryCommentYoutube />;
      default:
        return null;
    }
  };
  return (
    <div className="p-4">
      <div className="text-cyan-700 font-bold text-lg">
        BUFF COMMENT YOUTUBE
      </div>
      <ManageMenu active={active} setActive={setActive} />

      <div>{renderComponent(active)}</div>
    </div>
  );
};

export default BuffCommentYoutube;
