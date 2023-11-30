import { Input, message, notification } from "antd";
import { createTask } from "api/task.api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormatNumberVND } from "../../../util";

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
const ComponentMakeProgressFacebook = () => {
  const userInfo = useSelector((state: any) => state.user.currentUser);
  const [form, setForm] = useState<IForm>({
    customerId: userInfo?._id,
    type: "64dc43049b3bdde87a4f704e",
    link: "",
    follow: 100,
    price: 0.05,
    credit: 5,
    note: "",
    typeTask: 1,
  });
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const newCredit =
      form && form.price && form.follow
        ? Math.round(form.price * form.follow)
        : 0;
    setForm((prevForm) => ({
      ...prevForm,
      credit: newCredit,
    }));
  }, [form.price, form.follow]);

  const onclickMakeProgress = async () => {
    if (form.link === "")
      return message.warning(
        "Link hoặc Id trang cá nhân cần tăng follow không được bỏ trống!"
      );
    const result: any = await createTask(form);
    if (result?.statusCode === 0) {
      return message.error(`${result.message}`);
    } else if (result?.statusCode === 1) {
      setForm({ ...form, link: "", note: "" });
      message.success(`${result.message}`);
    } else {
      return message.error("Tạo tiến trình không thành công");
    }
  };

  const handleOnBlur = () => {
    if (Number(form.price) < 50) {
      setForm({ ...form, price: 50 });
      api.warning({
        message: "Số tiền mỗi lần tương tác phải ít nhất là 0.5 credit",
      });
    }
  };
  return (
    <div className='flex flex-row mt-2'>
      {contextHolder}
      <div className='basis-4/6'>
        <div className='flex '>
          <div className='text-cyan-700 font-bold text-base w-1/4'>
            Link hoặc ID trang cá nhân:
          </div>
          <div className='w-3/4'>
            <Input
              className='h-[40px]'
              placeholder='Nhập link hoặc ID cần tăng'
              onChange={(e) => {
                setForm({ ...form, link: e.target.value });
              }}
            />
            <div className='text-red-400 font-bold text-base mt-1 bg-amber-200 p-2 rounded-lg'>
              Tìm link Gốc bằng Link Share tại{' '}
              <a
                href='https://findids.net'
                className='text-teal-950'
                target='_blank'
                rel='noopener noreferrer'
              >
                Findids.net
              </a>
            </div>
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
              <div className='text-red-400 font-bold text-sm mt-1'>
                Lưu ý: hệ thống hoạt động theo hình thức order tức là bạn order
                số lượng bao nhiêu thì hệ thống sẽ tự động lấy trong cơ sở dữ
                liệu ra số lượng người tương ứng để like, follow,... cho bạn.
              </div>
              <div className='text-red-400 font-bold text-sm mt-1'>
                Nên nếu nick của họ bị khóa (checkpoint) sau khi buff sẽ gây ra
                hiện tưởng tụt trong lúc buff là bình thường.
              </div>
              <div className='text-red-400 font-bold text-sm mt-1'>
                Do đó, vui lòng buff dư thêm 30 - 50% trên tổng số lượng để
                tránh tụt hoặc chọn gói bảo hành để được hoàn tiền nếu tụt.
              </div>
            </div>
          </div>
        </div>

        <div className='flex mt-5'>
          <div className='text-cyan-700 font-bold text-base w-1/4'>
            Giá tiền mỗi tương tác:
            <div className='text-red-400 font-bold text-base mt-1'>
              Giá thấp nhất: 0.05 credit
            </div>
          </div>
          <div className='w-3/4'>
            <Input
              className='h-[40px]'
              value={form.price}
              type='number'
              onChange={(e) => {
                setForm({ ...form, price: parseFloat(e.target.value) });
              }}
              min={0.05}
              step='0.01'
              onBlur={handleOnBlur}
            />
            <div className='mt-3 bg-white p-3 rounded-lg text-emerald-500 font-medium text-sm '>
              Mẹo nhỏ: Hệ thống ưu tiên chạy các job giá cao trước nên nếu bạn
              cần gấp bạn có thể set giá job của mình cao hơn 1 vài đồng để chạy
              nhanh nhất có thể nhé.
            </div>
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
            />
          </div>
        </div>
        <div className='mt-5 bg-yellow-500 rounded-lg p-4 text-center'>
          <div className='text-base font-bold text-white'>
            Tổng: {Math.round(form?.credit || 1)} credits
          </div>
          <div className='text-base font-normal text-white'>
            Bạn sẽ buff{' '}
            <span className='font-bold'>{form.follow} subscribe</span> với giá
            <span className='font-bold'> {form.price} </span>credit/subscribe
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
            - Hệ thống sử dụng 99% tài khoản người VN, facebook thật để tương
            tác like, sub, comment....
          </div>
          <div className='text-base text-slate-900 font-normal mt-4'>
            - Thời gian làm việc (tăng seeding) và bảo hành tính từ ngày bắt đầu
            cho đến ngày kết thúc job, tối đa là 1 tuần
          </div>
          <div className='text-base text-slate-900 font-normal mt-4'>
            - Hết thời gian của job đã order nếu không đủ số lượng hệ thống sẽ
            tự động hoàn lại số tiền seeding chưa tăng cho bạn trong vòng 1 đến
            3 ngày
          </div>
          <div className='text-base text-slate-900 font-normal mt-4'>
            - Vui lòng lấy đúng id và check kỹ job tránh tạo nhầm, tính năng
            đang trong giai đoạn thử nghiệm nên sẽ không hoàn tiền nếu bạn tạo
            nhầm
          </div>

          <div className='text-base text-slate-900 font-semibold mt-4'>
            - Nhập id lỗi hoặc trong thời gian chạy die id thì hệ thống không
            hoàn lại tiền.
          </div>
          <div className='text-base text-slate-900 font-semibold mt-4'>
            - Mỗi id có thể Buff tối đa 10 lần trên hệ thống để tránh Spam, max
            1k trong ngày (hoặc hơn nếu order giá cao), trên 1k thời gian lên
            chậm hơn trong vòng 7 ngày
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentMakeProgressFacebook;
