import ManageMenu from "components/manageMenu";
import { useState } from "react";
import ComponentMakeProgressSearchAndRateAppImage from "./ComponentMakeProgressSearchAndRateAppImage";
import ComponentOrderdiarySearchAndRateAppImage from "./ComponentOrderdiarySearchAndRateAppImage";

const SearchAndRateAppImage = () => {
  const [active, setActive] = useState<number>(1);

  const renderComponent = (value: number) => {
    switch (value) {
      case 1:
        return <ComponentMakeProgressSearchAndRateAppImage />;
      case 2:
        return <ComponentOrderdiarySearchAndRateAppImage />;
      default:
        return null;
    }
  };
  return (
    <div className="p-4">
      <div className="text-cyan-700 font-bold text-lg uppercase">
        Tìm kiếm và đánh giá app kèm hình ảnh
      </div>
      <ManageMenu active={active} setActive={setActive} />

      <div>{renderComponent(active)}</div>
    </div>
  );
};

export default SearchAndRateAppImage;
