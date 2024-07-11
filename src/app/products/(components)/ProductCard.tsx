"use client";

import { Card } from "@/components/ui/card";
import { getImageURL } from "@/lib/function";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const ProductCard = ({
  title,
  thumbnail,
  slug,
}: {
  title: string;
  thumbnail?: string;
  slug: string;
}) => {
  return (
    <Card className="flex flex-col w-full gap-4 bg-white p-2 border-none shadow-none">
      <Image
        alt=""
        src={getImageURL(thumbnail)}
        width={0}
        height={0}
        sizes="100vw"
        className="object-contain w-full h-auto transform transition-all duration-200 hover:scale-90 active:scale-90"
      />
      <Link
        href={`/products/${slug}`}
        className="text-xl w-full text-center hover:underline hover:transform hover:text-orange-400 hover:duration-500"
      >
        {title}
      </Link>
    </Card>
  );
};

export default ProductCard;
