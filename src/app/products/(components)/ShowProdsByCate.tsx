"use client";

import apis from "@/apis";
import { getImageURL } from "@/lib/function";
import { RootState } from "@/lib/store";
import { createQuery } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";
import { useSelector } from "react-redux";
import { ICateState } from "../page";
import ProductCard from "./ProductCard";
import useGetLabel from "@/hooks/useGetLabel";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ShowProdByCate = ({
  cateName,
  thumbnail,
  cateSlug,
}: {
  cateName: string;
  thumbnail?: string;
  cateSlug: string;
}) => {
  const [prods, setProds] = React.useState<ICateState[]>([]);
  const locale = useSelector((state: RootState) => state.contentLang.lang);
  const { getLabel } = useGetLabel();
  const [pagination, setPagination] = React.useState({
    page: 1,
    pageSize: 6,
    total: 0,
    pageCount: 1,
  });
  const router = useRouter();

  const handleGetProds = (page: number = 1) => {
    apis
      .getPublic(
        "products",
        createQuery({
          fields: ["id", "title", "slug"],
          populate: {
            thumbnail: {
              fields: ["url"],
            },
          },
          pagination: {
            page: page || pagination.page,
            pageSize: pagination.pageSize,
          },
          filters: {
            category: {
              slug: cateSlug,
            },
          },
          sort: ["createdAt:desc"],
          locale,
        })
      )
      .then((res) => {
        const { data, meta } = res.data;
        const { pagination } = meta;
        const list = data.reduce((_cates: ICateState[], _cate: any) => {
          const { id, attributes } = _cate;
          _cates.push({
            name: attributes.title,
            slug: attributes.slug,
            thumbnail: attributes.thumbnail?.data.attributes.url ?? undefined,
          });
          return _cates;
        }, []);

        setProds(list);
        setPagination(pagination);
      })
      .catch((err) => {
        console.log("[GET_CATE_AND_PRODS]: ", err);
      });
  };

  React.useEffect(() => {
    handleGetProds();
  }, [locale]);

  return (
    <section className="w-full flex flex-col gap-4 mb-20">
      <div className="flex sm:flex-row flex-col sm:justify-between items-center sm:px-10 px-2">
        <div className="text-lg sm:text-3xl font-bold">{cateName}</div>
        <Image
          alt=""
          src={getImageURL(thumbnail)}
          className="sm:w-[600px] w-full sm:h-[400px] h-auto object-cover"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 relative">
        {prods.length > 0 ? (
          prods.map((prod, idx) => (
            <ProductCard
              slug={prod.slug}
              title={prod.name}
              key={idx}
              thumbnail={prod.thumbnail}
            />
          ))
        ) : (
          <div className="w-full text-center py-10">
            {getLabel("product.content.empty")}
          </div>
        )}
        {prods.length > 0 && (
          <Button
            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-400 absolute -bottom-12 right-0"
            onClick={() => router.push(`/category/${cateSlug}`)}
          >
            {getLabel("product.button.loadmore")}
          </Button>
        )}
      </div>
    </section>
  );
};

export default ShowProdByCate;
