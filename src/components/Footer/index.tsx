import Link from "next/link";
import * as React from "react";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="bg-blue-700 pt-[30px] text-md mt-[30px]">
      <div className="grid md:grid-cols-3 dhv-container">
        <div className="text-white font-semibold mb-[28px]">
          <div className="uppercase text-white font-semibold">
            Chính sách công ty
          </div>
          <div className="h-1 w-[50px] bg-slate-300 my-4"></div>
          <div className="space-y-5">
            <Link
              href="/chinh-sach-va-quy-dinh-chung"
              className="hover:underline block"
            >
              Chính sách và quy định chung
            </Link>
            <Link
              href="/chinh-sach-va-quy-dinh-chung"
              className="hover:underline block"
            >
              Chính sách bảo mật thông tin
            </Link>
            <Link
              href="/chinh-sach-va-quy-dinh-chung"
              className="hover:underline block"
            >
              Chính sách vận chuyển
            </Link>
            <Link
              href="/chinh-sach-va-quy-dinh-chung"
              className="hover:underline block"
            >
              Chính sách kiểm hàng, đổi trả hàng
            </Link>
            <Link
              href="/chinh-sach-va-quy-dinh-chung"
              className="hover:underline block"
            >
              Chính sách bảo hành sản phẩm
            </Link>
          </div>
        </div>

        <div className="text-white font-semibold mb-[28px]">
          <div className="uppercase text-white font-semibold">
            Chính sách công ty
          </div>
          <div className="h-1 w-[50px] bg-slate-300 my-4"></div>
          <div className="space-y-5">
            <Link
              href="/chinh-sach-va-quy-dinh-chung"
              className="hover:underline block"
            >
              Chính sách và quy định chung
            </Link>
            <Link
              href="/chinh-sach-va-quy-dinh-chung"
              className="hover:underline block"
            >
              Chính sách bảo mật thông tin
            </Link>
            <Link
              href="/chinh-sach-va-quy-dinh-chung"
              className="hover:underline block"
            >
              Chính sách vận chuyển
            </Link>
            <Link
              href="/chinh-sach-va-quy-dinh-chung"
              className="hover:underline block"
            >
              Chính sách kiểm hàng, đổi trả hàng
            </Link>
            <Link
              href="/chinh-sach-va-quy-dinh-chung"
              className="hover:underline block"
            >
              Chính sách bảo hành sản phẩm
            </Link>
          </div>
        </div>

        <div className="text-white font-semibold mb-[28px]">
          <div className="uppercase text-white font-semibold">TRỤ SỞ CHÍNH</div>
          <div className="h-1 w-[50px] bg-slate-300 my-4"></div>
          <div className="space-y-5">
            <Link
              href="/chinh-sach-va-quy-dinh-chung"
              className="hover:underline block"
            >
              Địa chỉ: 60 Đường số 1, P.Tân Thành, Q.Tân Phú, TP.HCM, Việt Nam
            </Link>
            <Link
              href="/chinh-sach-va-quy-dinh-chung"
              className="hover:underline block"
            >
              Chính sách bảo mật thông tin
            </Link>
            <Link
              href="/chinh-sach-va-quy-dinh-chung"
              className="hover:underline block"
            >
              Chính sách vận chuyển
            </Link>
            <Link
              href="/chinh-sach-va-quy-dinh-chung"
              className="hover:underline block"
            >
              Chính sách kiểm hàng, đổi trả hàng
            </Link>
            <Link
              href="/chinh-sach-va-quy-dinh-chung"
              className="hover:underline block"
            >
              Chính sách bảo hành sản phẩm
            </Link>
          </div>
        </div>
      </div>
      <div className="flex text-white h-[100px] flex-row text-md font-semibold justify-center items-center bg-slate-500">
        Copyright 2024 ©. Công ty Cổ Phần Giải Pháp Kỹ Thuật Ấn Tượng. GPDKKD:
        0309893542 do sở KH & ĐT TP.HCM cấp ngày 30/03/2010
      </div>
    </footer>
  );
};

export default Footer;
