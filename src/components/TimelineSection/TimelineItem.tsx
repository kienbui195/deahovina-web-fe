"use client";

import * as React from "react";
import { ITimelineItemProps } from ".";
import moment from "moment";
import { cn } from "@/lib/utils";

const TimelineItem: React.FC<ITimelineItemProps> = ({ dateTime, content, id }) => {
  return (
    <div className={cn([id % 2 === 0 ? "flex justify-between items-center" : ""])}>
      <div className="order-1 w-5/12"></div>
      <div className="order-1 w-5/12 px-1 py-4">
        <div className="bg-blue-500 text-white rounded-lg shadow-lg px-4 py-2">
          <div className="py-2">
          <div className="mb-1 text-sm font-bold p-2 bg-green-500 w-fit rounded-sm">
            {moment(dateTime).format("YYYY")}
          </div>
          </div>
          <hr />
          <p className="mt-4 text-base">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
