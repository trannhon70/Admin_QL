export const NoteTraffic = [
  {
    id: 1,
    text: "1. Nên đẩy traffic user khi từ khoá đã vào được ít nhất từ trang 1-5 để thành viên có thể tìm thấy và click vào web.",
  },
  {
    id: 2,
    text: "2. Nên đẩy traffic user ít nhất từ 20-30 ngày để có hiệu quả tốt nhất.",
  },
  {
    id: 3,
    text: "3. Khi đẩy key chính nên đẩy kèm với key brand để tăng tính tự nhiên cho website (Đẩy key brand tốt cho key chính).",
  },
  {
    id: 4,
    text: "4. Traffic user là chất xúc tác giúp từ khóa lên TOP nhanh hơn, tuy nhiên website cần phải tối ưu onpage và backlink thật tốt trước khi đẩy traffic.",
  },
  {
    id: 5,
    text: "5. Quý khách nên chủ động theo dõi dữ liệu từ Google Analytics và Google Search Console để đối chiếu với dữ liệu thống kê của chúng tôi.",
  },
  {
    id: 6,
    text: "6. Chúng tôi cam kết 100% traffic user người dùng là thật, không tool, không fake IP, quý khách có thể tự mình làm nhiệm vụ để kiểm chứng (Xem video hướng dẫn cách tự check https://www.youtube.com/)",
  },
];

export const OptionsSelect = [
  {
    value: "50",
    label: (
      <span className="text-base text-green-500">Time on site &gt;50s</span>
    ),
  },
  {
    value: "60",
    label: (
      <span className="text-base text-green-500">Time on site &gt;60s</span>
    ),
  },
  {
    value: "90",
    label: (
      <span className="text-base text-green-500">Time on site &gt;90s</span>
    ),
  },
  {
    value: "120",
    label: (
      <span className="text-base text-green-500">Time on site &gt;120s</span>
    ),
  },
  {
    value: "150",
    label: (
      <span className="text-base text-green-500">Time on site &gt;150s</span>
    ),
  },
  {
    value: "180",
    label: (
      <span className="text-base text-green-500">Time on site &gt;180s</span>
    ),
  },
];

export const TooltipSetup = [
  {
    id:0,
    content: "Hệ thống sau khi tìm kiếm thì sẽ click vào link website đầu tiên trong trang kết quả, sau đó thực hiện các hành động ngẫu nhiên và trở ra lại trang tìm kiếm google click vào link website của bạn.",
    title: "Trang đầu"
  },
  {
    id:1,
    content: "Hệ thống sẽ click vào link ngẫu nhiên bên trong website",
    title:"Click Link"
  },
  {
    id:2,
    content: "Hệ thống sẽ copy 1 đoạn text ngẫu nhiên bên trong website",
    title:"Copy text"
  },
  {
    id:3,
    content: "Hệ thống sẽ click vào button ngẫu nhiên bên trong website",
    title:"Click Button"
  },
  {
    id:4,
    content:"Hệ thống sẽ scroll lên xuống bên trong website",
    title:"Scroll"
  }
]

export const statusCode:any = {
  0: "đang chờ duyệt",
  1: "đã duyệt",
  2: "đang chạy",
  3: "tạm ngưng",
  4: "đã ngừng",
  5: "hoàn thành"
}

export const colorStatusCode:any = {
  0: "bg-orange-500",
  1: "bg-yellow-500",
  2: "bg-blue-500",
  3: "bg-yellow-500",
  4: "bg-red-500",
  5: "bg-green-500"
}

export const statusString = [
  {
     value: 0,
     label: "đang chờ duyệt",
  },
  {
     value: 1,
     label: "đã duyệt",
  },
  {
     value: 2,
     label: "đang chạy",
  },
  {
    value: 3,
    label: "tạm ngưng",
  },
  {
    value: 4,
    label: "đã ngừng",
  },
  {
    value: 5,
    label: "hoàn thành",
  },
]

export const htmlContent = (value: number) => `<script defer>
const pageHeight = window.innerHeight;
const buttonGetCode = document.createElement('div');
document.body.style.position = 'relative';
            buttonGetCode.innerText = 'Mời bạn lấy mã';
            const $ = buttonGetCode.style;
            $.padding = '5px 15px';$.color = 'white';$.backgroundColor = '#00b300';
            $.position='absolute';$.borderRadius='5px';$.fontWeight='bold';$.left='50px';$.top=pageHeight;$.cursor='pointer';$.minWidth='100px';
            $.textAlign='center';$.zIndex=99999;$.bottom='50px';document.body.appendChild(buttonGetCode);
            const myClick=buttonGetCode.addEventListener('click',()=>{buttonGetCode.removeEventListener('click',myClick);let timeStart=${value};
            buttonGetCode.innerText=timeStart;function  handleGetCode(length){let result='';const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const charactersLength=characters.length;let counter=0;while(counter<length){result+=characters.charAt(Math.floor(Math.random()*charactersLength));
            counter+=1};const arrWord=result.split("");arrWord[2]="V";arrWord[5]="N";return arrWord.join("")};const countDown=()=>{const countDownInterval=setInterval(()=>{
            if(document.visibilityState=='visible'){timeStart-=1;buttonGetCode.innerText="Bạn vui lòng đợi  "+timeStart+"s";if(timeStart==0){clearInterval(countDownInterval)
            buttonGetCode.innerText="CDS"+handleGetCode(7)}}}, 1000)};countDown()},{once: true})</script>`;

export const htmfContentFake =
  () => `<div id='can-i-help-you' style="text-align: center"></div>
<input id="get_confirm" onclick="myFunctionCopy();"/>
<script src='https://cdn.traffic60s.com/traffic/ican.js?v=2022' type='text/javascript'></script>`;
