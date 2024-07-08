"use client";
import apis from "@/apis";
import { RootState } from "@/lib/store";
import { createQuery } from "@/lib/utils";
import * as React from "react";
import { useSelector } from "react-redux";

const IndexPage = ({ params }: { params: { slug: string } }) => {
  const [pageInfo, setPageInfo] = React.useState<{
    name: string;
    heading: string;
    content: string;
  }>({
    name: "",
    content: "",
    heading: "",
  });
  const locale = useSelector((state: RootState) => state.contentLang.lang);
  const getPageInfo = () => {
    apis
      .getPublic(
        "solutions",
        createQuery({
          filters: {
            name: params.slug,
          },
          locale,
        })
      )
      .then((res) => {
        const [data] = res.data.data;
        setPageInfo(data.attributes);
      });
  };

  React.useEffect(() => {
    getPageInfo();
  }, [locale]);

  
  React.useEffect(() => {
    if (pageInfo.content !== "") {
      setTimeout(() => {
        const ref = document.getElementsByClassName("solution-content")[0]
        const figures = ref.getElementsByTagName("figure")
        Array.from(figures).map((figure) => {
          figure.style.display = "flex"
          figure.style.justifyContent = "center"
        })
      }, 0)
    }
  }, [pageInfo.content]);


  return (
    <main className="mt-10 lg:dhv-container dhv-container-sm">
      <h2 className="uppercase text-[24px] sm:text-[36px] lg:text-[48px] font-bold my-5 sm:my-10 md:my-20 text-center">
        {pageInfo.heading}
      </h2>
      <section className="solution-content mt-10">
        <div
          dangerouslySetInnerHTML={{
            __html: pageInfo.content,
          }}></div>
      </section>
    </main>
  );
};

export default IndexPage;
