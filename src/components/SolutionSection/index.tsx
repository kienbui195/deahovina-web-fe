import { BGSolar } from "@/lib/svgExport";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

const SectionSolution = () => {
  return (
    <section className="w-full bg-white h-auto mt-10">
      <div className="relative">
        <Image
          alt=""
          src={BGSolar}
          className="w-full h-auto max-h-[400px] object-cover"
        />
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-slate-800 opacity-80 p-0 flex justify-center items-center flex-col text-center gap-4">
          <div className="font-bold text-white md:text-3xl text-lg">
            Giai phap
          </div>
          <div className="text-white font-semibold md:px-56 px-2 text-xs md:text-base">
            DEAHO VINA sở hữu hệ sinh thái năng lượng toàn diện từ các giải pháp
            năng lượng xanh, phân phối và hệ thống lưu trữ đến dịch vụ gia tăng
            giá trị, cam kết đồng hành cùng doanh nghiệp trong sứ mệnh phát
            triển ngành năng lượng bền vững.
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default SectionSolution;
