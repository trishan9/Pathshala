import { FieldError } from "react-hook-form";
import { Input } from "./ui/input";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  form?: any
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
  form
}: InputFieldProps) => {
  function handleTimeChange(type: "hour" | "minute", value: string) {
    const currentDate = form.getValues(name) || new Date();
    let newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    }

    form.setValue(name, newDate);
  }

  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-xs text-gray-500">{label}</label>

      {(type === "date" || type === "datetime-local") && (
        <FormField
          control={form.control}
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="sm:flex">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />

                    {type === "datetime-local" && (
                      <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                        <ScrollArea className="w-64 sm:w-auto">
                          <div className="flex sm:flex-col p-2">
                            {Array.from({ length: 16 }, (_, i) => i + 1)
                              .slice(6)
                              .map((hour) => (
                                <Button
                                  key={hour}
                                  size="icon"
                                  variant={
                                    field?.value
                                      ? new Date(field.value).getHours() === hour
                                        ? "default"
                                        : "ghost"
                                      : defaultValue && new Date(defaultValue).getHours() === hour
                                        ? "default"
                                        : "ghost"
                                  }
                                  className="sm:w-full shrink-0 aspect-square"
                                  onClick={() =>
                                    handleTimeChange("hour", hour.toString())
                                  }
                                >
                                  {hour}
                                </Button>
                              ))}
                          </div>
                          <ScrollBar
                            orientation="horizontal"
                            className="sm:hidden"
                          />
                        </ScrollArea>
                        <ScrollArea className="w-64 sm:w-auto">
                          <div className="flex sm:flex-col p-2">
                            {Array.from({ length: 12 }, (_, i) => i * 5).map(
                              (minute) => (
                                <Button
                                  key={minute}
                                  size="icon"
                                  variant={
                                    field?.value
                                      ? new Date(field.value).getMinutes() === minute
                                        ? "default"
                                        : "ghost"
                                      : defaultValue && new Date(defaultValue).getMinutes() === minute
                                        ? "default"
                                        : "ghost"
                                  }
                                  className="sm:w-full shrink-0 aspect-square"
                                  onClick={() =>
                                    handleTimeChange("minute", minute.toString())
                                  }
                                >
                                  {minute.toString().padStart(2, "0")}
                                </Button>
                              )
                            )}
                          </div>
                          <ScrollBar
                            orientation="horizontal"
                            className="sm:hidden"
                          />
                        </ScrollArea>
                      </div>
                    )}

                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {(type != "date" && type !== "datetime-local") && (
        <Input
          type={type}
          {...register(name)}
          {...inputProps}
          className="focus:border focus:border-gray-400 h-9"
          defaultValue={defaultValue}
        />
      )}


      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
