import {emailSchema} from "@/lib/validations/email";

const { z } = require("zod");

export const billingDetailsSchema = (t = () => null) =>
    z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(19, "First name must be at most 19 characters"),
    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(19, "Last name must be at most 19 characters"),
    country: z
        .string()
        .min(2, "Country must be at least 2 characters")
        .max(36, "Country must be at most 19 characters"),
    // countryIso: z
    //     .string()
    //     .min(2, "Country must be at least 2 characters")
    //     .max(36, "Country must be at most 19 characters"),
    city: z
        .string()
        .optional(),
    address: z
        .string()
        .min(5, "Street address must be at least 5 characters")
        .max(256, "Street address must be at most 256 characters"),
    phone: z
        .string()
        .optional()
        .refine((value) => !value || /^\+\d{5,32}$/.test(value), {
            message: "Invalid phone number format",
        }),
    notes: z.string().max(256, "Order notes must be at most 256 characters").optional(),
});
