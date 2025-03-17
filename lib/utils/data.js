import { PAYMENT_METHODS_ICONS } from "../constants/data";

export const getPaymentMethodsData = (paymentMethods = []) => {
  return paymentMethods.map((pm, index) => ({
    ...pm,
    selected: index === 0,
    iconName: PAYMENT_METHODS_ICONS[index],
  }));
};
