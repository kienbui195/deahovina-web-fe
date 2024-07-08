"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useGetLabel from "@/hooks/useGetLabel";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";
import apis from "@/apis";

const ContactUs = () => {
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
        message: "Username must be at least 8 characters.",
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (
      data.desc.trim() === "" ||
      data.email.trim() === "" ||
      data.fullName.trim() === ""
    ) {
      Swal.fire({
        title: "Sending information failed!",
        text: "Please email the information before sending it to us so we can contact you as soon as possible!",
        icon: "info",
      });
      return;
    }

    apis
      .post("user-contacts", {
        data: {
          username: data.fullName,
          email: data.email,
          phone: `+${data.phone}`,
          user_contact_content: data.desc,
        },
      })
      .then((res) => {
        Swal.fire({
          title: "Information sent successfully!",
          text: "Thank you for taking the time to care about us. We are reviewing your information and will contact you as soon as possible!",
          icon: "success",
        });
        form.setValue("fullName", "");
        form.setValue("desc", "");
        form.setValue("phone", 0);
        form.setValue("email", "");
      })
      .catch(() => {
        Swal.fire({
          title: "Sending information failed!",
          text: "Oops! There's nothing wrong with this, please come back later!",
          icon: "error",
        });
      });
  };

  return (
    <section className="mt-10">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1862.7355118436697!2d105.81222203876818!3d20.973747849665184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zU-G7kSAyNyBNYXJrZXQgU3VucmlzZSBCLCBUaGUgTWFub3IgQ2VudGVyIFBhcmssIFBoxrDhu51uZyDEkOG6oWkgS2ltLCBRdeG6rW4gSG_DoG5nIE1haSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1720405982799!5m2!1svi!2s"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        width={0}
        height={0}
        className="w-full h-[70vh]"
      ></iframe>

      <div className="md:dhv-container dhv-container-sm !mt-10 flex flex-col gap-4 items-center">
        <div className="font-bold text-xl">
          {getLabel("page.form.contactus.label")}
        </div>
        <div className="flex">
          <Card className="m-auto py-8 px-4 shadow-xl mt-4 md:min-w-[50vw] min-w-[90vw]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black font-bold">
                        {getLabel("page.form.contactus.input.name")}
                        <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input required {...field} />
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
                      <FormLabel className="text-black font-bold">
                        Email
                        <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input required {...field} />
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
                      <FormLabel className="text-black font-bold">
                        {getLabel("page.form.contactus.input.phone")}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Plus className="w-4 h-4 absolute top-1/2 -translate-y-1/2 bg-white left-2" />
                          <Input
                            {...field}
                            type="number"
                            value={field.value}
                            onChange={(e) => {
                              if (e.target.value.includes("-")) return;
                              field.onChange(+e.target.value);
                            }}
                            className="hide-arrows !pl-8"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter the area code in front of your phone number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black font-bold">
                        {getLabel("page.form.contactus.input.tellToUs")}
                        <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full">
                  {getLabel("page.form.contactus.button.label")}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
