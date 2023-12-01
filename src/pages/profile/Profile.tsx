import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEdit, AiOutlineKey } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import SecondaryButton from "components/ui/button/SecondaryButton";
// import { appAction } from "redux/app/app.slice";
import { userAction } from "redux/user/user.slice";
import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import { GenderConst } from "common/constant";
import defaultAvatar from "assets/images/avatar/default.jpg";
import { format } from "date-fns";
import ChangePassword from "./ChangePassword";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const userInfo = useSelector((state: any) => state.user.currentUser);
  const isLoading: boolean =
    useSelector((state: any) => state.user.isLoading) || false;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, seAvatarUrl] = useState<any>("");

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
      // const uploadResult = await dispatch(appAction.uploadFile(formData));
      // return uploadResult.payload.data.url;
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
      userName: userInfo?.userName || "",
      dateOfBirth: userInfo?.dateOfBirth || null,
      fullName: userInfo?.fullName || "",
      facebook: userInfo?.facebook || "",
      email: userInfo?.email || "",
      phoneNumber: userInfo?.phoneNumber || "",
      address: userInfo?.address || "",
      gender:
        !userInfo?.gender && userInfo?.gender !== 0
          ? GenderConst.orther
          : userInfo?.gender,
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
      try {
        let avatarUpload = userInfo?.avatar;
        if (avatarUrl && avatarUrl !== userInfo?.avatar) {
          avatarUpload = await handleUploadFile(avatarFile);
        }
        const result = dispatch(
         //  userAction.updateProfile({
         //    ...values,
         //    avatar: avatarUpload,
         //  })
        );
        result.then((data: any) => {
          if (data.error) {
            toast.error(data?.error?.message || "Update Fail");
            return;
          }
          //
          toast.success(data.message || "Update Successfully");
         //  dispatch(userAction.getProfile());
        });
      } catch (error) {
        toast.error("Update Fail");
      }
    },
  });

  return (
     <div className="relative h-full p-4">
        <FullPageSpiner isLoading={isLoading} />

        <div className="flex justify-between my-4">
           <h3 className="font-semibold">Thông tin Tài khoản</h3>

           <SecondaryButton
              className="hover:border-yellow-500"
              background="bg-white hover:bg-yellow-400"
              content="Nạp tiền"
              onClick={() => navigate("/nap-tien")}
              icon={<RiMoneyEuroCircleLine className="me-2" size={20} />}
           />
        </div>

        <div className="grid grid-cols-4 border border-gray-300 bg-white rounded-xl p-6 sm:p-12">
           <div className="col-span-4 md:col-span-1 mb-8">
              <div className="relative aspect-square max-h-40 mx-auto mb-5">
                 <img
                    src={avatarUrl || userInfo?.avatar || defaultAvatar}
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

              <div className="flex justify-center mb-5">
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

              <div>
                 <h5 className="text-center">
                    Số dư: <b>{new Intl.NumberFormat("vi").format(userInfo?.money || 0)}</b> VND
                 </h5>
              </div>
           </div>
           <form onSubmit={formik.handleSubmit} className="col-span-4 md:col-span-3 flex justify-center sm:px-6">
              <div className="flex flex-col w-full max-w-4xl gap-y-6">
                 <div className="flex flex-wrap sm:flex-nowrap w-full gap-x-8 gap-y-6">
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
                       <label htmlFor="input-dateOfBirth" className="line-clamp-1 text-base font-semibold mb-1">
                          Ngày sinh
                       </label>
                       <input
                          id="input-dateOfBirth"
                          type="date"
                          name="dateOfBirth"
                          className="text-gray-500 border border-gray-300 rounded-md w-full px-3 py-2"
                          value={
                             formik.values.dateOfBirth ? format(new Date(formik.values.dateOfBirth), "yyyy-MM-dd") : ""
                          }
                          onChange={formik.handleChange}
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

                 <div className="flex flex-wrap sm:flex-nowrap w-full gap-x-8 gap-y-6">
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

                 <div className="flex flex-wrap gap-4 w-full">
                    <PrimaryButton content="Cập nhật" type="submit" icon={<BsUpload className="text-xl me-2" />} />

                    <ChangePassword
                       showButton={
                          <SecondaryButton
                             content="Đổi mật khẩu"
                             type="button"
                             onClick={() => setIsModalOpen(true)}
                             icon={<AiOutlineKey className="text-xl me-2" />}
                          />
                       }
                       isModalOpen={isModalOpen}
                       setIsModalOpen={setIsModalOpen}
                    />
                 </div>
              </div>
           </form>
        </div>
     </div>
  );
}
export default Profile;
