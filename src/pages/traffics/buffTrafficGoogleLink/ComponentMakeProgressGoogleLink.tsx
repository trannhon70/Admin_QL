import { Input, Select, notification } from "antd";
import {
  NoteTraffic,
  OptionsSelect,
  htmfContentFake,
  htmlContent,
} from "../buffTrafficGoogleSearch/dataFake";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FormatNumberVND } from "../../../util";
import { Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import ImgCrop from "antd-img-crop";
import { FiUploadCloud } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { createTrafficGoogle } from "api/task.api";
interface IForm {
  customerId?: string;
  type?: string;
  link?: string;
  follow?: number | undefined;
  price?: number | undefined;
  totalMoney?: number | undefined;
  note?: string;
  phoneNumber?: string;
  keyWord?: string;
  TimeOnSite?: number;
  image?: any;
  numberTraffic?: number;
  numberTrafficCountDown?: number;
  script?: any;
  codeReferral?: string;
  typeTask?: number;
}

interface IError {
  url?: any;
  keyword?: any;
}

const ComponentMakeProgressGoogleLink = () => {
  const [api, contextHolder] = notification.useNotification();
  const userInfo = useSelector((state: any) => state.user.currentUser);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [error, setError] = useState<IError>({
    url: "",
    keyword: "",
  });
  const [form, setForm] = useState<IForm>({
    customerId: userInfo?._id,
    type: "64ded9246651772653147ad8",
    link: "",
    follow: 500,
    price: 990,
    totalMoney: 5000,
    note: "",
    phoneNumber: "",
    keyWord: "",
    TimeOnSite: 30,
    image: [],
    numberTraffic: 30,
    numberTrafficCountDown: 30,
    script: htmlContent(30),
    codeReferral: "",
    typeTask: 4,
  });

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleOptionsSelect = (e: any) => {
    setForm({
      ...form,
      TimeOnSite: e,
    });
  };

  useEffect(() => {
    let updatedForm = { ...form }; // Tạo bản sao mới của form để cập nhật

    if (Number(form.TimeOnSite) === 30) {
      updatedForm = { ...updatedForm, price: 990 };
    }
    if (Number(form.TimeOnSite) === 50) {
      updatedForm = { ...updatedForm, price: 1800 };
    }
    if (Number(form.TimeOnSite) === 60) {
      updatedForm = { ...updatedForm, price: 1980 };
    }
    if (Number(form.TimeOnSite) === 90) {
      updatedForm = { ...updatedForm, price: 2300 };
    }
    if (Number(form.TimeOnSite) === 120) {
      updatedForm = { ...updatedForm, price: 2700 };
    }
    if (Number(form.TimeOnSite) === 150) {
      updatedForm = { ...updatedForm, price: 3000 };
    }
    setForm(updatedForm); // Cập nhật form sau khi đã thay đổi giá trị
    // Update script
    const script = htmlContent(Number(form.TimeOnSite));
    setForm((prevForm) => ({ ...prevForm, script })); // Sử dụng functional update để đảm bảo không ghi đè trực tiếp
  }, [form.TimeOnSite]);

  useEffect(() => {
    const newTotalMoney =
      form && form.price && form.follow ? form.price * form.follow : 0;
    setForm((prevForm) => ({
      ...prevForm,
      totalMoney: newTotalMoney,
    }));
  }, [form.price, form.follow]);

  const hanldeOnBlur = () => {
    if (Number(form.numberTraffic) < 30) {
      setForm({ ...form, numberTraffic: 30 });
      api.warning({
        message: "Số traffic/ ngày ít nhất phải là 30",
      });
    }
  };

  const hanldeOnBlurTraffic = () => {
    if (Number(form.follow) < 500) {
      setForm({ ...form, follow: 500 });
      api.warning({
        message: "Tổng số traffic mua tối thiểu là 500 traffic",
      });
    }
  };

  const onclickMakeProgress = async () => {
    let hasError = false; // Biến để theo dõi xem có lỗi hay không

    if (form.link === "") {
      setError({ ...error, url: "error" });
      api.error({
        message: "Link Url không được bỏ trống!",
      });
      hasError = true;
    }

    if (!hasError) {
      const formData = new FormData();
      const formJsonString = JSON.stringify(form);
      formData.append("data", formJsonString);

      fileList?.forEach((fileModal: any) => {
        formData.append("file", fileModal.originFileObj);
      });

      const result: any = await createTrafficGoogle(formData);
      if (result.statusCode === 1) {
        api.success({
          message: "Tạo tiến trình thành công!",
          icon: <BsCheckCircleFill size={30} className="text-lime-600" />,
        });
        setFileList([]);
        setForm({
          ...form,
          keyWord: "",
          link: "",
          image: [],
          phoneNumber: "",
          codeReferral: "",
        });
      }
      if (result.statusCode === 0) {
        api.warning({
          message: `${result.message}`,
          icon: <FaMoneyBillWave size={30} className="text-lime-600" />,
        });
      }
    }
  };
  return (
    <div className="mt-2">
      {contextHolder}
      <div className="text-lg text-green-500 font-normal">
        Hiện tại chúng tôi có hơn{" "}
        <span className="font-bold">250.000 thành viên</span>, quý khách có thể
        dùng để đẩy SEO từ khóa lên Top hoặc tiếp cận người dùng tăng độ nhận
        diện cho doanh nghiệp của mình.
      </div>
      <div className="text-lg text-red-500 font-semibold mt-2">
        <div>Lưu Ý</div>
        <div>
          - Nghiêm cấm tạo đơn với các trang website vi phạm pháp luật, chính
          trị, đồi trụy, cờ bạc .... Nếu cố tính sẽ bị HỦY JOBS KHÔNG TOÀN TIỀN
          và có thể bị band tài khoản khỏi hệ thống và chịu hoàn toàn trách
          nhiệm trước pháp luật
        </div>{" "}
        <div>
          - Hệ thống 99% là người việt thật và đang sinh sống tại việt nam thực
          hiện nhiệm vụ
        </div>
        - Các jobs số lượng lớn chạy không đủ sẽ được hủy và hoàn tiền còn thừa
      </div>
      <div className="mt-2">
        <div className="text-lg text-green-500 font-bold">
          URL đích (nhập chính xác url)
        </div>
        <Input
          className="h-[40px] mt-1"
          placeholder="Nhập url đích muốn chạy traffic"
          onChange={(e) => {
            setForm({ ...form, link: e.target.value });
            setError({ ...form, url: "" });
          }}
          value={form.link}
          status={error.url}
        />
      </div>
      {/* <div className="mt-3 flex">
        <div className="text-lg text-green-500 font-bold w-1/4">
          Thêm hình ảnh mô tả
        </div>
        <div className="w-3/4 flex items-center justify-end">
          <ImgCrop rotationSlider>
            <Upload
              className=""
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              <FiUploadCloud className="mr-1" size={40} />
            </Upload>
          </ImgCrop>
        </div>
      </div> */}
      <div className="sm:block md:flex">
        <div className="mt-2 w-full sm:w-full md:w-1/2 p-1">
          <div className="text-lg text-green-500 font-bold">
            Số traffic/ngày (tối thiểu 30)
          </div>
          <Input
            className="h-[40px] mt-1"
            placeholder=""
            value={form.numberTraffic}
            type="number"
            onChange={(e) => {
              setForm({
                ...form,
                numberTraffic: Number(e.target.value),
                numberTrafficCountDown: Number(e.target.value),
              });
            }}
            onBlur={hanldeOnBlur}
          />
        </div>
        <div className="mt-2 w-full sm:w-full md:w-1/2 p-1">
          <div className="text-lg text-green-500 font-bold">
            Tổng số traffic mua (mua tối thiểu 500)
          </div>
          <Input
            className="h-[40px] mt-1"
            placeholder=""
            type="number"
            value={form.follow}
            onChange={(e) => {
              setForm({ ...form, follow: Number(e.target.value) });
            }}
            onBlur={hanldeOnBlurTraffic}
          />
        </div>
      </div>

      <div className="sm:block md:flex">
        <div id="google-search" className="mt-2 w-full sm:w-full md:w-1/2 p-1">
          <div className="text-lg text-green-500 font-bold">Gói onsite:</div>
          <Select
            className="mt-1"
            style={{ width: "100%" }}
            onChange={handleOptionsSelect}
            options={OptionsSelect}
            placeholder={OptionsSelect[0].label}
          />
        </div>
        <div className="mt-2 w-full sm:w-full md:w-1/2 p-1">
          <div className="text-lg text-green-500 font-bold">Giá 1 traffic</div>
          <Input
            className="h-[40px] mt-1"
            placeholder="Nhập url đích muốn chạy traffic"
            value={FormatNumberVND(form.price)}
          />
        </div>
      </div>
      <div className="sm:block md:flex">
        <div className="mt-2 w-full sm:w-full md:w-1/2 p-1">
          <div className="text-lg text-green-500 font-bold">
            Mã giới thiệu (Không bắt buộc)
          </div>
          <Input
            className="h-[40px] mt-1"
            placeholder="Nhập mã giới thiệu để được giảm giá"
            value={form.codeReferral}
            onChange={(e) => {
              setForm({ ...form, codeReferral: e.target.value });
            }}
          />
        </div>
        <div className="mt-2 w-full sm:w-full md:w-1/2 p-1">
          <div className="text-lg text-green-500 font-bold">
            Nhận số điện thoại (Không bắt buộc - Dùng để chúng tôi liên lạc khi
            đặt sai mã)
          </div>
          <Input
            className="h-[40px] mt-1"
            placeholder="Nhận số điện thoại để nhận hỗ trợ!"
            value={form.phoneNumber}
            onChange={(e) => {
              setForm({ ...form, phoneNumber: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="p-3 rounded-md bg-red-100 mt-2">
        <div className="text-red-400 text-lg">
          Đoạn code mẫu gắn vào Footer web đích
        </div>
        <div className="mt-2 p-2 bg-black-80 text-white">
          {/* <pre>{htmlContent(Number(form.TimeOnSite))}</pre> */}
          <pre>{htmfContentFake()}</pre>
        </div>
        <div className="text-lg text-cyan-700 mt-1">
          + Tiến hành copy đoạn code ở mục hành động trong nhật kí order và gắn vào Footer của website.
        </div>
        <div className="text-lg text-cyan-700 mt-1">
          + Cần tắt các plugin Wprocket (nếu có) để tối ưu với thời gian thực
        </div>
        <div className="text-lg text-cyan-700 mt-1 flex">
          <div className="my-auto">
            + Sau khi cài đặt thành công web sẽ hiện lên ô nhận mã màu xanh lá như
            sau:
          </div>
          <div className="my-auto ml-2">
           <img src={'/imgs/buttonCode.png'} alt='image-button' width={150} height={150}/>
          </div>
        </div>
        <div className="text-lg text-cyan-700 mt-1">
          + Sau khi vào Google.com tìm từ khóa rồi click vào web thấy xuất hiện
          nút "Mời bạn lấy mã" màu xanh lá như hình phía trên nghĩa là bạn đã cài đặt thành
          công.
        </div>
      </div>

      <div className="p-3 rounded-md bg-red-100 mt-2">
        <div className="text-red-400 text-lg">
          NHỮNG LƯU Ý KHI DÙNG TRAFFIC USER:
        </div>
        {NoteTraffic.map((item: any, index: number) => {
          return (
            <div key={index} className="text-lg text-cyan-700 font-bold mt-1">
              {item?.text}
            </div>
          );
        })}
      </div>
      <div className="mt-5 bg-yellow-500 rounded-lg p-4 text-center">
        <div className="text-base font-bold text-white">
          Tổng: {FormatNumberVND(form?.totalMoney)}
        </div>
        <div className="text-base font-normal text-white">
          Bạn sẽ buff <span className="font-bold">{form.follow} subscribe</span>{" "}
          với giá
          <span className="font-bold"> {FormatNumberVND(form.price)}</span> /
          subcribe
        </div>
      </div>
      <button
        onClick={() => onclickMakeProgress()}
        className=" mt-5 w-full text-center bg-sky-800 hover:bg-sky-700 font-bold text-base text-white p-4 rounded-lg"
      >
        Tạo tiến trình
      </button>
    </div>
  );
};

export default ComponentMakeProgressGoogleLink;
