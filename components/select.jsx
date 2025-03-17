"use client";

import { useState } from "react";
import { useTranslation } from "@/services/i18n/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const CustomSelect = ({
  lng,
  items = [],
  placeholder = "",
  value = "",
  onValueChange = () => null,
}) => {
  const { t } = useTranslation(lng);
  const [key, setKey] = useState(0);

  const handleValueChange = (value) => {
    const modifiedValue = value === "clear" ? "" : value;

    onValueChange(modifiedValue);

    if (!modifiedValue.length) {
      setTimeout(() => setKey(Math.random()), 300);
    }
  };

  return (
    <Select key={key} value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[210px] overflow-y-scroll">
        <SelectItem value="clear">
          {t("general.select.reset_the_filter_text")}
        </SelectItem>
        <SelectSeparator />
        {items.map(({ value, label }) => (
          <SelectItem key={value} value={value} className="truncate">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
