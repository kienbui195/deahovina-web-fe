"use client";
import * as React from "react";
import apis from "@/apis";
import { cn, createQuery } from "@/lib/utils";
import useGetLabel from "@/hooks/useGetLabel";
import Image from "next/image";
import { BGTimeline } from "@/lib/svgExport";
import moment from "moment";
import { Dot } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Timeline, TimelineEvent } from "react-event-timeline";
import { ScrollArea } from "../ui/scroll-area";

export interface ITimelineItemProps {
  dateTime: Date;
  content: string;
  idx: number;
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
  const [histories, setHistories] = React.useState<any[]>([]);
  const [pagination, setPagination] = React.useState({
    page: 1,
    pageSize: 100,
    total: 0,
    pageCount: 1,
  });
  const { getLabel } = useGetLabel();
  const lang = useSelector((state: RootState) => state.contentLang.lang);
  const pathname = usePathname();

  const handleGetData = (page: number = 1) => {
    apis
      .getPublic(
        "histories",
        createQuery({
          pagination: {
            page: page || pagination.page,
            pageSize: pagination.pageSize,
          },
          sort: ["date:asc"],
          locale: lang,
        })
      )
      .then((res) => {
        const { data, meta } = res.data;
        const { pagination } = meta;
        let list = [];

        if (data.length > 0) {
          list = data.reduce((_acc: any[], _item: any) => {
            _acc.push({
              title: moment(_item.attributes.date).format("YYYY"),
              cardDetailedText: _item.attributes.activity.trim().split("\n"),
              cardTitle: getLabel(`section.timeline.activity`),
            });
            return _acc;
          }, []);
        }

        setHistories(page === 1 ? list : [...histories, ...list]);
        setPagination(pagination);
      })
      .catch((err) => {
        console.log("[GET_HISTORIES]", err);
      });
  };

  React.useEffect(() => {
    handleGetData(1);
  }, [lang, pathname]);

  return (
    <section
      className={cn([
        "w-full h-[60vh] relative mt-1",
        histories.length > 0 ? "flex" : "hidden",
      ])}
    >
      <Image alt="" src={BGTimeline} className="w-full h-full object-fill " />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25"></div>
      <div className="font-bold text-white text-2xl absolute p-2 top-4 left-4">
        {getLabel("section.timeline.label")}
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex py-8 justify-center px-10">
        <ScrollArea className="max-h-[90vh] h-full w-full">
          <Timeline style={{ width: "100%", maxWidth: "1060px" }}>
            {histories.map((item, idx) => {
              return (
                <TimelineEvent
                  key={idx}
                  title={item.title}
                  // createdAt={item.title}
                  className=""
                  titleStyle={{
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                  subtitle={item.cardTitle}
                  container={"card"}
                  icon={<Dot className="w-full h-full"/>}
                >
                  {item.cardDetailedText.map((text: string, index: number) => (
                    <div
                      key={index}
                      className="flex flex-row items-center gap-2 w-full"
                    >
                      <Dot className="w-6 h-6" />
                      <span>{text}</span>
                    </div>
                  ))}
                </TimelineEvent>
              );
            })}
          </Timeline>
        </ScrollArea>
        {pagination.page < pagination.pageCount && (
          <Button
            variant={"default"}
            className="font-bold w-[40vw] z-[5] absolute bg-slate-100 hover:bg-slate-200 active:bg-slate-200 text-black hover:-translate-y-1 bottom-5 left-1/2 -translate-x-1/2"
          >
            Load More
          </Button>
        )}
      </div>
    </section>
  );
};

export default TimelineSection;
