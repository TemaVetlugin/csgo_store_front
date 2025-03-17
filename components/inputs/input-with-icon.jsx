import { cn } from "@/lib/utils";

import { Icon } from "../icon";
import { Input } from "../ui/input";

export const InputWithIcon = ({ input, icon }) => {
  return (
    <div className="relative w-full">
      {icon?.name && (
        <Icon
          className={cn(
            "absolute left-3 top-2.5 h-4 w-4 text-gray-500",
            icon?.className
          )}
          name={icon?.name}
        />
      )}
      <Input
        type={input?.type}
        name={input?.name}
        placeholder={input?.placeholder}
        value={input?.value}
        onChange={input?.onChange}
        onBlur={input?.onBlur}
        size={input?.size}
        inputClassName={cn(!!icon?.name && "pl-9", input?.className)}
        error={input?.error}
        errorClassName={input?.errorClassName}
        {...input}
      />
    </div>
  );
};
