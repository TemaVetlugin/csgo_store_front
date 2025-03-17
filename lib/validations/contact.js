const { z } = require("zod");

export const contactUsSchema = (t = () => null) =>
  z.object({
    email: z
      .string({
        required_error: t("email_is_required"),
      })
      .email(t("email_format_is_invalid")),
    message: z.string({
      required_error: t("message_is_required"),
    }),
  });
