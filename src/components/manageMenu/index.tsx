interface IProps {
  active?: number;
  setActive?: (value?: any) => void;
}

const ManageMenu = (props: IProps) => {
  const { active, setActive } = props;
  return (
    <div className="flex mt-2">
      <div
        className={
          active === 1
            ? "mr-5 flex-none text-cyan-700 font-bold text-lg border-b-4 border-cyan-700 pb-1 cursor-pointer"
            : "mr-5 flex-none text-cyan-700 font-medium text-lg cursor-pointer"
        }
        onClick={() => {
          setActive && setActive(1);
        }}
      >
        Tạo tiến trình
      </div>
      <div
        className={
          active === 2
            ? " flex-none text-cyan-700 font-bold text-lg border-b-4 border-cyan-700 pb-1 cursor-pointer"
            : "flex-none text-cyan-700 font-medium text-lg cursor-pointer"
        }
        onClick={() => {
          setActive && setActive(2);
        }}
      >
        Nhật ký Order
      </div>
    </div>
  );
};

export default ManageMenu;
