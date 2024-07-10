"use client";

import * as React from "react";
import Link from "next/link";
import useGetLabel from "@/hooks/useGetLabel";

const NotFound = () => {
  const { getLabel } = useGetLabel();

  return (
    <div className="nc-Page404">
      <div className="container relative py-16 lg:py-20">
        {/* HEADER */}
        <header className="text-center max-w-2xl mx-auto space-y-7 flex flex-col items-stretch">
          <h2 className="text-7xl lg:text-8xl">🪔</h2>
          <h1 className="text-8xl lg:text-9xl font-semibold tracking-widest">
            404
          </h1>
          <span className="block text-sm text-neutral-800 lg:text-base tracking-wider uppercase font-medium">
            {getLabel("404.label")}
          </span>
          <div className="flex justify-center">
            <Link
              href="/"
              className="flex mt-4 h-[50px] items-center justify-center rounded-md bg-[--brand-primary] px-6 hover:bg-[--brand-primary-hover] active:bg-[--brand-primary-pressed]"
              tabIndex={-1}
            >
              <span className="text-lg font-semibold text-white">
                Return Home Page
              </span>
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
};

export default NotFound;
