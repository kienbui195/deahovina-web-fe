"use client";

import {
  Service1,
  Service2,
  Service3,
  Service4,
  Service5,
} from "@/lib/svgExport";
import Image from "next/image";
import * as React from "react";

const ServicesPage = () => {
  const listServices = React.useMemo(() => {
    return [Service1, Service2, Service3, Service4, Service5];
  }, []);

  return (
    <section className="mt-10">
      {listServices.map((item, idx) => {
        return (
          <Image
            alt=""
            key={idx}
            src={item}
            className="w-full max-h-[80vh] h-full object-fill"
          />
        );
      })}
    </section>
  );
};

export default ServicesPage;
