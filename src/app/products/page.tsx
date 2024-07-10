"use client";

import apis from "@/apis";
import { Button } from "@/components/ui/button";
import { RootState } from "@/lib/store";
import { createQuery } from "@/lib/utils";
import * as React from "react";
import { useSelector } from "react-redux";
import ShowProdByCate from "./(components)/ShowProdsByCate";
import useGetLabel from "@/hooks/useGetLabel";

export interface ICateState {
  name: string;
  slug: string;
  thumbnail?: string;
}

const IndexPage = () => {
  const [categories, setCategories] = React.useState<ICateState[]>([]);
  const locale = useSelector((state: RootState) => state.contentLang.lang);
  const [pagination, setPagination] = React.useState({
    page: 1,
    pageSize: 10,
    total: 0,
    pageCount: 1,
  });
  const { getLabel } = useGetLabel();

  const handleGetAllCate = (page: number = 1) => {
    apis
      .getPublic(
        "categories",
        createQuery({
          populate: {
            thumbnail: {
              fields: ["url"],
            },
          },
          fields: ["id", "name", "slug"],
          sort: ["createdAt:desc"],
          pagination: {
            page: page || pagination.page,
            pageSize: pagination.pageSize,
          },
          locale,
        })
      )
      .then((res) => {
        const { data, meta } = res.data;
        const { pagination } = meta;
        const list = data.reduce((_cates: ICateState[], _cate: any) => {
          const { id, attributes } = _cate;
          _cates.push({
            name: attributes.name,
            slug: attributes.slug,
            thumbnail: attributes.thumbnail?.data.attributes.url ?? undefined,
          });
          return _cates;
        }, []);

        setCategories(list);
        setPagination(pagination);
      })
      .catch((err) => {
        console.log("[GET_CATES]: ", err);
      });
  };

  React.useEffect(() => {
    handleGetAllCate(1);
  }, [locale]);
  
  return (
    <section className=" md:dhv-container dhv-container-sm flex flex-col gap-6">
      {categories.length > 0 ? (
        categories.map((_item, _idx) => (
          <ShowProdByCate
            cateName={_item.name}
            thumbnail={_item.thumbnail}
            key={_idx}
            cateSlug={_item.slug}
          />
        ))
      ) : (
        <div className="w-full text-center py-10">
          {getLabel("product.content.empty")}
        </div>
      )}
      {pagination.page < pagination.pageCount && (
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => handleGetAllCate(pagination.page + 1)}
        >
          {getLabel("product.button.loadmore")}
        </Button>
      )}
    </section>
  );
};

export default IndexPage;
