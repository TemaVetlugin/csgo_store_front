"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "../icon";

export const DropdownWithLabel = ({
  label = "",
  items = [],
  selectedItem = null,
  onItemClick = () => null,
  classNames = {
    menuTrigger: "",
    menuItem: "",
    menuContent: "",
  },
  children,
}) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleItemClick = (item, index) => {
    setSelectedItemIndex(index);
    onItemClick(item);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "group flex h-9 items-center rounded-md border border-secondary-300 bg-secondary-200 px-3 py-2 outline-none",
          classNames.menuTrigger
        )}
      >
        {children ? children : <span className="text-mini mr-2">{label}</span>}
        <Icon
          name="ChevronDownIcon"
          className="transition-all duration-300 group-data-[state=open]:rotate-180"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={classNames.menuContent}>
        {items.map((item, index) => (
          <DropdownMenuItem
            key={item.text}
            className={cn(
              "cursor-pointer",
              selectedItem &&
                index === selectedItemIndex &&
                "bg-primary/30 text-primary",
              classNames.menuItem
            )}
            onClick={() => handleItemClick(item, index)}
          >
            {selectedItem?.text === item.text.toLowerCase() &&
              index === selectedItemIndex && (
                <Icon name="CheckIcon" className="mr-1" />
              )}
            <span>{item.text}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
