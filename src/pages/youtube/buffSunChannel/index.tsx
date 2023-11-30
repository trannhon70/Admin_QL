import { useState } from "react";
import ComponentMakeProgress from "./ComponentMakeProgress";
import ComponentOrderdiary from "./ComponentOrderdiary";
import ManageMenu from "components/manageMenu";

const BuffSubChannel = () => {
  const [active, setActive] = useState<number>(1);

  const renderComponent = (value: number) => {
    switch (value) {
      case 1:
        return <ComponentMakeProgress />;
      case 2:
        return <ComponentOrderdiary />;
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

export default BuffSubChannel;
