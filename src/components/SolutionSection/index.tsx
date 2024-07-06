import useGetLabel from "@/hooks/useGetLabel";
import { BGPinSun, BGPinSun2, BGSolar, BGWindPower } from "@/lib/svgExport";
import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import * as React from "react";

const CardImage = ({
  content,
  icon,
}: {
  content?: string;
  icon: StaticImport;
}) => {
  return (
    <div className="w-[300px]  h-[200px]  relative group/cardImage select-none">
      <Image
        alt=""
        src={icon}
        className="w-[300px]  h-[200px]  rounded-lg shadow-md object-cover group-hover/cardImage:scale-110 transition-all duration-1000 scale-100"
      />
      {content && (
        <div className="absolute top-0 left-0 w-full h-full group-hover/cardImage:scale-110 transition-all duration-1000 scale-100">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25 "></div>
          <div
            className="flex-1 h-full flex justify-center items-center text-white font-bold uppercase drop-shadow-2xl text-center"
            style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
          >
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

const SectionSolution = () => {
  const { getLabel } = useGetLabel();
  const divRef = React.useRef<HTMLDivElement>(null);
  const [itemH, setItemH] = React.useState(0);

  React.useEffect(() => {
    const handleSetSize = () => {
      if (!divRef.current) return;
      setItemH(divRef.current.getBoundingClientRect().height);
    };

    handleSetSize();
    document.addEventListener("resize", handleSetSize);

    return () => {
      document.removeEventListener("resize", handleSetSize);
    };
  }, [divRef.current]);

  return (
    <section className="w-full bg-white h-auto mt-10">
      <div className="relative bg-white">
        <Image
          alt=""
          src={BGSolar}
          className="w-full bg-white h-auto max-h-[400px] object-cover"
        />
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-slate-800 opacity-80 p-0 flex justify-center items-center flex-col text-center gap-4">
          <div className="font-bold text-white md:text-3xl text-lg">
            Giải pháp
          </div>
          <div className="text-white font-semibold lg:px-72 px-2 text-xs lg:text-base">
            {getLabel("intro.solution.content")}
          </div>
        </div>
        <div
          ref={divRef}
          className="lg:h-1/4 h-fit w-full px-8 absolute z-[11] lg:bottom-0 top-100 rounded-full flex lg:flex-row flex-col lg:gap-10 gap-4 items-center justify-center lg:translate-y-1/3 -translate-y-10"
        >
          {[
            {
              content: getLabel("navigation.solutions.solar"),
              icon: BGPinSun,
            },
            {
              content: getLabel("navigation.solutions.power.distribution"),
              icon: BGPinSun2,
            },
            {
              content: getLabel("navigation.solutions.electrical.automation"),
              icon: BGWindPower,
            },
          ].map((_item, _idx) => (
            <CardImage key={_idx} content={_item.content} icon={_item.icon} />
          ))}
        </div>
      </div>
      <div
        className={cn(["lg:hidden flex w-full"])}
        style={{ height: `${itemH}px` }}
      ></div>
      <div className="lg:mb-32 mb-0 lg:flex hidden"></div>
    </section>
  );
};

export default SectionSolution;
