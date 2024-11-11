import Accodion from "../Helpers/Accodion";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import LayoutHomeFive from "../Partials/LayoutHomeFive";

export default function Faq() {
  return (
    <LayoutHomeFive childrenClasses="pt-0 pb-0">
      <div className="faq-page-wrapper w-full mb-10">
        <div className="page-title w-full">
          <PageTitle
            title="Câu Hỏi Thường Gặp"
            breadcrumb={[
              { name: "Trang chủ", path: "/" },
              { name: "FAQ", path: "/faq" },
            ]}
          />
        </div>
      </div>
      <div className="contact-wrapper w-full mb-10">
        <div className="container-x mx-auto">
          <div className="main-wrapper w-full lg:flex lg:space-x-[30px]">
            <div className="lg:w-1/2 w-full mb-10 lg:mb-0">
              <h1 className="text-qblack font-bold text-[22px] mb-4">
                Câu Hỏi Thường Gặp
              </h1>
              <div className="flex flex-col space-y-7 justify-between">
                <Accodion
                  title="01. Công nghệ thông tin hoạt động như thế nào?"
                  des="Có nhiều biến thể của các đoạn văn bản Lorem Ipsum có sẵn, nhưng phần lớn đã trải qua sự thay đổi ở một số hình thức, bằng cách tiêm một chút hài hước hoặc các từ ngẫu nhiên."
                />
                <Accodion
                  init
                  title="02. Làm thế nào để tôi trở thành quản lý CNTT?"
                  des="Có nhiều biến thể của các đoạn văn bản Lorem Ipsum có sẵn, nhưng phần lớn đã trải qua sự thay đổi ở một số hình thức, bằng cách tiêm một chút hài hước hoặc các từ ngẫu nhiên."
                />
                <Accodion
                  title="03. Những xu hướng mới nhất trong CNTT là gì?"
                  des="Có nhiều biến thể của các đoạn văn bản Lorem Ipsum có sẵn, nhưng phần lớn đã trải qua sự thay đổi ở một số hình thức, bằng cách tiêm một chút hài hước hoặc các từ ngẫu nhiên."
                />
                <Accodion
                  title="04. Một kế hoạch kinh doanh nên dài bao lâu?"
                  des="Có nhiều biến thể của các đoạn văn bản Lorem Ipsum có sẵn, nhưng phần lớn đã trải qua sự thay đổi ở một số hình thức, bằng cách tiêm một chút hài hước hoặc các từ ngẫu nhiên."
                />
                <Accodion
                  title="05. Chính sách hỗ trợ hoạt động như thế nào?"
                  des="Có nhiều biến thể của các đoạn văn bản Lorem Ipsum có sẵn, nhưng phần lớn đã trải qua sự thay đổi ở một số hình thức, bằng cách tiêm một chút hài hước hoặc các từ ngẫu nhiên."
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white sm:p-10 p-5">
                <div className="title flex flex-col items-center">
                  <h1 className="lg:text-[34px] text-xl font-bold text-qblack">
                    Bạn có câu hỏi nào không?
                  </h1>
                  <span className="-mt-2 block">
                    <svg
                      width="354"
                      height="30"
                      viewBox="0 0 354 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                        stroke="#FFBB38"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <div className="inputs mt-5">
                  <div className="mb-4">
                    <InputCom
                      label="Tên*"
                      placeholder="Demo Name"
                      name="first_name"
                      inputClasses="h-[50px]"
                    />
                  </div>
                  <div className="mb-4">
                    <InputCom
                      label="Địa chỉ Email*"
                      placeholder="info@quomodosoft.com"
                      name="email"
                      inputClasses="h-[50px]"
                    />
                  </div>
                  <div className="mb-5">
                    <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">
                      Tin nhắn*
                    </h6>
                    <textarea
                      placeholder="Nhập tin nhắn của bạn ở đây"
                      className="w-full h-[105px] focus:ring-0 focus:outline-none p-3 border border-qgray-border placeholder:text-sm"
                    ></textarea>
                  </div>
                  <div>
                    <a href="#">
                      <div className="black-btn text-sm font-semibold w-full h-[50px] flex justify-center items-center">
                        <span>Gửi Ngay</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutHomeFive>
  );
}