"use client";

import * as React from "react";

const WaitingPage = ({ slogan }: { slogan?: string }) => {
  return (
    <section className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-white text-black font-semibold text-xl">
      <span>{slogan ? slogan : "Loading"}</span>
      <span className="animate-ping translate-x-2">...</span>
    </section>
  );
};

export default WaitingPage
