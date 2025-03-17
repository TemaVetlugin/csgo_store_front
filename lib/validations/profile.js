const { z } = require("zod");

export const profileSchema = (t = () => null) =>
  z.object({
    tradeLink: z.union(
      [
        z.literal(""),
        z
          .string()
          .trim()
          .url({ message: t("trade_link_is_invalid") }),
      ],
      {
        errorMap: () => ({ message: t("trade_link_is_required") }),
      }
    ),
    email: z
      .string({
        required_error: t("email_is_required"),
      })
      .email(t("email_format_is_invalid")),
  });
