"use client";

import apis from "@/apis";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useGetLabel from "@/hooks/useGetLabel";
import { cn, createQuery } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export interface IProdState {
  id: number;
  attributes: {
    title: string;
    slug: string;
    thumbnail: {
      data?: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
  };
}

export default function SameCate({
  cateSlug,
  withoutProductId,
}: {
  cateSlug: string;
  withoutProductId: number;
}) {
  const [prods, setProds] = useState<IProdState[]>([]);
  const { getLabel } = useGetLabel();
  const locale = useSelector((state: RootState) => state.contentLang.lang);

  useEffect(() => {
    if (!cateSlug) return;
    const getSameCateProds = () => {
      apis
        .getPublic(
          "products",
          createQuery({
            filters: {
              category: {
                slug: cateSlug,
              },
              id: {
                $notContains: [withoutProductId],
              },
            },
            populate: {
              thumbnail: {
                fields: ["url"],
              },
            },
            sort: ["updatedAt:desc"],
            locale,
          })
        )
        .then((res) => {
          const { data } = res.data;
          setProds(data);
        })
        .catch((err) => {
          console.log("[GET_SAME_CATE]: ", err);
        });
    };

    getSameCateProds();
  }, [cateSlug, locale]);

  if (prods.length < 1) return null;

  return (
    <section className="flex flex-col gap-6">
      <div className="sm:text-2xl text-lg font-bold">
        {getLabel("product.content.category.label")}
      </div>
      <Carousel>
        <CarouselContent>
          {prods.map((prod, idx) => (
            <CarouselItem key={idx} className="sm:basis-1/4">
              <ProductCard
                title={prod.attributes.title}
                slug={prod.attributes.slug}
                thumbnail={prod.attributes.thumbnail.data?.attributes.url}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
