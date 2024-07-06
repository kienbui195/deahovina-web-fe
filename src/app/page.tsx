"use client";

import React, { useEffect } from "react";
import Home from "./HomePage";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const IndexPage = () => {
  const onScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    onScrollToTop();
  }, []);

  return (
    <section>
      <Button
        size={"icon"}
        onClick={onScrollToTop}
        className="fixed bottom-10 right-10 font-bold rounded-full border z-20 bg-slate-100 hover:bg-slate-200 text-black"
      >
        <ArrowUp className="w-6 h-6" />
      </Button>
      <Home />
    </section>
  );
};

export default IndexPage;
