import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

export const CheckboxWithLabel = ({
  label = "",
  labelClassName = "",
  className = "",
  onValueChange = () => null,
  checkbox = {
    id: "checkboxId",
    onClick: () => null,
    error: false,
    checked: false,
  },
}) => {
  return (
    <div
      className={cn("flex items-center py-0.5", className)}
      onClick={onValueChange}
    >
      <Checkbox
        {...checkbox}
        data-state={checkbox.checked ? "checked" : "unchecked"}
        aria-checked={checkbox.checked ? "true" : "false"}
        value={checkbox.checked ? "on" : "off"}
      />
      <label
        htmlFor={checkbox.id}
        className={cn(
          "text-tiny px-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          labelClassName
        )}
      >
        {label}
      </label>
    </div>
  );
};
