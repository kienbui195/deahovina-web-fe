"use client";

import RangeFilter from "@/components/RangeFilter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetLabel from "@/hooks/useGetLabel";
import { Slash } from "lucide-react";
import React from "react";

const CategoryDetail = ({ slug }: { slug: string }) => {
  const { getLabel } = useGetLabel();

  return (
    <section className="flex flex-col space-y-6 min-h-screen sm:dhv-container dhv-container-sm">
      <div className="flex flex-row justify-between items-center">
        <div className="text-3xl font-bold uppercase">{slug}</div>
        <Select>
          <SelectTrigger className="w-[300px]">
            <SelectValue
              placeholder={getLabel("select.filters.sort.placeholder")}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">
              {getLabel("select.filters.sort.newest")}
            </SelectItem>
            <SelectItem value="priceAsc">
              {getLabel("select.filters.sort.byPriceAsc")}
            </SelectItem>
            <SelectItem value="priceDesc">
              {getLabel("select.filters.sort.byPriceDesc")}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="font-bold uppercase">
              {getLabel("breadcrumb.home.label")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <span className="font-bold text-black uppercase">{slug}</span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <RangeFilter
        min={0}
        max={1000}
        onInputChange={(val) => {
          console.log(val);
        }}
      />
    </section>
  );
};

export default CategoryDetail;
