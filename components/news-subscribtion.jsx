"use client";

import { useTranslation } from "@/services/i18n/client";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "./inputs/input-with-icon";
import { useToast } from "./ui/use-toast";

import { cn } from "@/lib/utils";
import { emailSchema } from "@/lib/validations/email";

import NewsSubscriptionImage from "@/public/assets/news-subscribtion-bg.webp";
import { useState } from "react";
import { Icon } from "./icon";

export const NewsSubscribtion = ({ lng, className = "" }) => {
  const { t } = useTranslation(lng, "home-page");
  const { t: tInputs } = useTranslation(lng, "inputs");
  const { t: tToasts } = useTranslation(lng, "toasts");

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const form = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: toFormikValidationSchema(emailSchema(tInputs)),
    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        setIsLoading(true);

        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
            setIsLoading(false);
          }, 2000)
        );

        toast({
          description: tToasts("news_subscription_success_message"),
        });

        form.resetForm();
      } catch (error) {
        console.error("error", error);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <div
      className={cn(
        "relative z-auto rounded-lg bg-[#ba0b0b] px-5 py-9 md:px-16 md:py-20",
        className
      )}
    >
      <Image
        fill
        src={NewsSubscriptionImage}
        sizes="100vw"
        alt="A background image with a spiral pattern for the news subscription section"
        className="z-auto h-auto w-full rounded-lg bg-[lightgray] object-cover object-bottom mix-blend-plus-lighter"
        placeholder="blur"
      />
      <div className="w-auto md:w-[515px]">
        <h2 className="text-subtitle text-center md:text-left">
          {t("subscription.text")}
        </h2>
        <div className="mt-5 flex flex-col items-center gap-3 md:flex-row md:items-start">
          <InputWithIcon
            input={{
              name: "email",
              type: "email",
              placeholder: t("subscription.input_placeholder"),
              size: "sm",
              value: form.values.email,
              onChange: form.handleChange,
              onBlur: form.handleBlur,
              error:
                form?.errors?.email &&
                form?.touched?.email &&
                form?.errors?.email,
              errorClassName: "text-white",
              className:
                "flex-1 bg-white bg-opacity-20 text-white placeholder:text-white border-white",
            }}
            icon={{
              name: "MailIcon",
              className: "h-5 w-5",
            }}
          />
          <Button variant="outline" size="sm" onClick={form.handleSubmit}>
            {isLoading && <Icon name="SpinnerIcon" />}
            {isLoading
              ? t("subscription.subscribe_button_in_process_label")
              : t("subscription.subscribe_button_label")}
          </Button>
        </div>
      </div>
    </div>
  );
};
