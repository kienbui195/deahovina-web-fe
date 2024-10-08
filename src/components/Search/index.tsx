"use client";

import * as React from "react";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import useGetLabel from "@/hooks/useGetLabel";
import NotFound from "@/app/NotFound";

const formSchema = z.object({
  keyword: z.string(),
});

const Search = ({ className }: { className?: string }) => {
  const queryParams = useSearchParams();
  const keyword = queryParams.get("_q");
  const router = useRouter();
  const { getLabel } = useGetLabel();
  const isClient = React.useMemo(() => {
    return typeof window === "object";
  }, []);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: keyword || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.keyword.trim() === "") return router.push("/");

    router.push(`?_q=${values.keyword}`);
  };

  React.useEffect(() => {
    if (!keyword) return;

    form.setValue("keyword", keyword);
  }, [keyword]);

  return (
    <div className={cn(["", className])}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder={getLabel("input.search.placeholder")}
                      {...field}
                      className={cn(["h-[45px] w-full flex-1"])}
                      ref={inputRef}
                    />
                    <Button type="submit" className="p-2 h-[45px] w-[45px] bg-blue-700 hover:bg-blue-600">
                      <SearchIcon className="w-6 h-6" />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

const SearchBar = ({className}:{className?: string;}) => {
  return (
    <React.Suspense fallback={<React.Fragment />}>
      <Search className={className}/>
    </React.Suspense>
  );
};

export default SearchBar;
