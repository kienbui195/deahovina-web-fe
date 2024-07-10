"use client";

import apis from "@/apis";
import ProductCard from "@/app/products/(components)/ProductCard";
import { IProductState } from "@/app/products/[slug]/ProductDetail";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useGetLabel from "@/hooks/useGetLabel";
import useShowErrorMessage from "@/hooks/useShowErrorMessage";
import { getImageURL } from "@/lib/function";
import { RootState } from "@/lib/store";
import { createQuery } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useSelector } from "react-redux";

export interface IGroupedProducts {
  brandName: "related-articles" | string;
  products?: IProductState[];
}

const ProductGroupByCategory = ({ params }: { params: { slug: string } }) => {
  const { getLabel } = useGetLabel();
  const locale = useSelector((state: RootState) => state.contentLang.lang);
  const [groupProductsByBrands, setGroupProductsByBrands] = React.useState<
    IGroupedProducts[]
  >([]);
  const [cate, setCate] = React.useState({
    id: 0,
    name: "",
    slug: "",
    desc: "",
    thumbnail: "",
  });
  const router = useRouter();

  const handleGetProdsGroupByBrand = () => {
    apis
      .getPublic(
        "products",
        createQuery({
          populate: {
            thumbnail: {
              fields: ["url"],
            },
            product_brand: {
              fields: ["name"],
            },
          },
          filters: {
            category: {
              slug: params.slug,
            },
          },
          sort: ["createdAt:desc", "product_brand.name:asc"],
          locale,
          pagination: {
            page: 1,
            pageSize: 1000,
          },
        })
      )
      .then((res) => {
        const data: IProductState[] = res.data.data;
        const list = Object.groupBy(
          data,
          (item: IProductState) =>
            item.attributes.product_brand?.data?.attributes.name ||
            "related-articles"
        );
        const transformedData: IGroupedProducts[] = Object.entries(list).map(
          ([brandName, products]) => ({
            brandName,
            products,
          })
        );
        setGroupProductsByBrands(transformedData);
      })
      .catch((err) => {
        console.log(err);
        useShowErrorMessage("");
      });
  };

  const handleGetCateInfo = () => {
    apis
      .getPublic(
        "categories",
        createQuery({
          filters: {
            slug: params.slug,
          },
          populate: {
            thumbnail: {
              fields: ["url"],
            },
          },
          locale,
        })
      )
      .then((res) => {
        const { data } = res.data;
        if (data.length < 1) return router.push("/not-found");
        const { id, attributes } = data[0];
        setCate({
          id,
          name: attributes.name,
          desc: attributes.desc,
          slug: attributes.slug,
          thumbnail: attributes.thumbnail?.data?.attributes.url,
        });
      })
      .catch((err) => {
        useShowErrorMessage("");
      });
  };

  React.useEffect(() => {
    handleGetProdsGroupByBrand();
    handleGetCateInfo();
  }, [locale]);

  return (
    <section className="lg:dhv-container dhv-container-sm">
      <div className="flex sm:flex-row sm:justify-between flex-col gap-4 items-center">
        <div className="text-3xl font-bold capitalize">{cate.name}</div>
        <Image
          alt=""
          src={getImageURL(cate.thumbnail)}
          width={0}
          height={0}
          sizes="100vw"
          className="object-cover w-[500px] sm:w-[1000px] h-[300px]"
        />
      </div>

      <div className="my-10">
        {groupProductsByBrands.length > 0 ? (
          groupProductsByBrands.map(({ brandName, products }, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <div className="bg-amber-500 text-black font-bold text-lg sm:text-xl pl-2 border-b border-black">
                {brandName === "related-articles"
                  ? `${getLabel("category.related-articles")} ${cate.name}`
                  : brandName}
              </div>
              <Carousel>
                <CarouselContent>
                  {products && products.length > 0 ? (
                    products.map((_item, _idx) => (
                      <CarouselItem
                        key={_idx}
                        className="basis-[85%] sm:basis-[30%]">
                        <ProductCard
                          key={_idx}
                          slug={_item.attributes.slug}
                          title={_item.attributes.title}
                          thumbnail={
                            _item.attributes.thumbnail.data?.attributes.url
                          }
                        />
                      </CarouselItem>
                    ))
                  ) : (
                    <div className="w-full text-center">
                      {getLabel("product.content.empty")}
                    </div>
                  )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ))
        ) : (
          <div className="w-full text-center">
            {getLabel("product.content.empty")}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGroupByCategory;
