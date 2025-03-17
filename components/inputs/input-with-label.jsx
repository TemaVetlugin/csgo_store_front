import { cn } from "@/lib/utils";

import { InputWithIcon } from "./input-with-icon";

export const InputWithLabel = ({
  required = false,
  label = "",
  className = "",
  input = {
    type: "text",
    name: "",
    placeholder: "",
    value: "",
    onChange: () => null,
    onBlur: () => null,
    error: "",
    className: "",
  },
  icon = { name: "", className: "" },
}) => {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <div className="text-mini">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </div>
      <InputWithIcon input={input} icon={icon} />
    </div>
  );
};
