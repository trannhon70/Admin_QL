import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { format } from "date-fns";
import { BiImageAdd } from "react-icons/bi";
import { Breadcrumb, InputNumber } from "antd";
import { AiOutlineEdit, AiOutlineKey, AiOutlineUnlock, AiOutlineUserDelete } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";
import { BsUpload } from "react-icons/bs";
import * as Yup from "yup";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import { userAction } from "redux/user/user.slice";
import FullPageSpiner from "components/ui/spiner/FullPageSpiner";
import { GenderConst } from "common/constant";
import SetPasswordModal from "./components/SetPasswordModal";
import SecondaryButton from "components/ui/button/SecondaryButton";
import defaultAvatar from "assets/images/avatar/default.jpg";
import { appAction } from "redux/app/app.slice";
import TopUpRequestModal from "./components/TopUpRequestModal";
import TopUpModal from "./components/TopUpModal";

function UpdateUser() {
   const dispatch = useDispatch<any>();
   const navigate = useNavigate();
   const { username } = useParams();
   const location = useLocation();

   const [isLoading, setIsLoading] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [avatarUrl, seAvatarUrl] = useState<any>("");
   const [avatarFile, setAvatarFile] = useState<File | null>(null);
   const [memberType, setMemberType] = useState<number>(0);
   const userInfo = useSelector((state: any) => state.user.updateUser);

   const getInfo: any = {
      0: (username: string) => dispatch(userAction.getOne(username)),
      1: (username: string) => dispatch(userAction.getAdmin(username)),
   };
   const updateInfo: any = {
      0: (payload: any) =>
         dispatch(
            userAction.updateUser({
               ...payload,
               moneySurplus: payload?.accountBalance,
            })
         ),
      1: (payload: any) =>
         dispatch(
            userAction.updateAdmin({
               ...payload,
               money: payload?.accountBalance,
            })
         ),
   };
   const deleteMember: any = {
      0: (id: string) => dispatch(userAction.deleteUser(id)),
      1: (id: string) => dispatch(userAction.deleteAdmin(id)),
   };

   const openAccount = () => {
      try {
         const result = updateInfo[memberType]({
            deleted_at: null,
            id: userInfo?._id,
         });
         result.then((data: any) => {
            setIsLoading(false);
            if (data.error) {
               toast.error(data?.error?.message || "Thất bại");
               return;
            }
            //
            toast.success(data.message || "Cập nhật thành công");
            getInfo[memberType](username || "");
         });
      } catch (error) {
         toast.error("Thất bại");
         setIsLoading(false);
      }
   };

   const deleteUser = () => {
      try {
         const result = deleteMember[memberType](userInfo?._id);
         result.then((data: any) => {
            if (data.error) {
               toast.error(data?.error?.message || "Xóa thất bại");
               return;
            }
            //
            toast.success(data.message || "Đã xóa!");
            getInfo[memberType](username || "");
         });
      } catch (error) {
         toast.error("Xóa thất bại");
      }
   };

   const activeUser = () => {
      try {
         const result = updateInfo[memberType]({
            id: userInfo?._id,
            isVerifyEmail: true,
         });
         result.then((data: any) => {
            if (data.error) {
               toast.error(data?.error?.message || "Cập nhật thất bại");
               return;
            }
            //
            toast.success(data.message || "Thành công!");
            getInfo[memberType](username || "");
         });
      } catch (error) {
         toast.error("Cập nhật thất bại");
      }
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
         userName: userInfo?.userName || "",
         dateOfBirth: userInfo?.dateOfBirth || null,
         fullName: userInfo?.fullName || "",
         facebook: userInfo?.facebook || "",
         email: userInfo?.email || "",
         phoneNumber: userInfo?.phoneNumber || "",
         address: userInfo?.address || "",
         gender: !userInfo?.gender && userInfo?.gender !== 0 ? GenderConst.orther : userInfo?.gender,
         accountBalance: memberType ? userInfo?.money : userInfo?.moneySurplus,
      },
      validationSchema: Yup.object({
         userName: Yup.string().required("* Required"),
         fullName: Yup.string().required("* Required"),
         email: Yup.string().required("* Required").email("Invalid email"),
         phoneNumber: Yup.string().matches(
            /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
            "Invalid phone number"
         ),
         accountBalance: Yup.string().required("* Required"),
      }),
      onSubmit: async (values: any) => {
         setIsLoading(true);

         try {
            let avatarUpload = userInfo?.avatar;
            if (avatarUrl && avatarUrl !== userInfo?.avatar) {
               avatarUpload = await handleUploadFile(avatarFile);
            }
            const result = updateInfo[memberType]({
               ...values,
               id: userInfo?._id,
               avatar: avatarUpload,
            });
            result.then((data: any) => {
               setIsLoading(false);
               if (data.error) {
                  toast.error(data?.error?.message || "Cập nhật thất bại");
                  return;
               }
               //
               toast.success(data.message || "Cập nhật thành công");
               navigate(
                  `/quan-ly-thanh-vien/${memberType === 0 ? "cong-dong-seo" : "admin-cong-dong-seo"}/${
                     values?.userName
                  }`
               );
            });
         } catch (error) {
            toast.error("Cập nhật thất bại");
            setIsLoading(false);
         }
      },
   });

   useEffect(() => {
      const pathname = location.pathname;
      if (pathname.includes("/quan-ly-thanh-vien/cong-dong-seo")) {
         setMemberType(0);
         getInfo[0](username || "");
      } else {
         setMemberType(1);
         getInfo[1](username || "");
      }
   }, [location]);

   return (
      <div className="relative h-full p-4">
         <FullPageSpiner isLoading={isLoading} />
         <div className="mb-4">
            <Breadcrumb items={[{ title: "Quản lý thành viên" }, { title: "Thông tin thành viên" }]}></Breadcrumb>
         </div>

         <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2 my-4">
            <h3 className="font-semibold">Thông tin thành viên</h3>

            {Boolean(memberType) && (
               <div className="flex gap-3">
                  <TopUpRequestModal
                     memberInfo={userInfo}
                     onSubmit={() => {
                        getInfo[memberType](username || "");
                     }}
                  />
                  <TopUpModal
                     type={1}
                     memberInfo={userInfo}
                     onSubmit={() => {
                        getInfo[memberType](username || "");
                     }}
                  />
               </div>
            )}
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
                              formik.values.dateOfBirth ? format(new Date(formik.values.dateOfBirth), "yyyy-MM-dd") : ""
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

                  {/* ====== account balance */}
                  <div className="w-full">
                     <label htmlFor="input-account-balance" className="line-clamp-1 text-base font-semibold mb-1">
                        Số dư{" "}
                        {formik.errors.accountBalance && formik.touched.accountBalance && (
                           <i className="text-sm text-red-500">{formik.errors.accountBalance.toString()}</i>
                        )}
                     </label>

                     <div className="w-full relative">
                        <InputNumber
                           className="w-full !py-1.5"
                           defaultValue={formik.values.accountBalance || 0}
                           value={formik.values.accountBalance}
                           formatter={(value: any) =>
                              `$ ${(value * 1).toString()}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                           }
                           parser={(value: any) => value.replace(/\$\s?|(,*)/g, "").replace(/\D+/g, "")}
                           onChange={(value) => {
                              formik.setFieldValue("accountBalance", value || 0);
                           }}
                        />

                        <div className="absolute bg-white right-1.5 top-1.5 p-1">
                           <p className="text-gray-400">VND</p>
                        </div>
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

                     {userInfo?.deleted_at ? (
                        <PrimaryButton
                           content="Mở tài khoản"
                           background="bg-amber-500"
                           type="button"
                           onClick={openAccount}
                           icon={<AiOutlineUnlock className="text-xl me-2" />}
                        />
                     ) : userInfo?.isVerifyEmail ? (
                        <PrimaryButton
                           content="Xóa tài khoản"
                           background="bg-red-600"
                           type="button"
                           onClick={deleteUser}
                           icon={<AiOutlineUserDelete className="text-xl me-2" />}
                        />
                     ) : (
                        <PrimaryButton
                           content="Kích hoạt tài khoản"
                           background="bg-sky-500"
                           type="button"
                           onClick={activeUser}
                           icon={<FiPlay className="text-xl me-2" />}
                        />
                     )}

                     <SetPasswordModal
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
                        memberType={memberType}
                     />
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
}
export default UpdateUser;
