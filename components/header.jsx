"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/services/i18n/client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSelectedPageHref,
  setSelectedProfileTab,
} from "@/redux/features/mainSlice";
import { AUTHENTICATION_STATUS } from "@/redux/features/authSlice";
import { setCartDataFromLS } from "@/redux/features/cartSlice";

import Link from "next/link";
// import { LanguageDropdown } from "./dropdowns/lang-dropdown";
import { Icon } from "./icon";
import { Button, buttonVariants } from "./ui/button";
import { BurgerMenuDialog } from "./dialogs/burger-menu-dialog";
import { usePathname, useRouter } from "next/navigation";
import { AvatarLabel } from "./avatar-label";
import { DropdownWithLabel } from "./dropdowns/dropdown-with-label";
import { AnimatePresence, Motion } from "./motion/motion";
import { useToast } from "./ui/use-toast";

import { STEAM_SIGN_IN_URL } from "@/lib/constants/config";
import { useAuth } from "@/lib/hooks/useAuth";
import { Meta } from "next/dist/lib/metadata/generate/meta";
import Image from "next/image";
import Logo from "@/public/assets/logo.png";

// import { CurrenciesDropdown } from "./dropdowns/currencies-dropdown";

export const Header = ({ lng }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useAuth();

  const { t: tMeta } = useTranslation(lng, "home-page");
  const { t } = useTranslation(lng, "header");
  const { t: tProfilePage } = useTranslation(lng, "profile-page");
  const { t: tToasts } = useTranslation(lng, "toasts");

  const { toast } = useToast();

  const cartItems = useAppSelector(({ cart }) => cart.cartItems);
  const { user, authenticationStatus } = useAppSelector(({ auth }) => auth);
  const selectedPageHref = useAppSelector(
    (state) => state.main.selectedPageHref
  );

  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const tabs = tProfilePage("tabs", { returnObjects: true });
  const links = t("links", { returnObjects: true });
  const modifiedLinks = useMemo(
    () =>
      links.map((link) => ({
        ...link,
        active: link.href === selectedPageHref,
      })),
    [links, selectedPageHref]
  );

  const handleTabClick = (itemHref) => {
    dispatch(setSelectedPageHref(itemHref));
  };

  const handleProfileTabClick = (item) => {
    dispatch(setSelectedProfileTab(item.value));
    !pathname.includes("/profile") &&
      router.push(`/${lng}/profile`, { scroll: true });
  };

  const handleBurgerMenuShow = () => {
    setShowBurgerMenu(!showBurgerMenu);

    !showBurgerMenu
      ? document.querySelector("body").classList.add("overflow-hidden")
      : document.querySelector("body").classList.remove("overflow-hidden");
  };

  useEffect(() => {
    pathname && dispatch(setSelectedPageHref(pathname.slice(3) || "/"));

    setTimeout(() => dispatch(setCartDataFromLS()), 100);
  }, [dispatch, pathname]);

  // Detect scroll position for header bg
  useLayoutEffect(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Meta name="author" content="CS:GO Store Team"></Meta>
      <Meta name="og:title" content={tMeta("metadata.title")}></Meta>
      <Meta name="og:description" content={tMeta("metadata.description")}></Meta>
      <Meta name="og:img" content="https://csgostore.co.uk/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fheader-img.ecdd7d3a.webp&w=828&q=75"></Meta>
      <Meta name="og:url" content="https://csgostore.co.uk/"></Meta>
      <Meta name="og:type" content="website"></Meta>
    <AnimatePresence mode="wait">
      <Motion
        as="header"
        configName="HEADER"
        className={cn(
          "sticky top-0 z-20 w-full bg-transparent bg-auto bg-no-repeat md:bg-contain",
          scrolled && "bg-secondary-600",
          !showBurgerMenu && "border-b border-secondary-300",
          showBurgerMenu && "flex h-screen flex-col"
        )}
        style={
          showBurgerMenu
            ? {
                backgroundImage: "url('/assets/header-shadow-bg.webp')",
              }
            : {}
        }
      >
        <div
          className={cn(
            "container flex items-center justify-between px-4 py-4 sm:space-x-0 md:gap-3",
            showBurgerMenu && "border-b border-secondary-300"
          )}
        >
          <div className="flex flex-1 gap-6 md:gap-10">
            <Link
              href={`/${lng}`}
              className="flex items-center space-x-2"
              onClick={showBurgerMenu ? handleBurgerMenuShow : () => null}
              aria-label="Open home page"
            >
              <Image
                  src={Logo}
                  width="0"
                  height="50"
                  alt="A soldier from CS:GO holding a gun"
                  placeholder="blur"
              />
            </Link>
            <nav className="hidden flex-1 justify-center gap-6 lg:flex">
              {modifiedLinks.map((item, index) => (
                <Link
                  key={index}
                  href={`/${lng}${item.href}`}
                  className={cn(
                    "!text-mini relative flex items-center text-center text-primary transition-all duration-300 ease-in-out",
                    "hover:scale-x-105 hover:text-destructive",
                    item.disabled && "pointer-events-none text-secondary-500"
                  )}
                  onClick={() => handleTabClick(item.href)}
                >
                  {item.active && (
                    <Motion
                      as="span"
                      layoutId="underline"
                      className="absolute left-0 top-full block h-[1px] w-full bg-primary"
                    />
                  )}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center justify-end">
            <nav className="flex items-center gap-3 lg:hidden">
              <Button
                onClick={handleBurgerMenuShow}
                className={`${buttonVariants({
                  size: "icon-lg",
                  variant: "icon-secondary",
                })}`}
                aria-label={
                  showBurgerMenu ? "Hide mobile menu" : "Show mobile menu"
                }
              >
                <Icon name={showBurgerMenu ? "ArrowLeftIcon" : "MenuIcon"} />
              </Button>
              <Link
                href={`/${lng}/cart`}
                className={`relative ${buttonVariants({
                  size: "icon-lg",
                  variant: "icon-primary",
                })}`}
                aria-label="Open cart page"
              >
                <Icon name="BasketIcon" />
                {!!cartItems?.length && (
                  <Motion
                    configName="BASKET_ICON_DOT"
                    className="absolute bottom-2 right-2.5 flex h-3 w-3 items-center justify-center rounded-full bg-secondary-200"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </Motion>
                )}
              </Link>
            </nav>
            <nav className="hidden items-center gap-3 lg:flex">
              {authenticationStatus ===
              AUTHENTICATION_STATUS.LOADING ? null : authenticationStatus ===
                AUTHENTICATION_STATUS.AUTHENTICATED ? (
                <DropdownWithLabel
                  classNames={{
                    menuTrigger:
                      "group h-auto py-1 px-2 hover:bg-primary hover:bg-opacity-30 hover:border hover:border-primary hover:border-opacity-30 transition-all duration-300",
                    menuItem: "p-1.5 pl-5 !text-mini",
                    menuContent: "py-2 px-3 w-[236px]",
                  }}
                  items={tabs}
                  onItemClick={(item) => handleProfileTabClick(item)}
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
              {/* <CurrenciesDropdown className="" /> */}
              <Link
                href={cartItems.length === 0 ? "" : `/${lng}/cart`}
                className={`relative ${buttonVariants({
                  size: "icon-lg",
                  variant: "icon-primary",
                })}`}
                onClick={() =>
                  cartItems.length === 0 &&
                  toast({
                    description: tToasts("product_cart_empty_warning_message"),
                  })
                }
                aria-label="Open cart page"
              >
                <Icon name="BasketIcon" />
                {!!cartItems?.length && (
                  <Motion
                    configName="BASKET_ICON_DOT"
                    className="absolute bottom-2 right-2.5 flex h-3 w-3 items-center justify-center rounded-full bg-secondary-200"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </Motion>
                )}
              </Link>
             {/* <LanguageDropdown lng={lng} /> */}
            </nav>
          </div>
        </div>

        <BurgerMenuDialog
          show={showBurgerMenu}
          items={modifiedLinks}
          onClick={handleBurgerMenuShow}
          lng={lng}
          isAuthorised={
            authenticationStatus === AUTHENTICATION_STATUS.AUTHENTICATED
          }
          onUserDDItemClick={(item) => {
            dispatch(setSelectedProfileTab(item.value));
            !pathname.includes("/profile") &&
              router.push(`/${lng}/profile`, { scroll: true });
            showBurgerMenu && handleBurgerMenuShow();
          }}
        />
      </Motion>
    </AnimatePresence>
    </>
  );
};
