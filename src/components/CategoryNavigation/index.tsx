import * as React from "react";

const CategoryNavigation = () => {
  return (
    <nav className="bg-blue-700 text-white  h-[50px]">
      <div className="dhv-container flex flex-row items-center h-full font-bold text-xs justify-between uppercase">
        <div className="">Máy tính công nghiệp</div>
        <div className="">cảm biến công nghiệp</div>
        <div className="">đèn báo</div>
        <div className="">thiết bị ngành nước</div>
        <div className="">quan trắc môi trường</div>
        <div className="">giải pháp quản lý</div>
        <div className="">tự động hóa</div>
        <div className="">data center</div>
        <div className="">phục vụ y tế</div>
      </div>
    </nav>
  );
};

export default CategoryNavigation;
