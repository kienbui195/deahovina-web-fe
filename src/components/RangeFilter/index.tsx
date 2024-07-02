import useGetLabel from "@/hooks/useGetLabel";
import { cn } from "@/lib/utils";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const RangeFilter = ({
  min = 0,
  max = 100,
  onInputChange,
}: {
  min: number;
  max: number;
  onInputChange?: ({ min, max }: { min: number; max: number }) => void;
}) => {
  const { getLabel } = useGetLabel();
  const formSchema = React.useMemo(
    () =>
      z.object({
        min: z.number().min(min, {
          message: `Excepted min ${min}`,
        }),
        max: z.number().max(max, {
          message: `Excepted max ${max}`,
        }),
      }),
    []
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      min,
      max,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { min, max } = values;
    onInputChange && onInputChange({ min, max });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="space-x-4">
        <Form {...form}>
          <form
            className="space-y-4 flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-row items-center space-x-4">
              <div className="font-bold uppercase">
                {getLabel("filters.byPrice.label")}
              </div>
              <Button className="font-bold" type="submit">
                {getLabel("filters.byPrice.button")}
              </Button>
            </div>
            <div className="flex flex-row space-x-4">
              <FormField
                control={form.control}
                name="min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getLabel("filters.byPrice.min")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={min + ""}
                        onChange={(e) => field.onChange(+e.target.value)}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getLabel("filters.byPrice.max")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={max + ""}
                        onChange={(e) => field.onChange(+e.target.value)}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RangeFilter;
