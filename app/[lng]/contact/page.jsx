"use client";

import { useEffect } from "react";
import { useSendContactMessageMutation } from "@/redux/services/contactApi";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useTranslation } from "@/services/i18n/client";

import Image from "next/image";
import { InputWithLabel } from "@/components/inputs/input-with-label";
import { TextareaWithLabel } from "@/components/textarea-with-label";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/page-wrapper";
import { useToast } from "@/components/ui/use-toast";
import { Icon } from "@/components/icon";

import { contactUsSchema } from "@/lib/validations";

import ContactImage from "@/public/assets/contact-img.png";
import ScrollToTop from "@/components/auto-scroll-to-top";

export default function Contact({ params: { lng } }) {
  const { t } = useTranslation(lng, "contact-page");
  const { t: tInputs } = useTranslation(lng, "inputs");
  const { t: tToasts } = useTranslation(lng, "toasts");

  const [sendContactMessage, { isLoading, isSuccess }] =
    useSendContactMessageMutation();

  const { toast } = useToast();

  const form = useFormik({
    initialValues: {
      email: "",
      message: "",
    },
    validationSchema: toFormikValidationSchema(contactUsSchema(tInputs)),
    onSubmit: async (values, actions) => {
      try {
        const { email, message } = values;

        actions.setSubmitting(true);

        sendContactMessage({ body: { user_email: email, message } });
      } catch (error) {
        console.error("error", error);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      form.resetForm();

      toast({
        description: tToasts("contact_us_success_message"),
      });
    }
  }, [form, isLoading, isSuccess, tToasts, toast]);

  return (
    <PageWrapper className="grid gap-10 md:mt-12 md:grid-cols-2">
      <ScrollToTop />
      <div className="hidden md:block">
        <Image
          src={ContactImage}
          width={610}
          height={336}
          alt="Two soldiers wielding guns in CS:GO"
          placeholder="blur"
        />
      </div>
      <div className="">
        <h1 className="text-subtitle">{t("title")}</h1>
        <form className="mt-3 flex flex-col items-start gap-3">
          <InputWithLabel
            required
            className="md:w-[360px]"
            label={t("input_label")}
            input={{
              type: "email",
              name: "email",
              placeholder: t("input_placeholder"),
              value: form.values.email,
              onChange: form.handleChange,
              onBlur: form.handleBlur,
              error:
                form?.errors?.email &&
                form?.touched?.email &&
                form?.errors?.email,
            }}
          />
          <TextareaWithLabel
            required
            className="md:w-[360px]"
            label={t("textarea_label")}
            textarea={{
              className: "min-h-[130px]",
              name: "message",
              placeholder: t("textarea_placeholder"),
              value: form.values.message,
              onChange: form.handleChange,
              onBlur: form.handleBlur,
              error:
                form?.errors?.message &&
                form?.touched?.message &&
                form?.errors?.message,
            }}
          />
          <Button type="submit" onClick={form.handleSubmit}>
            {isLoading && (
              <Icon name="SpinnerIcon" iconClassName="animate-spin" />
            )}
            {isLoading
              ? t("send_button_in_process_label")
              : t("send_button_label")}
          </Button>
        </form>
      </div>
    </PageWrapper>
  );
}
