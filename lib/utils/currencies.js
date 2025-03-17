import { currencies } from "../constants/currencies";

export const getCurrencyByCode = (code = "") =>
  currencies.find((c) => c.code === code);

export const getCurrencySymbolByCode = (code = "") =>
  currencies.find((c) => c.code === code)?.symbol;
