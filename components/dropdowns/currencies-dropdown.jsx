"use client";

import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSelectedCurrency } from "@/redux/features/mainSlice";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "../icon";

import { currencies } from "@/lib/constants/currencies";

export const CurrenciesDropdown = ({ className }) => {
  const dispatch = useAppDispatch();

  const selectedCurrency = useAppSelector(({ main }) => main.selectedCurrency);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "group flex h-11 items-center rounded-md border border-secondary-300 bg-secondary-200 px-3 py-2 uppercase outline-none",
          className
        )}
      >
        <span className="text-mini mr-2">{selectedCurrency.code}</span>
        <Icon
          name="ChevronDownIcon"
          className="transition-all duration-300 group-data-[state=open]:rotate-180"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-fit">
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            className={cn(
              "cursor-pointer uppercase",
              currency.code === selectedCurrency.code &&
                "bg-primary/30 text-primary"
            )}
            onClick={() => {
              dispatch(setSelectedCurrency(currency));
            }}
          >
            {currency.code === selectedCurrency.code && (
              <Icon name="CheckIcon" className="mr-1" />
            )}
            <span>{currency.code}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
