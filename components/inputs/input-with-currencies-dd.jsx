import { cn } from "@/lib/utils";

import { Icon } from "../icon";
import { Input } from "../ui/input";
import { CurrenciesDropdown } from "../dropdowns/currencies-dropdown";

export const InputWithCurrenciesDropDown = ({
  required = false,
  label = "",
  className = "",
  input = { type: "text", className: "", placeholder: "", error: "" },
  icon = { name: "", text: "", className: "" },
}) => {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <label className="text-mini">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      <div className="relative w-full">
        {icon?.name && (
          <Icon
            className={cn(
              "absolute left-3 top-0 my-auto h-4 w-4 text-gray-500",
              icon?.className
            )}
            name={iconName}
          />
        )}
        {icon?.text && (
          <span className="absolute left-3 top-2 w-2 text-gray-500">
            {icon?.text}
          </span>
        )}
        <Input
          type={input?.type}
          placeholder={input?.placeholder}
          inputClassName={cn(
            (!!icon?.name || !!icon?.text) && "pl-9",
            input?.className
          )}
          error={input?.error}
        />
        <div className="absolute inset-y-0 right-0 flex h-10 items-center">
          <CurrenciesDropdown className="mr-1 h-[95%] border-0" />
        </div>
      </div>
    </div>
  );
};
