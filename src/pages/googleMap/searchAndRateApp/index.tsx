import ManageMenu from "components/manageMenu";
import { useState } from "react";
import ComponentMakeProgressSearchAndRateApp from "./ComponentMakeProgressSearchAndRateApp";
import ComponentOrderdiarySearchAndRateApp from "./ComponentOrderdiarySearchAndRateApp";

const SearchAndRateApp = () => {
  const [active, setActive] = useState<number>(1);

  const renderComponent = (value: number) => {
    switch (value) {
      case 1:
        return <ComponentMakeProgressSearchAndRateApp />;
      case 2:
        return <ComponentOrderdiarySearchAndRateApp />;
      default:
        return null;
    }
  };
  return (
    <div className="p-4">
      <div className="text-cyan-700 font-bold text-lg uppercase">
        Tìm kiếm và đánh giá app
      </div>
      <ManageMenu active={active} setActive={setActive} />

      <div>{renderComponent(active)}</div>
    </div>
  );
};

export default SearchAndRateApp;
