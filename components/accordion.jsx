import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export const CustomAccordion = ({ items = [], className = "" }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn("flex w-full flex-col gap-4", className)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.question}
          className="rounded-xl border-b-0 bg-secondary-200 data-[state=open]:border data-[state=open]:border-[#E24E4E]"
          value={item.question}
        >
          <AccordionTrigger className="text-paragraph p-4 text-left hover:no-underline [&[data-state=open]>svg]:text-[#E24E4E]">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-mini p-4 pt-0">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
