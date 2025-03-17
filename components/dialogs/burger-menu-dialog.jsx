"use client";

import { useTranslation } from "@/services/i18n/client";
import { useAppSelector } from "@/redux/hooks";

import Link from "next/link";
import { CurrenciesDropdown } from "../dropdowns/currencies-dropdown";
//import { LanguageDropdown } from "../dropdowns/lang-dropdown";
import { buttonVariants } from "../ui/button";
import { Icon } from "../icon";
import { AnimatePresence, Motion } from "../motion/motion";
import { DropdownWithLabel } from "../dropdowns/dropdown-with-label";
import { AvatarLabel } from "../avatar-label";

import { cn } from "@/lib/utils";
import { STEAM_SIGN_IN_URL } from "@/lib/constants/config";

export const BurgerMenuDialog = ({
  show = false,
  items,
  lng,
  onClick = () => null,
  className = "",
  isAuthorised = false,
  onUserDDItemClick = () => null,
}) => {
  const { t } = useTranslation(lng, "header");
  const { t: tProfilePage } = useTranslation(lng, "profile-page");

  const user = useAppSelector(({ auth }) => auth.user);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <Motion
          configName="BURGER_MENU_DIALOG"
          className={cn(
            "relative z-50 h-screen w-full overflow-auto",
            className
          )}
        >
          <div className="px-3 py-10">
            <Motion
              as="nav"
              className="mt-20 flex flex-col"
              configName="BURGER_MENU_DIALOG_NAV"
            >
              {items?.map(
                (item, index) =>
                  item.href && (
                    <Motion
                      key={index}
                      configName="BURGER_MENU_DIALOG_NAV_ITEM"
                    >
                      <Link
                        href={`/${lng}${item.href}`}
                        scroll={true}
                        onClick={onClick}
                        className={cn(
                          "flex items-center justify-center text-primary transition-all duration-300 ease-in-out",
                          "hover:text-destructive",
                          "focus:underline focus:decoration-primary focus:underline-offset-4",
                          "text-subtitle",
                          item.active &&
                            "underline decoration-primary underline-offset-8",
                          item.disabled &&
                            "pointer-events-none text-secondary-500"
                        )}
                      >
                        {item.name}
                      </Link>
                    </Motion>
                  )
              )}
            </Motion>

            <div className="mt-28 flex justify-center gap-2">
              {isAuthorised ? (
                <DropdownWithLabel
                  classNames={{
                    menuTrigger:
                      "group h-auto !py-0 px-2 hover:bg-primary hover:bg-opacity-30 hover:border hover:border-primary hover:border-opacity-30 transition-all duration-300",
                    menuItem: "p-1 pl-5 !text-mini",
                    menuContent: "py-2 px-3 w-[236px]",
                  }}
                  items={tProfilePage("tabs", { returnObjects: true })}
                  onItemClick={(item) => onUserDDItemClick(item)}
                >
                  <AvatarLabel
                    className="mr-2 cursor-pointer"
                    user={{ ...user, className: "group-hover:text-[#E24E4E]" }}
                    avatar={user?.avatar}
                  />
                </DropdownWithLabel>
              ) : (
                <Link
                  href={STEAM_SIGN_IN_URL}
                  className={buttonVariants({ size: "lg" })}
                >
                  <Icon name="SteamIcon" className="mr-2" />
                  {t("login_using_steam_button_label")}
                </Link>
              )}
              <div className="flex gap-2">
                {/* <CurrenciesDropdown /> */}
                 {/* <LanguageDropdown lng={lng} /> */}
              </div>
            </div>
          </div>
        </Motion>
      )}
    </AnimatePresence>
  );
};
