import * as React from "react";
import ProductDetail from "./ProductDetail";
import apis from "@/apis";
import { createQuery } from "@/lib/utils";

export interface IOpenGraphImage {
  url: string;
  width: number;
  height: number;
}

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  try {
    const res = await apis.getPublic(
      "products",
      createQuery({
        filters: {
          slug: params.slug,
        },
        populate: {
          thumbnail: {
            fields: ["url"],
          },
          category: {
            populate: {
              thumbnail: {
                fields: "url",
              },
            },
          },
          product_brand: "*",
        },
      })
    );

    if (res.data.data.length > 0) {
      const { attributes } = res.data.data[0];
      const { name: title, desc: description, thumbnail } = attributes;

      return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_BE as string),
        title,
        description,
        alternates: {
          canonical: `/${params.slug}`,
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: thumbnail.data
            ? Array.from(thumbnail.data).reduce((acc: string[], item: any) => {
                acc.push(`${item.attributes.url}`);
                return acc;
              }, [])
            : [],
        },
        openGraph: {
          title,
          description,
          url: `${process.env.NEXT_PUBLIC_FE_URL}/products/${params.slug}`,
          type: "website",
          images: thumbnail.data
            ? Array.from(thumbnail.data).reduce(
                (acc: IOpenGraphImage[], item: any) => {
                  acc.push({
                    url: `${item.attributes.url}`,
                    width: 800,
                    height: 600,
                  });
                  return acc;
                },
                []
              )
            : [],
        },
      };
    }

    return {
      title: "DEAHO VINA",
      description: "",
    };
  } catch (error: any) {
    console.log("[GET_PRODUCT_DETAIL]", error?.message);

    return {
      title: "DEAHO VINA",
      description: "The page you are looking for does not exist.",
    };
  }
};

const Page = ({ params }: { params: { slug: string } }) => {
  return <ProductDetail productSlug={params.slug} />;
};

export default Page;
