export const FormatNumberVND = (value: any) => {
  return value?.toLocaleString("vi", { style: "currency", currency: "VND" });
};
// pending', 'newRedo', 'approved', 'error'
export const renderStatus = (value: string) => {
  switch (value) {
    case "pending":
      return "Chờ duyệt";
    case "newRedo":
      return "Cần làm lại";
    case "approved":
      return "Đã duyệt";
    case "error":
      return "Lỗi";
    default:
      return null;
  }
};

export const OptionStatus = [
  { value: "", label: "Tất cả" },
  { value: "pending", label: "Chờ duyệt" },
  { value: "newRedo", label: "Cần làm lại" },
  { value: "approved", label: "Đã duyệt" },
  { value: "error", label: "bị lỗi" },
];

export const validateEmail = (email : any) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
