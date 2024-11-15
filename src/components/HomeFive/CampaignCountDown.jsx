import { Link } from "react-router-dom";
import CountDown from "../Helpers/CountDown";
import { useState, useEffect } from "react";
export default function CampaignCountDown({ className, lastDate }) {
  const [products, setProducts] = useState([]);
  const [flashSaleInfo, setFlashSaleInfo] = useState({
    name: "",
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/guest/product-flashsale");
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data)) {
          setProducts(data);

          // Giả sử data[0] chứa thông tin flash sale
          if (data.length > 0 && data[0].flashsale) {
            const { name, startdate, enddate } = data[0].flashsale;

            // Chuyển đổi startdate và enddate thành đối tượng Date
            const startDate = new Date(startdate[0], startdate[1] - 1, startdate[2], startdate[3], startdate[4]);
            const endDate = new Date(enddate[0], enddate[1] - 1, enddate[2], enddate[3], enddate[4], enddate[5]);

            setFlashSaleInfo({
              name,
              startDate,
              endDate,
            });
          }
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Gọi hàm CountDown với endDate
  const { showDate, showHour, showMinute, showSecound } = CountDown(flashSaleInfo.endDate);

  return (
    <div>
      <div className={`w-full lg:h-[460px] ${className || ""}`}>
        <div className="container-x mx-auto h-full">
          <div className="items-center h-full">
            <div
              data-aos="fade-right"
              className="campaign-countdown h-full w-full mb-5 lg:mb-0"
              style={{
                background: `url(/assets/images/campaign-cover-countdown-4.jpg) no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <Link to="/flash-sale">
                <div className="w-full xl:p-12 p-5">
                  <div className="countdown-wrapper w-full flex space-x-[23px] mb-10">
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#EB5757]">
                          {showDate}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Ngày
                      </p>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#2F80ED]">
                          {showHour}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Giờ
                      </p>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#219653]">
                          {showMinute}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Phút
                      </p>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#EF5DA8]">
                          {showSecound}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Giây
                      </p>
                    </div>
                  </div>
                  <div className="countdown-title mb-4">
                    <h1 className="text-[44px] text-qblack font-medium">
                      ỐI! Giảm giá chớp nhoáng
                    </h1>
                    <p className="text-[18px] text-qblack leading-7">
                      Bạn nhận được ưu đãi hơn 2k Sản phẩm tốt nhất trong Flash với
                      <br /> một chiếc áo có hình dạng đặc biệt để bán.
                    </p>
                  </div>
                  <div className=" w-[100px] h-8 border-b border-qblack">
                    <div className=" h-full inline-flex space-x-2  items-center">
                      <span className="text-sm font-600 tracking-wide leading-7">
                        Mua ngay
                      </span>
                      <span>
                        <svg
                          width="7"
                          height="11"
                          viewBox="0 0 7 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="2.08984"
                            y="0.636719"
                            width="6.94219"
                            height="1.54271"
                            transform="rotate(45 2.08984 0.636719)"
                            fill="#1D1D1D"
                          />
                          <rect
                            x="7"
                            y="5.54492"
                            width="6.94219"
                            height="1.54271"
                            transform="rotate(135 7 5.54492)"
                            fill="#1D1D1D"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
