import * as React from 'react'
import { ITimelineItemProps } from ".";
import moment from 'moment';

const TimelineItem: React.FC<ITimelineItemProps> = ({ dateTime, content }) => {
  return (
    <div className="mb-8 flex justify-between items-center w-full">
      <div className="order-1 w-5/12"></div>
      <div className="order-1 w-5/12 px-1 py-4 text-right">
        <div className="bg-blue-500 text-white rounded-lg shadow-lg px-4 py-2">
          <p className="mb-1 text-sm font-bold">{moment(dateTime).format("MMM DD, YYYY")}</p>
          <p className="text-base">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem