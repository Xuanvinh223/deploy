import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import InputQuantityCom from "../Helpers/InputQuantityCom"; // Kiểm tra đường dẫn này nếu gặp lỗi
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast


export default function ProductsTable({ className, accountId }) {
  const token = Cookies.get('token');
  let userInfo;

  if (token) {
    try {
      userInfo = jwtDecode(token);
    } catch (error) {
      console.error("Lỗi giải mã token:", error);
    }
  }

  const [favourites, setFavourites] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/favourites/account/${accountId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFavourites(response.data);
      } catch (err) {
        setError(err.response ? err.response.data : 'Có lỗi xảy ra khi lấy dữ liệu.');
        console.error('Lỗi khi lấy danh sách yêu thích:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [accountId, token]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (favourites.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const productIds = Array.from(new Set(
          favourites.map(item => item.sizeId.product.id)
        ));

        const productRequests = productIds.map(id =>
          axios.get(`http://localhost:8080/api/guest/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        );

        const responses = await Promise.all(productRequests);
        const productDetails = responses.reduce((acc, response) => {
          const product = response.data;
          acc[product.id] = product;
          return acc;
        }, {});

        setProducts(productDetails);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
        setError("Không thể lấy thông tin sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [favourites, token]);

  const handleQuantityChange = async (id, newQuantity) => {
    // Lưu lại số lượng cũ để tính toán sự thay đổi
    const previousQuantity = favourites.find(item => item.id === id)?.quantity || 0;
  
    const quantityChange = newQuantity - previousQuantity; // Tính toán sự thay đổi
  
  
    try {
      const response = await axios.put(`http://localhost:8080/api/user/favourites/${id}/quantity`, null, {
        params: { quantityChange }, // Gửi số lượng thay đổi
        headers: { Authorization: `Bearer ${token}` }
      });
  
      const updatedFavourite = response.data;
      setFavourites(prevFavourites =>
        prevFavourites.map(item =>
          item.id === id ? { ...item, quantity: updatedFavourite.quantity } : item
        )
      );
  
      toast.success("Cập nhật số lượng yêu thích thành công!");
    } catch (error) {
      //console.error("Lỗi khi cập nhật số lượng yêu thích:", error);
      toast.error("Không thể cập nhật số lượng.");
    }
  };
  

  const handleRemoveFavourite = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/user/favourites/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFavourites(prevFavourites => prevFavourites.filter(item => item.id !== id));

      toast.success("Đã xóa sản phẩm khỏi danh sách yêu thích!");
    } catch (error) {
      console.error("Lỗi khi xóa yêu thích:", error);
      toast.error("Không thể xóa sản phẩm yêu thích.");
    }
  };


  // Tính tổng cộng
  const totalAmount = favourites.reduce((acc, item) => {
    const product = products[item.sizeId.product.id] || {};
    const productPrice = parseFloat(product.price) || 0;
    const quantity = item.quantity || 0;
    return acc + (productPrice * quantity);
  }, 0);

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`w-full ${className || ""}`}>
      <ToastContainer />
      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4 pl-10 block whitespace-nowrap w-[380px]">Sản phẩm</td>
              <td className="py-4 whitespace-nowrap text-center">Màu sắc</td>
              <td className="py-4 whitespace-nowrap text-center">Kích cỡ</td>
              <td className="py-4 whitespace-nowrap text-center">Giá</td>
              <td className="py-4 whitespace-nowrap text-center">Số lượng</td>
              <td className="py-4 whitespace-nowrap text-center">Tổng cộng</td>
              <td className="py-4 whitespace-nowrap text-right w-[114px] block"></td>
            </tr>
            {favourites.length > 0 ? (
              favourites.map((item) => {
                const product = products[item.sizeId.product.id] || {};
                const productPrice = parseFloat(product.price) || 0;
                const total = item.quantity * productPrice;
                return (
                  <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="pl-10 py-4">
                      <div className="flex space-x-6 items-center">
                        <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                          <img
                            src={`/assets/images/${product.firstImage}`}
                            className="w-full h-full object-contain"
                            alt={product.name || 'Sản phẩm'}
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <p className="font-medium text-[15px] text-qblack">{product.name || 'Tên sản phẩm'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2">
                      <div className="flex justify-center items-center">
                        <span
                          className="w-[15px] h-[15px] inline-block rounded-full border border-gray-400 ml-1"
                          style={{ backgroundColor: item.sizeId.color.name }}
                        ></span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2">
                      <div className="flex space-x-1 items-center justify-center">
                        <span className="text-[15px] font-normal">{item.sizeId.name || "N/A"}</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2">
                      <div className="flex space-x-1 items-center justify-center">
                        <span className="text-[15px] font-normal">{formatPrice(productPrice)}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex justify-center items-center">
                        <InputQuantityCom
                          initialQuantity={item.quantity}
                          id={item.id} // Truyền ID của mục yêu thích
                          onQuantityChange={handleQuantityChange} // Thêm callback để cập nhật số lượng
                        />
                      </div>
                    </td>

                    <td className="text-right py-4">
                      <div className="flex space-x-1 items-center justify-center">
                        <span className="text-[15px] font-normal">{formatPrice(total)}</span>
                      </div>
                    </td>
                    <td className="text-right py-4">
                      <div className="flex space-x-1 items-center justify-center">
                        <span onClick={() => handleRemoveFavourite(item.id)} className="cursor-pointer">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                              fill="#E07A7A"
                            />
                          </svg>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  Không có sản phẩm nào trong danh sách yêu thích.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="w-full py-4 flex justify-end">
          <span className="text-[16px] font-medium">
            Tổng cộng: {formatPrice(totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}