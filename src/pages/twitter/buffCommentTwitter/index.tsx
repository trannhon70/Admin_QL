import ManageMenu from "components/manageMenu";
import { useState } from "react";
import ComponentMakeProgressCommentTwitter from "./ComponentMakeProgressCommentTwitter";
import ComponentOrderdiaryCommentTwitter from "./ComponentOrderdiaryCommentTwitter";

const BuffCommentTwitter = () => {
  const [active, setActive] = useState<number>(1);

  const renderComponent = (value: number) => {
    switch (value) {
      case 1:
        return <ComponentMakeProgressCommentTwitter />;
      case 2:
        return <ComponentOrderdiaryCommentTwitter />;
      default:
        return null;
    }
  };
  return (
    <div className="p-4">
      <div className="text-cyan-700 font-bold text-lg">
        BUFF COMMENT TWITTER
      </div>
      <ManageMenu active={active} setActive={setActive} />

      <div>{renderComponent(active)}</div>
    </div>
  );
};

export default BuffCommentTwitter;
