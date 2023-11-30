import { useState, useEffect } from "react";
import { BsCheckCircleFill, BsFillPatchQuestionFill } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { Checkbox, DatePicker, Input, Select, Space, Tooltip, notification } from "antd";


import {
  OptionsSelect,
  TooltipSetup,
  htmfContentFake,
  htmlContent,
} from "./dataFake";
import { FormatNumberVND } from "../../../util";
import { RangePickerProps } from "antd/es/date-picker";
import { autoTrafficAPI } from "api/auto-trafic.api";

interface IForm {
  name: string;
  domain: string;
  keyword: string;
  isFirstPage?: boolean;
  isClickLink?: boolean;
  isCopyText?: boolean;
  isClickButton?: boolean;
  isScroll?: boolean;
  status: number;
  package: string;
  totalAmount:number;
  quantity:number;
  completeTime:Array<number>
  price: number,
  script: string
}
interface IError {
  name?:any;
  url?: any;
  keyword?: any;
  completeTime?: any;
  quantity?:any
}
const MakeProgressAutoTraffic = () => {
  const [api, contextHolder] = notification.useNotification();
  const [error, setError] = useState<IError>({
    name:"",
    url: "",
    keyword: "",
    completeTime: "",
    quantity:0
  });
  const initForm:IForm = {
    name: "",
    domain: "",
    keyword: "",
    isFirstPage: false,
    isClickLink: false,
    isCopyText: false,
    isClickButton: false,
    isScroll: false,
    status: 0,
    package: '50s',
    totalAmount:0,
    quantity:0,
    completeTime:[],
    price: 1000,
    script: htmlContent(50)
  }
  const [form, setForm] = useState<IForm>(initForm)
  const { RangePicker } = DatePicker;

  const handleOptionsSelect = (e: any) => {
    setForm({
      ...form,
      package: `${e}s`,
    });
  };

  useEffect(() => {
    let updatedForm = { ...form };
    if (form.package === '50s') {
      updatedForm = { ...updatedForm, price: 1000 };
    }
    if (form.package === '60s') {
      updatedForm = { ...updatedForm, price: 1000 };
    }
    if (form.package === '70s') {
      updatedForm = { ...updatedForm, price: 1000 };
    }
    if (form.package === '90s') {
      updatedForm = { ...updatedForm, price: 1000 };
    }
    if (form.package === '120s') {
      updatedForm = { ...updatedForm, price: 1200 };
    }
    if (form.package === '150s') {
      updatedForm = { ...updatedForm, price: 1500 };
    }
    if (form.package === '180s') {
      updatedForm = { ...updatedForm, price: 1800 };
    }
    setForm(updatedForm);
    // Update script
    const index = form.package.indexOf('s')
    const numberOfPackage = form.package.slice(0,index);
    const script = htmlContent(Number(numberOfPackage));
    setForm((prevForm) => ({ ...prevForm, script })); // Sử dụng functional update để đảm bảo không ghi đè trực tiếp
  }, [form.package]);

  useEffect(() => {
    const newTotalMoney =
      form && form.price && form.quantity ? form.price * form.quantity : 0;
    setForm((prevForm) => ({
      ...prevForm,
      totalAmount: newTotalMoney,
    }));
  }, [form.price, form.quantity]);

  const onclickMakeProgress = async () => {
    let hasError = false; // Biến để theo dõi xem có lỗi hay không

    if (form.name === "") {
      setError({ ...error, name: "error" });
      api.error({
        message: "Tên nhiệm vụ không được bỏ trống!",
      });
      hasError = true;
      return
    }else

    if (form.domain === "") {
      setError({ ...error, url: "error" });
      api.error({
        message: "Tên miền không được bỏ trống!",
      });
      hasError = true;
      return
    }else

    if (form.keyword === "") {
      setError({ ...error, keyword: "error" });
      api.error({
        message: "Từ khóa không được bỏ trống!",
      });
      hasError = true;
      return
    }else

    if (form.quantity === 0) {
      setError({ ...error, quantity: "error" });
      api.error({
        message: "Số traffic cho nhiệm vụ này phải lớn hơn 0!",
      });
      hasError = true;
      return
    }else

    if (form.completeTime.length === 0 || form.completeTime === null) {
      setError({ ...error, completeTime: "error" });
      api.error({
        message: "Thời hạn hoàn thành không được bỏ trống!",
      });
      hasError = true;
      return
    }else

    if (!hasError) {
      const dataSend = {
        completeTime: form?.completeTime,
        name: form?.name?.trim(),
        domain: form?.domain?.trim(),
        keyword: form?.keyword?.trim(),
        isFirstPage: form?.isFirstPage,
        isClickLink: form?.isClickLink,
        isCopyText: form?.isCopyText,
        isClickButton: form?.isClickButton,
        isScroll: form?.isScroll,
        package: form?.package,
        quantity:form?.quantity,
        script: form?.script
      }
      const result: any = await autoTrafficAPI.missionTraffic(dataSend);
      if (result.status === 200) {
        api.success({
          message: "Tạo nhiệm vụ thành công!",
          icon: <BsCheckCircleFill size={30} className="text-lime-600" />,
        });
        setForm({
          ...initForm,
          completeTime: form.completeTime,
          script: form?.script,
          package: form?.package
        });
      }
      if (result.status === 400) {
        api.warning({
          message: `${result.message}`,
          icon: <FaMoneyBillWave size={30} className="text-lime-600" />,
        });
      }
      if (result.status === 500) {
        api.warning({
          message: `${result.message}`,
          icon: <FaMoneyBillWave size={30} className="text-lime-600" />,
        });
      }
    }
  };

  const handleDate = (value: any | RangePickerProps['value'],
  dateString: [string, string] | string,) =>{
    if (dateString[0] === "" || dateString[1] === "") {
      setForm({
        ...form,
        completeTime: []
      })
    } else {
      const arrDate = [Date.parse(value[0].$d),Date.parse(value[1].$d)];
      setError({ ...error, completeTime: "" })
      setForm({
        ...form,
        completeTime: arrDate
      })
    }
  }

  const handleCheckBox = (e:any, id:number) => {
      switch(id) {
        case 0: 
        return setForm({
          ...form,
          isFirstPage: e.target.checked
        })

        case 1: 
        return setForm({
          ...form,
          isClickLink: e.target.checked
        })

        case 2: 
        return setForm({
          ...form,
          isCopyText: e.target.checked
        })

        case 3: 
        return setForm({
          ...form,
          isClickButton: e.target.checked
        })

        case 4: 
        return setForm({
          ...form,
          isScroll: e.target.checked
        })

        default :
        return
      }
  }

  return (
    <div className="mt-2">
      {contextHolder}

      <div className="mt-2">
        <div className="text-lg text-green-500 font-bold">
          Nhập tên nhiệm vụ
        </div>
        <Input
          className="h-[40px] mt-1"
          placeholder="Nhập tên nhiệm vụ"
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
            setError({ ...error, name: "" });
          }}
          value={form.name}
          status={error.name}
        />
      </div>

      <div className="mt-2">
        <div className="text-lg text-green-500 font-bold">
          Nhập tên miền
        </div>
        <Input
          className="h-[40px] mt-1"
          placeholder="ví dụ: https://congdongseo.com"
          onChange={(e) => {
            setForm({ ...form, domain: e.target.value });
            setError({ ...error, url: "" });
          }}
          value={form.domain}
          status={error.url}
        />
      </div>

      <div className="mt-2">
        <div className="text-lg text-green-500 font-bold">
          Nhập từ khóa
        </div>
        <Input
          className="h-[40px] mt-1"
          placeholder="Nhập từ khóa"
          onChange={(e) => {
            setForm({ ...form, keyword: e.target.value });
            setError({ ...error, keyword: "" });
          }}
          value={form.keyword}
          status={error.keyword}
        />
      </div>

      <div className="sm:block md:flex">
        <div className="mt-2 w-full p-1">
          <div className="text-lg text-green-500 font-bold">
            Số traffic cho nhiệm vụ này
          </div>
          <Input
            className="h-[40px] mt-1"
            placeholder=""
            type="number"
            value={form.quantity}
            onChange={(e) => {
              setForm({ ...form, quantity: Number(e.target.value) });
              setError({ ...error, quantity: 0 });
            }}
            status={error.quantity}
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

      <div className="sm:block md:flex lg:flex">
        <div className="mt-2 w-1/2 p-1">
          <div className="text-lg text-green-500 font-bold">
            Thời hạn hoàn thành
          </div>
          <div className="w-full">
            <Space direction="vertical" size={12}>
              <RangePicker 
                className="auto-traffic-date h-[40px]" 
                format={'DD-MM-YYYY'} 
                onChange={handleDate} 
                status={error.completeTime}
                placeholder={["Từ ngày", "Đến ngày"]}
              />
            </Space>
          </div>
        </div>
        
        {/* <div className="w-1/2 my-auto p-1">
          <div className="text-lg text-green-500 font-bold">
            Trạng thái hoạt động
          </div>
          <div>
            <Tooltip title='hoạt động'>
              <Switch defaultChecked/>
            </Tooltip>
          </div>
        </div> */}
      </div>

      <div className="p-1">
          <div className="text-lg text-green-500 font-bold">
            Cài đặt
          </div>
          <div className="flex flex-wrap gap-10">
            {
              TooltipSetup.map((item:any, index:number) => (
                <div className="flex" key={index}>
                  <Checkbox 
                    onChange={(e) => handleCheckBox(e,item.id)}
                    checked={
                      item.id === 0 ? form.isFirstPage : 
                      (item.id === 1 ? form.isClickLink : 
                        (item.id === 2 ? form.isCopyText : 
                          (item.id === 3 ? form.isClickButton : 
                            form.isScroll)))}
                  >{item.title}</Checkbox>
                  <Tooltip title={item.content}>
                    <BsFillPatchQuestionFill className="my-auto text-[#00a307] cursor-pointer"/>
                  </Tooltip>
                </div>
              ))
            }
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
        <div className="text-lg text-cyan-700 mt-1">
          + Sau khi cài đặt xong đoạn script, bạn cần vào nhật kí order để tiến hành cho chạy nhiệm vụ.
        </div>
      </div>

      {/* <div className="sm:block md:flex">
        <div className="mt-2 w-full p-1">
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
      </div> */}

      <div className="mt-5 bg-yellow-500 rounded-lg p-4 text-center">
        <div className="text-base font-bold text-white">
          Tổng: {FormatNumberVND(form?.totalAmount)}
        </div>
        <div className="text-base font-normal text-white">
          Bạn sẽ mua <span className="font-bold">{form.quantity} lượt traffic</span>{" "}
          với giá
          <span className="font-bold"> {FormatNumberVND(form.price)}</span> /
          traffic
        </div>
      </div>
      <button
        onClick={() => onclickMakeProgress()}
        className=" mt-5 w-full text-center bg-sky-800 hover:bg-sky-700 font-bold text-base text-white p-4 rounded-lg"
      >
        Tạo nhiệm vụ
      </button>
    </div>
  );
};

export default MakeProgressAutoTraffic;
