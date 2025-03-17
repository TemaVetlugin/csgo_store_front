import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";

export const TextareaWithLabel = ({
  label = "",
  required = false,
  className = "",
  textarea = {
    name: "",
    placeholder: "",
    className: "",
    value: "",
    rows: 5,
    onChange: () => null,
    onBlur: () => null,
    error: "",
  },
}) => {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <label className="text-mini">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      <Textarea
        name={textarea?.name}
        placeholder={textarea?.placeholder}
        value={textarea?.value}
        rows={textarea?.rows}
        onChange={textarea?.onChange}
        onBlur={textarea?.onBlur}
        className={cn("resize-none", textarea?.className)}
        error={textarea?.error}
      />
    </div>
  );
};
