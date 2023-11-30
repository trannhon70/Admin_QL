import { Input, message, notification } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FormatNumberVND } from "../../../util";
import { createTask } from "api/task.api";

interface IForm {
  customerId?: string;
  type?: string;
  link?: string;
  follow?: number | undefined;
  price?: number | undefined;
  credit?: number | undefined;
  note?: string;
  typeTask?: number;
}
const ComponentMakeProgress = () => {
  const userInfo = useSelector((state: any) => state.user.currentUser);
  const [api, contextHolder] = notification.useNotification();
  const [form, setForm] = useState<IForm>({
    customerId: userInfo?._id,
    type: "64c08592c2213f0eec1c6458",
    link: "",
    follow: 100,
    price: 20,
    credit: 2000,
    note: "",
    typeTask: 1,
  });


  useEffect(() => {
    const newCredit =
      form && form.price && form.follow ? form.price * form.follow : 0;
    setForm((prevForm) => ({
      ...prevForm,
      credit: newCredit,
    }));
  }, [form.price, form.follow]);

  const onclickMakeProgress = async () => {
    if (form.link === "")
      return message.warning(
        "Link video hoặc id cần tăng sub không được bỏ trống!"
      );
    const result: any = await createTask(form);
    if (result?.statusCode === 0) {
      return message.error(`${result.message}`);
    } else if (result?.statusCode === 1) {
      setForm({ ...form, link: "" });
      message.success(`${result.message}`);
    } else {
      return message.error("Tạo tiến trình không thành công");
    }
  };

  const handleOnBlur = () => {
    if (Number(form.price) < 2) {
      setForm({ ...form, price: 2 });
      api.warning({
        message: "Số tiền mỗi lần tương tác phải ít nhất là 2 credit",
      });
    }
  };
  return (
    <div className='flex flex-row mt-2'>
      {contextHolder}
      <div className='basis-4/6'>
        <div className='flex '>
          <div className='text-cyan-700 font-bold text-base w-1/4'>
            Link video hoặc id cần tăng sub:
          </div>
          <div className='w-3/4'>
            <Input
              className='h-[40px]'
              placeholder='Nhập link hoặc ID cần tăng'
              onChange={(e) => {
                setForm({ ...form, link: e.target.value });
              }}
              value={form.link}
            />
            <div className='text-red-400 font-bold text-base mt-1'>
              Lưu ý: Để tăng Sub cho Channel bạn cần nhập Link 1 video bất kỳ
              của Channel, hệ thống sẽ tự động Get ID Channel cần tăng Sub.
            </div>
          </div>
        </div>
        <div className='flex mt-5'>
          <div className='text-cyan-700 font-bold text-base w-1/4'>
            Loại Seeding cần tăng:
          </div>
          <div className='w-3/4'>
            <Input
              className='h-[40px]'
              placeholder='theo dõi kênh Youtube'
              disabled
              value=''
            />
          </div>
        </div>
        <div className='flex mt-5'>
          <div className='text-cyan-700 font-bold text-base w-1/4'>
            Chế độ bảo hành:
          </div>
          <div className='w-3/4'>
            <Input
              className='h-[40px]'
              placeholder='Không bảo hành (Bảo hành nếu tụt quá 70%)'
              disabled
              value=''
            />
          </div>
        </div>
        <div className='flex mt-5'>
          <div className='text-cyan-700 font-bold text-base w-1/4'>
            Số lượng cần tăng:
          </div>
          <div className='w-3/4'>
            <Input
              className='h-[40px]'
              type='number'
              value={form.follow}
              onChange={(e) => {
                setForm({ ...form, follow: Number(e.target.value) });
              }}
            />
            <div className='mt-3 bg-white p-3 rounded-lg'>
              <div className='text-cyan-700 font-medium text-base'>
                Mẹo nhỏ: Hệ thống ưu tiên chạy các job giá cao trước nên nếu bạn
                cần gấp bạn có thể set giá job của mình cao hơn 1 vài đồng để
                chạy nhanh nhất có thể nhé.
              </div>
              <div className='text-red-400 font-bold text-base mt-1'>
                Lưu ý: Nên buff dư thêm 30 - 50% trên tổng số lượng để tránh
                tụt.
              </div>
            </div>
          </div>
        </div>

        <div className='flex mt-5'>
          <div className='text-cyan-700 font-bold text-base w-1/4'>
            Giá tiền mỗi tương tác:
            <div className='text-red-400 font-bold text-base mt-1'>
              Giá thấp nhất: 2 credit
            </div>
          </div>
          <div className='w-3/4'>
            <Input
              className='h-[40px]'
              value={form.price}
              type='number'
              onChange={(e) => {
                setForm({ ...form, price: Number(e.target.value) });
              }}
              onBlur={handleOnBlur}
            />
          </div>
        </div>
        <div className='flex mt-5'>
          <div className='text-cyan-700 font-bold text-base w-1/4'>
            Ghi chú:
          </div>
          <div className='w-3/4'>
            <Input.TextArea
              className='h-[80px]'
              placeholder='Nhập nội dung ghi chú về tiến trình của bạn'
              onChange={(e) => {
                setForm({ ...form, note: e.target.value });
              }}
              value={form.note}
            />
          </div>
        </div>
        <div className='mt-5 bg-yellow-500 rounded-lg p-4 text-center'>
          <div className='text-base font-bold text-white'>
            Tổng: <span>{form?.credit}</span> credits
          </div>
          <div className='text-base font-normal text-white'>
            Bạn sẽ buff{' '}
            <span className='font-bold'>{form.follow} subscribe</span> với giá
            <span className='font-bold'> {form.price} credit</span> / subscribe
          </div>
        </div>
        <button
          onClick={() => onclickMakeProgress()}
          className=' mt-5 w-full text-center bg-sky-800 hover:bg-sky-700 font-bold text-base text-white p-4 rounded-lg'
        >
          Tạo tiến trình
        </button>
      </div>
      <div className='basis-2/6 pl-5 '>
        <div className='bg-orange-300 rounded-lg p-4'>
          <div className='text-base text-slate-900 font-semibold '>Chú ý:</div>
          <div className='text-base text-slate-900 font-semibold mt-4'>
            - Ngiêm cấm Buff các ID Seeding có nội dung vi phạm pháp luật, chính
            trị, đồ trụy... Nếu cố tình buff bạn sẽ bị trừ hết tiền và band khỏi
            hệ thống vĩnh viễn, và phải chịu hoàn toàn trách nhiệm trước pháp
            luật.
          </div>
          <div className='text-base text-slate-900 font-normal mt-4'>
            - Hệ thống sử dụng tài khoản người VN
          </div>
          <div className='text-base text-slate-900 font-normal mt-4'>
            - Mỗi id có thể Buff tối đa 10 lần trên hệ thống để tránh Spam, max
            50k, số lượng càng lớn thì thời gian chạy càng lâu
          </div>
          <div className='text-base text-slate-900 font-normal mt-4'>
            - Thời gian tăng subscribe tính từ ngày bắt đầu cho đến ngày kết
            thúc job, tối đa là 1 tuần
          </div>
          <div className='text-base text-slate-900 font-normal mt-4'>
            - Hết thời gian của job đã order nếu không đủ số lượng sẽ tự động
            hoàn lại số tiền seeding chưa tăng cho bạn trong vòng từ 2 đến 4
            ngày
          </div>
          <div className='text-base text-slate-900 font-normal mt-4'>
            - Vui lòng lấy đúng link trang cá nhân và không nhập id khác
          </div>
          <div className='text-base text-slate-900 font-normal mt-4'>
            - Check kỹ job tránh tạo nhầm, tính năng đang trong giai đoạn thử
            nghiệm nên sẽ không hoàn tiền nếu bạn tạo nhầm
          </div>
          <div className='text-base text-slate-900 font-semibold mt-4'>
            - Nhập id lỗi hoặc trong thời gian chạy die id thì hệ thống không
            hoàn lại tiền.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentMakeProgress;
