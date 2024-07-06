"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "../ui/button";
import useGetLabel from "@/hooks/useGetLabel";
import Image from "next/image";
import { SquareLogo } from "@/lib/svgExport";
import { Facebook, Globe, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const Footer = () => {
  const { getLabel } = useGetLabel();
  const formSchema = React.useMemo(() => {
    return z.object({
      fullName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
      email: z.string().email({
        message: "Email is invalid.",
      }),
      phone: z.number().min(8, {
        message: "Phone is invalid.",
      }),
      desc: z.string().min(1, {
        message: "Type your content.",
      }),
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: 0,
      desc: "",
    },
  });

  const onSubmit = () => {
    alert(1)
  };

  return (
    <footer className="bg-blue-700 text-md mt-[30px] pt-9">
      <div className="flex md:flex-row flex-wrap flex-col gap-4 justify-between lg:dhv-container dhv-container-sm">
        <div className=" text-white font-semibold mb-[28px] text-xs max-w-[500px]">
          <div className="flex flex-row gap-2">
            <Image alt="" src={SquareLogo} className="w-[120px] h-24 object-cover" />
            <div className="flex flex-col gap-2 justify-start items-start">
              <div className="flex gap-2">
                <MapPin className="w-3 h-3" />
                <div className="text-wrap">{getLabel("footer.contact.address")}</div>
              </div>
              <div className="flex gap-2 text-wrap ">
                <Phone className="w-3 h-3" />
                <div className="flex flex-col gap-1">
                  <div>{"+84(VN)965-058-521"}</div>
                  <div>{"+82(KR)10-3145-0717"}</div>
                </div>
              </div>
              <Link href={`mailto:daehovina@gmail.com`} className="flex gap-2 items-center hover:underline">
                <Mail className="w-3 h-3" />
                <div>daehovina@gmail.com</div>
              </Link>
              <Link href={`mailto:daehovina@gmail.com`} className="flex gap-2 items-center hover:underline">
                <Globe className="w-3 h-3" />
                <div>example.deahovina.com</div>
              </Link>
            </div>
          </div>
          <div className="w-full mt-4 capitalize">{getLabel("intro.company.name")}</div>
          <div className="flex flex-row gap-1 mt-4">
            <Button size={"icon"} className="rounded-full">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button size={"icon"} className="rounded-full">
              <Instagram className="w-4 h-4" />
            </Button>
            <Button size={"icon"} className="rounded-full">
              <Mail className="w-4 h-4" />
            </Button>
            <Button size={"icon"} className="rounded-full">
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button size={"icon"} className="rounded-full">
              <Youtube className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="text-white font-semibold mb-[28px]">
          <div className="uppercase text-white font-semibold">{getLabel('footer.policy.label')}</div>
          <div className="h-1 w-[50px] bg-slate-300 my-4"></div>
          <div className="space-y-5">
            <Link href="/chinh-sach-va-quy-dinh-chung" className="hover:underline block">
              Chính sách và quy định chung
            </Link>
            <Link href="/chinh-sach-va-quy-dinh-chung" className="hover:underline block">
              Chính sách bảo mật thông tin
            </Link>
            <Link href="/chinh-sach-va-quy-dinh-chung" className="hover:underline block">
              Chính sách vận chuyển
            </Link>
            <Link href="/chinh-sach-va-quy-dinh-chung" className="hover:underline block">
              Chính sách kiểm hàng, đổi trả hàng
            </Link>
            <Link href="/chinh-sach-va-quy-dinh-chung" className="hover:underline block">
              Chính sách bảo hành sản phẩm
            </Link>
          </div>
        </div>

        <div className=" font-semibold mb-[28px] min-w-[400px]">
          <div className="uppercase text-white font-semibold">{getLabel("footer.contact.button.label")}</div>
          <div className="h-1 w-[50px] bg-slate-300 my-4"></div>
          <div className="">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-bold">Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="type your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-bold">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="type your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-bold">Your Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="type your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem >
                      <FormLabel className="text-white font-bold">Tell Something To Us</FormLabel>
                      <FormControl>
                        <textarea className="w-full rounded min-h-32 p-2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full">Submit</Button>
              </form> 
            </Form>
          </div>
        </div>
      </div>
      <div className="flex text-slate-300 h-14 flex-row text-md font-semibold justify-center dhv-container-sm items-center bg-slate-500">
        Copyright 2024 ©. {getLabel("intro.company.name")}
      </div>
    </footer>
  );
};

export default Footer;
