"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { useTranslation } from "@/services/i18n/client";

import { CheckboxWithLabel } from "@/components/checkbox-with-label";
import { Icon } from "@/components/icon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { InputWithIcon } from "@/components/inputs/input-with-icon";
// import { CustomSelect } from "./select";
import { MultiSelect } from "./multiple-select";

import {
  EXTERIORS,
  QUALITIES,
  RARITIES,
  STICKERS,
  TYPES,
  WEAPONS,
} from "@/lib/constants/data";
import { debounce } from "@/lib/utils/debounce";
import { useSearchParamsHook } from "@/lib/hooks/useSearchParamsHook";


const CollapsibleFilter = ({
  options = [],
  selected = [],
  title = "",
  className = "",
  children,
  onValueChange = () => null,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={cn("mx-2 border-b border-[#373742]", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="p-2">
        <div className="flex items-center justify-between px-1 py-2">
          <h4 className="text-mini-semibold">{title}</h4>
          <CollapsibleTrigger
            asChild
            className="[&[data-state=open]>div>svg]:rotate-180"
          >
            <button aria-label="Collapsible arrow button">
              <Icon name="ChevronDownIcon" className="text-destructive" />
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="px-1 py-2">
          {children
            ? children
            : options.map((option, index) => (
                <CheckboxWithLabel
                  key={`${option}_${index}`}
                  label={option}
                  checkbox={{ id: option, checked: selected.includes(option) }}
                  labelClassName="truncate"
                  onValueChange={() =>
                    onValueChange(
                      selected.includes(option)
                        ? selected.filter((item) => item !== option)
                        : [...selected, option]
                    )
                  }
                />
              ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

const CollapsibleFilterChildren = ({
  children,
  title = "",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={cn("mx-2 border-b border-[#373742]", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="p-2">
        <div className="flex items-center justify-between px-1 py-2">
          <h4 className="text-mini-semibold">{title}</h4>
          <CollapsibleTrigger
            asChild
            className="[&[data-state=open]>div>svg]:rotate-180"
          >
            <button aria-label="Collapsible arrow button">
              <Icon name="ChevronDownIcon" className="text-destructive" />
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="px-1 py-2">
          {children}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export const Filters = ({ lng, className = "" }) => {
  const { t: tInputs } = useTranslation(lng, "inputs");
  const { t } = useTranslation(lng, "filters");

  const { searchParams, setSearchParam, setSearchParamsFromArray } =
    useSearchParamsHook();

  const selectedCurrency = useAppSelector(({ main }) => main.selectedCurrency);

  // const handleSetSearchParamsSelect = (name = "", value = "") => {
  //   console.log(name, value);
  //   const newSearchParams = new URLSearchParams(searchParams.toString());

  //   if (value.length) {
  //     newSearchParams.set(name, value);
  //   } else {
  //     newSearchParams.delete(name);
  //   }

  //   router.replace(`${pathname}?${newSearchParams.toString()}`);
  // };

  return (
    <aside className={cn("rounded-xl bg-secondary-200 shadow-md", className)}>
      <div className="border-b border-[#373742] px-2 py-2">
        <InputWithIcon
          input={{
            placeholder: searchParams.get("name")?.length
              ? searchParams.get("name")
              : tInputs("search_placeholder"),
            className: "border-0",
            onChange: debounce(
              ({ target }) => setSearchParam("name", target.value, false),
              1000
            ),
          }}
          icon={{ name: "SearchIcon", className: "top-3" }}
        />
      </div>

      <CollapsibleFilterChildren title={t("price.title")}>
        <Slider
          className="py-4"
          defaultValue={[
            searchParams.get("price_min") || 0,
            searchParams.get("price_max") || 15000,
          ]}
          currencySymbol={selectedCurrency.symbol}
          min={0} 
          max={15000} 
          step={1} 
          minStepsBetweenThumbs={1}
          onValueChange={debounce(
            (values) =>
              setSearchParamsFromArray(["price_min", "price_max"], values),
            100
          )}
        />
      </CollapsibleFilterChildren>
      

      {/* <CollapsibleFilter options={types} title={t("type.title")} /> */}

      <div className="mx-2 border-b border-[#373742]">
        <div className="flex flex-col justify-between py-4">
          <h4 className="text-mini-semibold mb-3 px-3">{t("type.title")}</h4>
          {/* <CustomSelect
            lng={lng}
            items={TYPES}
            placeholder={t("type.placeholder")}
            value={searchParams.get("types") || ""}
            onValueChange={(type) => handleSetSearchParamsSelect("types", type)}
          /> */}
          <MultiSelect
            options={TYPES}
            placeholder={t("type.placeholder")}
            selected={searchParams.get("types")?.split(",") || []}
            onValueChange={(type) => setSearchParam("types", type)}
          />
        </div>
      </div>

      {/* <CollapsibleFilter options={weapons} title={t("weapons.title")} /> */}

      <div className="mx-2 border-b border-[#373742]">
        <div className="flex flex-col justify-between py-4">
          <h4 className="text-mini-semibold mb-3 px-3">{t("weapons.title")}</h4>
          {/* <CustomSelect
            lng={lng}
            items={WEAPONS}
            placeholder={t("weapons.placeholder")}
            value={searchParams.get("weapons") || ""}
            onValueChange={(weapon) => handleSetSearchParamsSelect("weapons", weapon)}
          /> */}
          <MultiSelect
            options={WEAPONS}
            placeholder={t("weapons.placeholder")}
            selected={searchParams.get("weapons")?.split(",") || []}
            onValueChange={(weapon) => setSearchParam("weapons", weapon)}
          />
        </div>
      </div>

      <CollapsibleFilter
        title={t("exterior.title")}
        options={EXTERIORS}
        selected={searchParams.get("exteriors")?.split(",") || []}
        onValueChange={(exteriors) => setSearchParam("exteriors", exteriors)}
      />
      <CollapsibleFilter
        title={t("qualities.title")}
        options={QUALITIES}
        selected={searchParams.get("qualities")?.split(",") || []}
        onValueChange={(qualities) => setSearchParam("qualities", qualities)}
      />

      <CollapsibleFilterChildren title={t("rarity.title")}>
        <div className="space-y-2">
          {RARITIES.map((rarity) => (
            <Badge
              key={rarity}
              hasActive
              active={searchParams.get("rarities")?.includes(rarity)}
              className="mr-2 capitalize"
              variant={rarity.toLowerCase()}
              onClick={() => {
                const searchParamRaritiesData =
                  searchParams.get("rarities")?.split(",") || [];

                // const valueSelect = searchParams.get("rarities") === rarity ? "" : rarity;
                const value = searchParamRaritiesData.includes(rarity)
                  ? searchParamRaritiesData.filter((item) => item !== rarity)
                  : [...searchParamRaritiesData, rarity];

                setSearchParam("rarities", value);
              }}
            >
              {rarity}
            </Badge>
          ))}
        </div>
      </CollapsibleFilterChildren>

      {/* <CollapsibleFilter
        items={STICKERS}
        title={t("stickers_on_the_skin.title")}
        className="border-0"
      /> */}

      <div className="mx-2">
        <div className="flex flex-col justify-between py-4">
          <h4 className="text-mini-semibold mb-3 px-3">
            {t("stickers_on_the_skin.title")}
          </h4>
          {/* <CustomSelect
            lng={lng}
            items={STICKERS}
            placeholder={t("stickers_on_the_skin.placeholder")}
            value={searchParams.get("stickers") || ""}
            onValueChange={(sticker) =>
              handleSetSearchParamsSelect("stickers", sticker)
            }
          /> */}
          <MultiSelect
            options={STICKERS}
            placeholder={t("stickers_on_the_skin.placeholder")}
            selected={searchParams.get("stickers")?.split(",") || []}
            onValueChange={(sticker) => setSearchParam("stickers", sticker)}
          />
        </div>
      </div>
    </aside>
  );
};
