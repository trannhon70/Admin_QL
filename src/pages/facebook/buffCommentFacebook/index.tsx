import { useState } from "react";
import ManageMenu from "components/manageMenu";
import ComponentMakeProgressFacebookComment from "./ComponentMakeProgressFacebookComment";
import ComponentOrderdiaryFacebookComment from "./ComponentOrderdiaryFacebookComment";
const BuffCommentFacebook = () => {
  const [active, setActive] = useState<number>(1);
  const renderComponent = (value: number) => {
    switch (value) {
      case 1:
        return <ComponentMakeProgressFacebookComment />;
      case 2:
        return <ComponentOrderdiaryFacebookComment />;
      default:
        return null;
    }
  };
  return (
    <div className="p-4">
      <div className="text-cyan-700 font-bold text-lg">
        BUFF COMMENT FACEBOOK
      </div>
      <ManageMenu active={active} setActive={setActive} />

      <div>{renderComponent(active)}</div>
    </div>
  );
};

export default BuffCommentFacebook;
