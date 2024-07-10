"use client";

import apis from "@/apis";
import useGetLabel from "@/hooks/useGetLabel";
import { getFileURL, getImageURL } from "@/lib/function";
import { cn, createQuery } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SameCate from "../(components)/SameCate";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export interface IImage {
  id: number;
  attributes: {
    url: string;
  };
}

export interface IProductState {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
    desc?: string;
    thumbnail: {
      data?: IImage;
    };
    category?: {
      data?: {
        id: number;
        attributes: {
          name: string;
          slug: string;
          desc?: string;
          thumbnail?: {
            data?: {
              id: number;
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
    product_brand?: {
      data?: {
        id: number;
        attributes: {
          name: string;
          slug: string;
          desc?: string;
          logo?: {
            data?: {
              id: number;
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
    attach_file_vi?: {
      data?: {
        id: number;
        attributes: {
          alternativeText?: string;
          caption?: string;
          ext: string;
          mime: string;
          name: string;
          url: string;
        };
      };
    };
    attach_file_en?: {
      data?: {
        id: number;
        attributes: {
          alternativeText?: string;
          caption?: string;
          ext: string;
          mime: string;
          name: string;
          url: string;
        };
      };
    };
    attach_file_kr?: {
      data?: {
        id: number;
        attributes: {
          alternativeText?: string;
          caption?: string;
          ext: string;
          mime: string;
          name: string;
          url: string;
        };
      };
    };
  };
}

export default function ProductDetail({
  productSlug,
}: {
  productSlug: string;
}) {
  const router = useRouter();
  const [product, setProduct] = useState<IProductState>({
    id: 0,
    attributes: {
      title: "",
      createdAt: undefined,
      slug: "",
      content: "",
      desc: "",
      category: {
        data: {
          id: 0,
          attributes: {
            name: "",
            slug: "",
            desc: "",
            thumbnail: {
              data: {
                id: 0,
                attributes: {
                  url: "",
                },
              },
            },
          },
        },
      },
      product_brand: {
        data: {
          id: 0,
          attributes: {
            name: "",
            slug: "",
            desc: "",
            logo: {
              data: {
                id: 0,
                attributes: {
                  url: "",
                },
              },
            },
          },
        },
      },
      thumbnail: {
        data: {
          id: 0,
          attributes: {
            url: "",
          },
        },
      },
      attach_file_vi: {},
      attach_file_en: {},
      attach_file_kr: {},
      updatedAt: undefined,
    },
  });
  const { getLabel } = useGetLabel();
  const locale = useSelector((state: RootState) => state.contentLang.lang);

  useEffect(() => {
    if (!productSlug) {
      router.push("/not-found");
    }

    const handleGetProduct = () => {
      apis
        .getPublic(
          "products",
          createQuery({
            populate: {
              thumbnail: {
                fields: ["url"],
              },
              category: {
                populate: {
                  thumbnail: {
                    fields: ["url"],
                  },
                },
              },
              product_brand: {
                populate: {
                  logo: {
                    fields: ["url"],
                  },
                },
              },
              attach_file_vi: "*",
              attach_file_en: "*",
              attach_file_kr: "*",
            },
            filters: {
              slug: productSlug,
            },
            locale,
          })
        )
        .then((res) => {
          const { data } = res.data;
          if (data.length < 1) return router.push("/not-found");
          const { id, attributes } = data[0];
          setProduct({
            id,
            attributes,
          });
        })
        .catch((err) => {
          console.log("[GET_PRODUCT_DETAIL]: ", err);
        });
    };

    handleGetProduct();
  }, [productSlug, locale]);

  return (
    <div className="lg:dhv-container dhv-container-sm">
      {/* TODO: product_info  */}
      <div className="mt-10 flex flex-col gap-10">
        <div className="sm:text-3xl text-lg font-bold">
          {product.attributes.title}
        </div>
        {product.attributes.desc && product.attributes.desc.trim() !== "" && (
          <div className="sm:text-3xl text-lg font-bold">
            {product.attributes.desc}
          </div>
        )}
        <div className="flex flex-col space-y-3">
          {product.attributes.attach_file_vi?.data && (
            <a
              className="cursor-pointer text-blue-800 font-bold text-sm md:text-lg"
              href={getFileURL(
                product.attributes.attach_file_vi?.data.attributes.url
              )}
              target="_blank">
              {`===>> Download ${
                product.attributes.attach_file_vi?.data.attributes.name
              } (${getLabel("product.content.download-vi")})`}
            </a>
          )}
          {product.attributes.attach_file_en?.data && (
            <a
              className="cursor-pointer text-blue-800 font-bold text-sm md:text-lg"
              href={getFileURL(
                product.attributes.attach_file_en?.data.attributes.url
              )}
              target="_blank">
              {`===>> Download ${
                product.attributes.attach_file_en?.data.attributes.name
              } (${getLabel("product.content.download-en")})`}
            </a>
          )}
          {product.attributes.attach_file_kr?.data && (
            <a
              className="cursor-pointer text-blue-800 font-bold text-sm md:text-lg"
              href={getFileURL(
                product.attributes.attach_file_kr?.data.attributes.url
              )}
              target="_blank">
              {`===>> Download ${
                product.attributes.attach_file_kr?.data.attributes.name
              } (${getLabel("product.content.download-kr")})`}
            </a>
          )}
        </div>
        <div
          className=""
          dangerouslySetInnerHTML={{
            __html: product.attributes.content ?? "",
          }}></div>
      </div>
      {/* TODO: brand_info */}
      {product.attributes.product_brand?.data && (
        <div className="mt-20">
          <div className="sm:text-2xl text-lg font-bold">
            {`${getLabel("product.content.brand.label")} ${
              product.attributes.product_brand.data.attributes.name
            }`}
          </div>
          {product.attributes.product_brand &&
            product.attributes.product_brand.data.attributes.logo && (
              <div className="flex justify-center items-center">
                <Image
                  alt=""
                  src={getImageURL(
                    product.attributes.product_brand.data.attributes.logo.data
                      ?.attributes.url
                  )}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="mt-10 object-cover w-3/5 h-auto"
                />
              </div>
            )}
          <div className="mt-10">
            {product.attributes.product_brand.data.attributes.desc}
          </div>
          <div
            className="mt-10"
            dangerouslySetInnerHTML={{
              __html: product.attributes.product_brand.data.attributes.desc ?? "",
            }}></div>
        </div>
      )}
      {/* TODO: category */}
      {product.attributes.category?.data && (
        <div className="mt-20">
          <SameCate
            cateSlug={
              product.attributes.category.data.attributes.slug as string
            }
            withoutProductId={product.id}
          />
        </div>
      )}
    </div>
  );
}
