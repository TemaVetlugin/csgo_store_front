import { useState } from "react";
import { cn } from "@/lib/utils";

import { Check, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export const MultiSelect = ({
  options,
  placeholder = "",
  selected = [],
  onValueChange,
  className,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const handleUnselect = (item) => {
    onValueChange(selected.filter((i) => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="text-tiny h-full w-full justify-between pl-3 pr-2"
          onClick={() => setOpen(!open)}
          aria-label="Collapsible arrow button"
        >
          <div className="text-tiny flex w-[calc(100%-26px)] flex-wrap gap-1">
            {selected?.length
              ? selected?.map((item, index) => (
                  <Badge
                    variant="secondary"
                    key={`${item}_${index}`}
                    className="max-w-full"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      handleUnselect(item);
                    }}
                  >
                    <span className="truncate">{item}</span>
                    <div
                      role="button"
                      className="ml-2 rounded-sm outline-none ring-offset-background focus:ring-1 focus:ring-secondary-300 focus:ring-offset-2"
                      onClick={() => handleUnselect(item)}
                    >
                      <X className="text-muted-foreground h-3 w-3 hover:text-foreground" />
                    </div>
                  </Badge>
                ))
              : placeholder}
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-destructive transition-all duration-300",
              open && "rotate-180"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className={className}>
          <CommandInput
            placeholder="Search ..."
            className="placeholder:text-[#71717A]"
          />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map((option, index) => (
              <CommandItem
                key={`${option.value}_${index}`}
                className={cn(
                  "text-xs font-normal",
                  selected.includes(option.value) &&
                    "bg-accent text-accent-foreground"
                )}
                onSelect={() => {
                  onValueChange(
                    selected.includes(option.value)
                      ? selected.filter((item) => item !== option.value)
                      : [...selected, option.value]
                  );
                  setOpen(true);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-3 w-3 text-destructive",
                    selected.includes(option.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
