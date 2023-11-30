import { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineEdit, AiOutlineUserAdd } from "react-icons/ai";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { format } from "date-fns";
import { Breadcrumb, Select } from "antd";
import { BiImageAdd } from "react-icons/bi";
import * as Yup from "yup";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import { userAction } from "redux/user/user.slice";
import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import defaultAvatar from "assets/images/avatar/default.jpg";
import { ACCOUNT_TYPES, GenderConst, ROLES } from "common/constant";
import { appAction } from "redux/app/app.slice";

function CreateAccount() {
    const dispatch = useDispatch<any>();
    const [accountType, setAccountType] = useState(0);
    const [avatarUrl, seAvatarUrl] = useState<any>("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const createAccount: any = {
        0: (values: any) => dispatch(userAction.createUser(values)),
        1: (values: any) =>
            dispatch(userAction.createAdmin({ ...values, role: ROLES.USER })),
        2: (values: any) =>
            dispatch(userAction.createAdmin({ ...values, role: ROLES.ADMIN })),
    };

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileSelected = e.currentTarget.files?.[0];
        if (typeof fileSelected === "undefined") return;

        const reader = new FileReader();
        reader.onloadend = () => {
            seAvatarUrl(reader.result);
        };
        if (fileSelected.type.match(/image.*/)) {
            setAvatarFile(fileSelected);
            reader.readAsDataURL(fileSelected);
        }
    };

    const handleUploadFile = async (file: File | null) => {
        try {
            const formData = new FormData();
            if (file) formData.append("file", file);

            // call api upload
            const uploadResult = await dispatch(appAction.uploadFile(formData));
            return uploadResult.payload.data.url;
        } catch (err) {
            throw new Error("Upload fail");
        }
    };

    const formik = useFormik({
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,
        validateOnMount: false,
        initialValues: {
            userName: "",
            dateOfBirth: null,
            fullName: "",
            facebook: "",
            email: "",
            phoneNumber: "",
            address: "",
            gender: GenderConst.orther,
        },
        validationSchema: Yup.object({
            userName: Yup.string().required("* Required"),
            fullName: Yup.string().required("* Required"),
            email: Yup.string().required("* Required").email("Invalid email"),
            phoneNumber: Yup.string().matches(
                /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                "Invalid phone number"
            ),
        }),
        onSubmit: async (values: any) => {
            setIsLoading(true);

            try {
                let avatarUpload = "";
                if (avatarUrl) {
                    avatarUpload = await handleUploadFile(avatarFile);
                }
                const result = createAccount[accountType]({
                    ...values,
                    avatar: avatarUpload,
                });
                result.then((data: any) => {
                    setIsLoading(false);
                    if (data.error) {
                        toast.error(data?.error?.message || "Create Fail");
                        return;
                    }
                    //
                    toast.success(data.message || "Create Successfully");
                });
            } catch (error) {
                toast.error("Create Fail");
                setIsLoading(false);
            }
        },
    });

    return (
       <div className="relative h-full p-4">
          <FullPageSpiner isLoading={isLoading} />
          <div className="mb-4">
             <Breadcrumb items={[{ title: "Quản lý thành viên" }, { title: "Thêm thành viên" }]}></Breadcrumb>
          </div>
          <h3 className="font-semibold my-4">Thêm thành viên</h3>

          <div className="grid grid-cols-4 border border-gray-300 bg-white rounded-xl p-6 sm:p-12">
             <div className="col-span-4 md:col-span-1 mb-8">
                <div className="relative aspect-square max-h-40 mx-auto mb-5">
                   <img
                      src={avatarUrl || defaultAvatar}
                      alt="user-avatar"
                      className="absolute rounded-full w-full h-full object-cover"
                   ></img>

                   <div className="absolute flex items-center justify-center h-full w-full">
                      <input
                         id="input-avatar"
                         type="file"
                         className="hidden"
                         name="avatar"
                         accept="image/*"
                         onChange={handleSelectFile}
                      ></input>
                      <label
                         htmlFor="input-avatar"
                         className="flex items-center justify-center bg-gray-300 opacity-0 hover:opacity-50 rounded-full h-full w-full"
                      >
                         <BiImageAdd size={50} className="text-gray-400" />
                      </label>

                      <label htmlFor="input-avatar" className="absolute right-1 bottom-1">
                         <AiOutlineEdit size={20} />
                      </label>
                   </div>
                </div>

                <div className="flex justify-center items-center py-1.5">
                   <div className="me-5">
                      <input
                         id="male-check-box"
                         type="radio"
                         name="gender"
                         className="accent-primary-300 me-2"
                         checked={GenderConst.male === formik.values.gender}
                         onChange={() => {
                            formik.setFieldValue("gender", GenderConst.male);
                         }}
                      ></input>
                      <label htmlFor="male-check-box">Nam</label>
                   </div>
                   <div className="me-5">
                      <input
                         id="fermale-check-box"
                         type="radio"
                         name="gender"
                         checked={GenderConst.fermale === formik.values.gender}
                         onChange={() => {
                            formik.setFieldValue("gender", GenderConst.fermale);
                         }}
                         className="accent-primary-300 me-2"
                      ></input>
                      <label htmlFor="fermale-check-box">Nữ</label>
                   </div>
                   <div>
                      <input
                         id="orther-check-box"
                         type="radio"
                         name="gender"
                         checked={GenderConst.orther === formik.values.gender}
                         onChange={() => {
                            formik.setFieldValue("gender", GenderConst.orther);
                         }}
                         className="accent-primary-300 me-2"
                      ></input>
                      <label htmlFor="orther-check-box">Khác</label>
                   </div>
                </div>
             </div>
             <form onSubmit={formik.handleSubmit} className="col-span-4 md:col-span-3 flex justify-center sm:px-6">
                <div className="flex flex-col w-full max-w-4xl gap-y-4">
                   <div className="flex flex-wrap sm:flex-nowrap gap-x-8 gap-y-6 w-full">
                      <div className="w-full sm:w-1/2">
                         <label htmlFor="input-username" className="line-clamp-1 text-base font-semibold mb-1">
                            Tên đăng nhập{" "}
                            {formik.errors.userName && formik.touched.userName && (
                               <i className="text-sm text-red-500">{formik.errors.userName.toString()}</i>
                            )}
                         </label>

                         <input
                            id="input-username"
                            name="userName"
                            className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                         ></input>
                      </div>

                      <div className="w-full sm:w-1/2">
                         <label htmlFor="input-email" className="line-clamp-1 text-base font-semibold mb-1">
                            Email{" "}
                            {formik.errors.email && formik.touched.email && (
                               <i className="text-sm text-red-500">{formik.errors.email.toString()}</i>
                            )}
                         </label>
                         <input
                            name="email"
                            id="input-email"
                            className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                         ></input>
                      </div>
                   </div>

                   <div className="flex flex-wrap sm:flex-nowrap gap-x-8 gap-y-6 w-full">
                      <div className="w-full sm:w-1/2">
                         <label htmlFor="input-fullname" className="line-clamp-1 text-base font-semibold mb-1">
                            Họ tên{" "}
                            {formik.errors.fullName && formik.touched.fullName && (
                               <i className="text-sm text-red-500">{formik.errors.fullName.toString()}</i>
                            )}
                         </label>
                         <input
                            name="fullName"
                            id="input-fullname"
                            className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                         ></input>
                      </div>

                      <div className="w-full sm:w-1/2">
                         <label htmlFor="input-dateOfBirth" className="line-clamp-1 text-base font-semibold mb-1">
                            Ngày sinh
                         </label>
                         <input
                            id="input-dateOfBirth"
                            type="date"
                            name="dateOfBirth"
                            className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                            value={
                               formik.values.dateOfBirth
                                  ? format(new Date(formik.values.dateOfBirth), "yyyy-MM-dd")
                                  : ""
                            }
                            onChange={formik.handleChange}
                         ></input>
                      </div>
                   </div>

                   <div className="flex flex-wrap sm:flex-nowrap gap-x-8 gap-y-6 w-full">
                      <div className="w-full sm:w-1/2">
                         <label htmlFor="input-phone" className="line-clamp-1 text-base font-semibold mb-1">
                            Số điện thoại{" "}
                            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                               <i className="text-sm text-red-500">{formik.errors.phoneNumber.toString()}</i>
                            )}
                         </label>
                         <input
                            id="input-phone"
                            name="phoneNumber"
                            className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                            onChange={formik.handleChange}
                            value={formik.values.phoneNumber}
                         ></input>
                      </div>

                      <div className="w-full sm:w-1/2">
                         <label htmlFor="input-facebook" className="line-clamp-1 text-base font-semibold mb-1">
                            Facebook
                         </label>
                         <input
                            name="facebook"
                            id="input-facebook"
                            className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                            value={formik.values.facebook}
                            onChange={formik.handleChange}
                         ></input>
                      </div>
                   </div>

                   <div className="flex flex-wrap sm:flex-nowrap w-full">
                      <div className="w-full">
                         <label htmlFor="select-account-type" className="line-clamp-1 text-base font-semibold mb-1">
                            Loại tài khoản
                         </label>
                         <Select
                            id="select-account-type"
                            allowClear
                            placeholder="Loại tài khoản"
                            className="w-full [&>div]:!h-9 [&>div]:!py-1"
                            value={accountType}
                            options={ACCOUNT_TYPES}
                            onChange={(value) => {
                               setAccountType(value);
                            }}
                         />
                      </div>
                   </div>

                   <div className="flex flex-wrap sm:flex-nowrap w-full mb-8">
                      <div className="w-full">
                         <label htmlFor="input-address" className="line-clamp-1 text-base font-semibold mb-1">
                            Địa chỉ
                         </label>
                         <input
                            name="address"
                            id="input-address"
                            className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                            onChange={formik.handleChange}
                            value={formik.values.address}
                         ></input>
                      </div>
                   </div>

                   <div className="flex flex-wrap w-full">
                      <PrimaryButton
                         content="Tạo tài khoản"
                         type="submit"
                         icon={<AiOutlineUserAdd className="text-xl me-2" />}
                      />
                   </div>
                </div>
             </form>
          </div>
       </div>
    );
}
export default CreateAccount;
