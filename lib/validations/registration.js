const { z } = require("zod");

export const registrationSchema = (t = () => null) =>
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
    confirm: z.string().transform((value, ctx) => {
      const parsed = value === "checked";

      if (!parsed) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Not confirmed",
        });

        return z.NEVER;
      }
      return parsed;
    }),
  });
