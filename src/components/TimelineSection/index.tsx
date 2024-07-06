"use client";
import * as React from "react";
import TimelineItem from "./TimelineItem";

export interface ITimelineItemProps {
  dateTime: Date;
  content: string;
}



const TimelineSection = ({ items }: { items: ITimelineItemProps[] }) => {
  return (
    <div className="container mx-auto w-full h-full">
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="border-2-2 border-blue-500 absolute h-full border left-1/2"></div>
        {items.map((item, index) => (
          <TimelineItem key={index} dateTime={item.dateTime} content={item.content} />
        ))}
      </div>
    </div>
  );
};

export default TimelineSection;
