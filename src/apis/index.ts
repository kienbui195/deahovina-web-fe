import { IGlobalData, ITopBanner } from "@/dataTypes";
import { createQuery } from "@/lib/utils";
import axios, { CancelToken } from "axios";
import moment from "moment";

const apis = {
  get: async (url: string, query?: string) => {
    const localToken =
      localStorage.getItem("DHV") &&
      JSON.parse(localStorage.getItem("DHV") || "")?.token;

    try {
      return await axios.get(
        `${process.env.NEXT_PUBLIC_BE_API}/${url}${query ? `?${query}` : ""}`,
        {
          headers:
            localToken && localToken !== ""
              ? { Authorization: `Bearer ${localToken}` }
              : {},
        }
      );
    } catch (err: any) {
      throw err;
    }
  },

  getPublic: async (url: string, query?: string) => {
    try {
      return await axios.get(
        `${process.env.NEXT_PUBLIC_BE_API}/${url}${query ? `?${query}` : ""}`
      );
    } catch (err: any) {
      throw err;
    }
  },

  getOne: async (url: string, id: number, query?: string) => {
    const localToken =
      localStorage.getItem("DHV") &&
      JSON.parse(localStorage.getItem("DHV") || "")?.token;
    try {
      return await axios.get(
        `${process.env.NEXT_PUBLIC_BE_API}/${url}/${id}${
          query ? `?${query}` : ""
        }`,
        {
          headers:
            localToken && localToken !== ""
              ? { Authorization: `Bearer ${localToken}` }
              : {},
        }
      );
    } catch (err: any) {
      throw err;
    }
  },

  getOnePublic: async (url: string, id: number, query?: string) => {
    try {
      return await axios.get(
        `${process.env.NEXT_PUBLIC_BE_API}/${url}/${id}${
          query ? `?${query}` : ""
        }`
      );
    } catch (err: any) {
      throw err;
    }
  },

  post: async (url: string, data: any) => {
    const localToken =
      localStorage.getItem("DHV") &&
      JSON.parse(localStorage.getItem("DHV") || "")?.token;
    try {
      return await axios.post(
        `${process.env.NEXT_PUBLIC_BE_API}/${url}`,
        {
          ...data,
        },
        {
          headers:
            localToken && localToken !== ""
              ? { Authorization: `Bearer ${localToken}` }
              : {},
        }
      );
    } catch (err: any) {
      throw err;
    }
  },

  update: async (url: string, id: number, data: any) => {
    const localToken =
      localStorage.getItem("DHV") &&
      JSON.parse(localStorage.getItem("DHV") || "")?.token;
    try {
      return await axios.put(
        `${process.env.NEXT_PUBLIC_BE_API}/${url}/${id}`,
        {
          ...data,
        },
        {
          headers:
            localToken && localToken !== ""
              ? { Authorization: `Bearer ${localToken}` }
              : {},
        }
      );
    } catch (err: any) {
      throw err;
    }
  },

  del: async (url: string, id: number) => {
    const localToken =
      localStorage.getItem("DHV") &&
      JSON.parse(localStorage.getItem("DHV") || "")?.token;
    try {
      return await axios.delete(
        `${process.env.NEXT_PUBLIC_BE_API}/${url}/${id}`,
        {
          headers:
            localToken && localToken !== ""
              ? { Authorization: `Bearer ${localToken}` }
              : {},
        }
      );
    } catch (err: any) {
      throw err;
    }
  },

  uploadImage: async (image: File, cancelToken?: CancelToken) => {
    const localToken =
      localStorage.getItem("DHV") &&
      JSON.parse(localStorage.getItem("DHV") || "")?.token;

    const formData = new FormData();
    formData.append("files", image);

    return await axios.request({
      url: process.env.NEXT_PUBLIC_BE_API + "/upload",
      method: "POST",
      headers:
        localToken && localToken !== ""
          ? { Authorization: `Bearer ${localToken}` }
          : {},
      data: formData,
      ...(cancelToken ? { cancelToken } : {}),
    });
  },

  uploadMultiImage: async (images: FileList) => {
    const localToken =
      localStorage.getItem("DHV") &&
      JSON.parse(localStorage.getItem("DHV") || "")?.token;

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }

    return await axios.request({
      url: process.env.NEXT_PUBLIC_BE_API + "/upload",
      method: "POST",
      headers:
        localToken && localToken !== ""
          ? { Authorization: `Bearer ${localToken}` }
          : {},
      data: formData,
    });
  },

  getGlobalData: async () => {
    const url = process.env.NEXT_PUBLIC_BE_API;
    try {
      return await axios.get(
        `${url}/global?${createQuery({
          populate: {
            top_banner: {
              populate: {
                image: {
                  fields: ["url"],
                },
              },
            },
          },
        })}`
      );
    } catch (error: any) {
      return {
        data: null,
        error: error?.message,
      };
    }
  },
};

export default apis;
