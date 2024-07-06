"use client";
import * as React from "react";
import TimelineItem from "./TimelineItem";
import apis from "@/apis";
import { createQuery } from "@/lib/utils";
import useGetLabel from "@/hooks/useGetLabel";
import { AlignJustify } from "lucide-react";

export interface ITimelineItemProps {
  dateTime: Date;
  content: string;
  id: number;
}

export interface ITimelineState {
  id: number;
  attributes: {
    activity: string;
    date: Date;
    locale: "string";
  };
}

const TimelineSection = () => {
  const [histories, setHistories] = React.useState<ITimelineState[]>([]);
  const [pagination, setPagination] = React.useState({
    page: 1,
    pageSize: 25,
    total: 0,
    pageCount: 1,
  });
  const { getLabel } = useGetLabel();

  const handleGetData = (page: number = 1) => {
    apis
      .getPublic(
        "histories",
        createQuery({
          pagination: {
            page: page || pagination.page,
            pageSize: pagination.pageSize,
          },
        })
      )
      .then(res => {
        const { data, meta } = res.data;
        const { pagination } = meta;
        let list = [];
        if (data.length > 0) {
          list = data.reduce((_acc: ITimelineState[], _item: any) => {
            _acc.push({
              id: _item.id,
              attributes: {
                activity: _item.attributes.activity,
                date: new Date(_item.attributes.date),
                locale: _item.attributes.locale,
              },
            });
            return _acc;
          }, []);
        }

        setHistories(page === 1 ? list : histories.concat(list));
        setPagination(pagination);
      })
      .catch(err => {
        console.log("[GET_HISTORIES]", err);
      });
  };

  React.useEffect(() => {
    handleGetData();
  }, []);

  return (
    <section className="container flex flex-col space-y-6 mt-[30px]">
      <div className="relative ">
        <div className="absolute top-0 -translate-x-1/2 bg-white border border-slate-200 p-[6px_18px] h-full flex flex-row items-center space-x-4">
          <AlignJustify className="w-6 h-6" />
          <span className="text-blue-600 uppercase font-bold">{getLabel("section.timeline.label")}</span>
        </div>
        <div className="w-full h-full flex flex-row items-center">
          <div className="h-[2px] w-full bg-slate-200"></div>
        </div>
      </div>
      <div className="h-full">
        <div className="border-2-2 border-blue-500 absolute h-full border left-1/2"></div>
        {histories.map((item, index) => (
          <TimelineItem id={item.id} key={index} dateTime={item.attributes.date} content={item.attributes.activity} />
        ))}
      </div>
    </section>
  );
};

export default TimelineSection;
