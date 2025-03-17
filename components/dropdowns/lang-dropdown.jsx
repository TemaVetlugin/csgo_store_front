"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fallbackLng, languages } from "@/services/i18n/settings";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "../icon";

export const LanguageDropdown = ({ lng = fallbackLng }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex h-11 items-center rounded-md border border-secondary-300 bg-secondary-200 px-3 py-2 uppercase outline-none">
        <span className="text-mini mr-2">{lng}</span>
        <Icon
          name="ChevronDownIcon"
          className="transition-all duration-300 group-data-[state=open]:rotate-180"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[64px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            className="cursor-pointer uppercase"
            onClick={() => {
              router.replace(`/${lang}/${pathname.slice(3)}`);
            }}
          >
            {lang}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
