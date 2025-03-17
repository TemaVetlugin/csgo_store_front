import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSearchParamsHook = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getSearchParam = (name) => searchParams.get(name);

  const setSearchParam = (
    name = "",
    value = "",
    isArray = true,
    resetPage = true
  ) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (isArray) {
      const currentParam = searchParams.get(name);

      if (value.length) {
        if (currentParam) {
          newSearchParams.set(name, value.join(","));
        } else {
          newSearchParams.set(name, value);
        }
      } else {
        newSearchParams.delete(name);
      }
    } else {
      if (value.length) {
        newSearchParams.set(name, value);
      } else {
        newSearchParams.delete(name);
      }
    }

    // resetPage && newSearchParams.set("page", "1");

    router.push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  const setSearchParamsFromArray = (
    names = [],
    values = [],
    resetPage = true
  ) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (values.length) {
      names.forEach((name, index) => newSearchParams.set(name, values[index]));
    } else {
      names.forEach((name) => newSearchParams.delete(name));
    }

    // resetPage && newSearchParams.set("page", "1");

    router.push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  return {
    router,
    pathname,
    searchParams,
    getSearchParam,
    setSearchParam,
    setSearchParamsFromArray,
  };
};
