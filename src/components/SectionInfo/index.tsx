import {
  AlignJustify,
  HandPlatter,
  Headset,
  PiggyBank,
  ShieldCheck,
} from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const SectionInfo = () => {
  return (
    <section className="flex flex-col space-y-6 mt-[30px]">
      <div className="relative  h-[48px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white border border-slate-200 p-[6px_18px] h-full flex flex-row items-center space-x-4">
          <AlignJustify className="w-6 h-6" />
          <span className="text-blue-600 uppercase font-bold">
            ATPRO CAM KẾT VỚI QUÝ KHÁCH
          </span>
        </div>
        <div className="w-full h-full flex flex-row items-center">
          <div className="h-[2px] w-full bg-slate-200"></div>
        </div>
      </div>
      <div className="space-x-4 flex flex-row justify-center items-start">
        <Card className="w-[256px] flex flex-col justify-center items-center shadow-xl">
          <CardHeader>
            <ShieldCheck className="w-10 h-10" />
          </CardHeader>
          <CardContent className="text-blue-600 text-center bg-slate-200 pt-4">
            <div className="text-blue-600 font-bold uppercase">
              CAM KẾT CHẤT LƯỢNG
            </div>
            <span>
              Chất lượng sản phẩm luôn là điều cốt lõi trong sự phát triển của
              ATPro. Vì thế, những sản phẩm được bán bên ATPro luôn cam kết chất
              lượng cao nhất khi đến tay khách hàng.
            </span>
          </CardContent>
        </Card>

        <Card className="w-[256px] flex flex-col justify-center items-center shadow-xl">
          <CardHeader>
            <PiggyBank className="w-10 h-10" />
          </CardHeader>
          <CardContent className="text-blue-600 text-center bg-slate-200 pt-4">
            <div className="text-blue-600 font-bold uppercase">
              GIÁ THÀNH HỢP LÝ
            </div>
            <span>
              Bán những sản phẩm chất lượng cao nhưng giá thành hợp lý là điều
              không hề dễ dàng. Chúng tôi luôn tối ưu mọi khâu để cung cấp sản
              phẩm chất lượng với giá rẻ nhất.
            </span>
          </CardContent>
        </Card>

        <Card className="w-[256px] flex flex-col justify-center items-center shadow-xl">
          <CardHeader>
            <Headset className="w-10 h-10" />
          </CardHeader>
          <CardContent className="text-blue-600 text-center bg-slate-200 pt-4">
            <div className="text-blue-600 font-bold uppercase">
              TƯ VẤN TẬN TÂM
            </div>
            <span>
              Đặt lợi ích khách hàng lên hàng đầu, ATPro luôn lắng nghe và đưa
              ra giải pháp tối ưu nhất đến với khách hàng của mình. Đội ngũ nhân
              viên tư vấn vô cùng tận tâm, chu đáo.
            </span>
          </CardContent>
        </Card>

        <Card className="w-[256px] flex flex-col justify-center items-center shadow-xl">
          <CardHeader>
            <HandPlatter className="w-10 h-10" />
          </CardHeader>
          <CardContent className="text-blue-600 text-center bg-slate-200 pt-4">
            <div className="text-blue-600 font-bold uppercase">
              LẮP ĐẶT TẬN NƠI
            </div>
            <span>
              ATPro lắp đặt hệ thống và giải pháp trên toàn quốc. Đội ngũ có
              chuyên môn cao, làm việc chuyên nghiệp. Các hệ thống và giải pháp
              được triển khai lắp đặt nhanh chóng .
            </span>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SectionInfo;
