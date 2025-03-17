const { z } = require("zod");

export const emailSchema = (t = () => null) =>
  z.object({
    email: z
      .string({
        required_error: t("email_is_required"),
      })
      .email(t("email_format_is_invalid")),
  });
