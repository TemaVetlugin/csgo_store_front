import { cn } from "@/lib/utils";
import { Icon } from "./icon";

export const ProductWear = ({ className = "", wear = 0.1 }) => {
  return (
    <div className={cn("relative h-2 w-full", className)}>
      <div className="mb-4 flex h-full overflow-hidden rounded bg-primary/30 text-xs">
        <div
          style={{ width: "7%" }}
          className="flex flex-col justify-center whitespace-nowrap bg-sky text-center text-white shadow-none"
        />
        <div
          style={{ width: "8%" }}
          className="flex flex-col justify-center whitespace-nowrap bg-green text-center text-white shadow-none"
        />
        <div
          style={{ width: "23%" }}
          className="flex flex-col justify-center whitespace-nowrap bg-orange text-center text-white shadow-none"
        />
        <div
          style={{ width: "7%" }}
          className="flex flex-col justify-center whitespace-nowrap bg-primary text-center text-white shadow-none"
        />
      </div>
      <Icon
        className={cn(`absolute top-3`)}
        style={{ left: `calc(${wear * 100}% - 5px)` }}
        name="ToddlerIcon"
      />
    </div>
  );
};
