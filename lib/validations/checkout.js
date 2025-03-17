const { z } = require("zod");

export const checkoutSchema = (t = () => null) =>
  z.object({
    card_number: z
      .string({
        required_error: t("card_number_is_required"),
      })
      .min(19, t("card_number_is_invalid"))
      .max(19),
    date: z
      .string({
        required_error: t("date_is_required"),
      })
      .min(5, t("date_is_invalid"))
      .max(5),
    cvc: z
      .string({
        required_error: t("cvc_is_required"),
      })
      .min(3, t("cvc_is_invalid"))
      .max(3),
  });
