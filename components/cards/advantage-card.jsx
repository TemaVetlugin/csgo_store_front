import { forwardRef } from "react";

import Image from "next/image";
import { Card, CardDescription, CardTitle } from "../ui/card";

import { cn } from "@/lib/utils";

import PanelOpenTopIcon from "@/public/assets/gr_list.png";

export const AdvantageCard = forwardRef(
  ({ name = "", description = "", className = "" }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "relative flex flex-col rounded-xl bg-[#222227] px-6 shadow-sm",
          className
        )}
      >
        <Image
          src={PanelOpenTopIcon}
          alt="The arrow in the image points to an advantage within the red circle"
          width={0}
          height={0}
          className="m-auto h-auto w-[90px] pt-5"
        />
        <CardTitle className="!text-paragraph mt-4 max-h-[72px] min-h-[72px] flex-1 text-center">
          {name}
        </CardTitle>
        <CardDescription className="!text-tiny mb-4 mt-1.5 flex-1 text-center">
          {description}
        </CardDescription>
      </Card>
    );
  }
);

AdvantageCard.displayName = "AdvantageCard";
