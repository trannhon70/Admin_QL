const NewsStatus = [
    {
        value: 1,
        label: "Đã duyệt",
    },
    {
        value: 2,
        label: "Chờ xét duyệt",
    },
    {
        value: 3,
        label: "Nháp",
    },
];

const NotificationType = [
    {
        value: 1,
        label: "Gửi qua chuông thông báo",
    },
    {
        value: 2,
        label: "Gửi qua email",
    },
    {
        value: 3,
        label: "Gửi qua chuông thông báo và email",
    },
];

const NotificationStatusType = [
    {
        value: 1,
        label: "Lưu nháp",
    },
    {
        value: 2,
        label: "Tạo và gửi thông báo",
    },
];

const PostsStatus = [
    {
        value: 1,
        label: "Đã duyệt",
    },
    {
        value: 2,
        label: "Chờ xét duyệt",
    },
    {
        value: 3,
        label: "Bài sửa chờ duyệt",
    },
];

const ReportStatus = [
    {
        value: 1,
        label: "Đã xử lý",
    },
    {
        value: 2,
        label: "Chưa xử lý",
    },
    {
        value: 3,
        label: "Chờ xác thực",
    },
];

const GenderConst = {
    male: 0,
    fermale: 1,
    orther: 2,
};

const AccountStatus = [
    {
        value: 0,
        label: "Chưa kích hoạt",
    },
    {
        value: 1,
        label: "Đã kích hoạt",
    },
    {
        value: 2,
        label: "Đã xóa",
    },
];

const ROLES = {
    ADMIN: "admin",
    USER: "user",
};

const ACCOUNT_TYPES = [
    {
        value: 0,
        label: "Người dùng congdongseo",
    },
    {
        value: 1,
        label: "Người dùng admin.congdongseo",
    },
    {
        value: 2,
        label: "Quản trị viên",
    },
];

const CARD_TOP_UP_STATUS = {
   PENDING: "pending",
   APPROVED: "approved",
   CANCELLED: "cancelled",
};

const WITHDRAW_STATUS = {
   PENDING: "pending",
   SUCCESS: "success",
   REJECT: "reject",
};

export { 
    NewsStatus, 
    PostsStatus, 
    ReportStatus, 
    GenderConst, 
    AccountStatus, 
    ROLES, 
    ACCOUNT_TYPES, 
    CARD_TOP_UP_STATUS, 
    WITHDRAW_STATUS, 
    NotificationType,
    NotificationStatusType 
};
