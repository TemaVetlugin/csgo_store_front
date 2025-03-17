"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/services/i18n/client";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  AUTHENTICATION_STATUS,
  resetAuthenticatedUser,
} from "@/redux/features/authSlice";
import {
  useLazyLogoutAuthenticatedUserQuery,
  useUpdateAuthenticatedUserMutation,
} from "@/redux/services/userApi";

import Link from "next/link";
import { CustomTooltip } from "../custom-tooltip";
import { Icon } from "../icon";
import { InputWithLabel } from "../inputs/input-with-label";
import { Motion } from "../motion/motion";
import { Button, buttonVariants } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import { CheckboxWithLabel } from "../checkbox-with-label";

import { cn } from "@/lib/utils";
import { registrationSchema } from "@/lib/validations";
import { LOGOUT_URL } from "@/lib/constants/config";

const STEMA_LINK_IS_INVALID = "Steam trade link has invalid format.";
const EMAIL_IS_USED = "The email has already been taken.";

export const RegistrationDialog = ({ lng }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const { t } = useTranslation(lng, "registration-dialog");
  const { t: tInputs } = useTranslation(lng, "inputs");
  const { t: tToasts } = useTranslation(lng, "toasts");

  const { user, authenticationStatus } = useAppSelector(({ auth }) => auth);

  const [updateAuthenticatedUser, { isLoading, isSuccess, error }] =
    useUpdateAuthenticatedUserMutation();
  const [logoutAuthenticatedUser] = useLazyLogoutAuthenticatedUserQuery();

  const [open, setOpen] = useState(false);

  const form = useFormik({
    initialValues: {
      tradeLink: "",
      email: "",
      confirm: "unchecked",
    },
    validationSchema: toFormikValidationSchema(registrationSchema(tInputs)),
    onSubmit: async (values, actions) => {
      try {
        const { email, tradeLink } = values;

        actions.setSubmitting(true);

        updateAuthenticatedUser({
          body: { email, steam_trade_link: tradeLink },
        });
      } catch (error) {
        console.error("error", error);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  const handleLogOut = () => {
    logoutAuthenticatedUser();

    dispatch(resetAuthenticatedUser());
    setOpen(false);

    router.push(`/${lng}`);
  };

  useEffect(() => {
    if (
      authenticationStatus === AUTHENTICATION_STATUS.AUTHENTICATED &&
      !user?.email &&
      !user?.steam_trade_link
    ) {
      setOpen(true);
    }
  }, [authenticationStatus, user?.email, user?.steam_trade_link]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast({
        description: tToasts("profile_success_message"),
      });

      setOpen(false);
    }
  }, [isLoading, isSuccess, tToasts, toast]);

  return (
    <Dialog open={open}>
      <DialogContent
        className="mx-5 max-w-[540px] rounded-xl border-0 bg-secondary-200 py-12 pr-10 shadow-md md:py-5"
        close={false}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <Motion configName="PRODUCT_DIALOG" className="flex flex-col gap-5">
          <h5>{t("title")}</h5>
          <div className="grid grid-cols-3 gap-2">
            <InputWithLabel
              className="col-span-2"
              label={
                <div className="flex gap-1">
                  <span>{tInputs("trade_link_label_text")}</span>
                  <CustomTooltip
                    className="max-w-[300px]"
                    text={t("trade_link_tooltip")}
                  >
                    <button>
                      <Icon name="TooltipIcon" />
                    </button>
                  </CustomTooltip>
                </div>
              }
              input={{
                name: "tradeLink",
                placeholder: tInputs("trade_link_placeholder"),
                value: form.values.tradeLink,
                onChange: form.handleChange,
                onBlur: form.handleBlur,
                error:
                  (form?.errors?.tradeLink &&
                    form?.touched?.tradeLink &&
                    form?.errors?.tradeLink) ||
                  error?.data?.errors?.steam_trade_link?.[0] ===
                    STEMA_LINK_IS_INVALID
                    ? tInputs("trade_link_is_invalid")
                    : "",
              }}
            />
            <Link
              href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url"
              rel="noopener noreferrer"
              target="_blank"
              className={cn(buttonVariants(), "mt-[29px] uppercase")}
            >
              {t("get_button_label")}
            </Link>
          </div>
          <InputWithLabel
            label={
              <p className="flex gap-1">
                <span>{tInputs("email_label_text")}</span>
              </p>
            }
            input={{
              type: "email",
              name: "email",
              placeholder: tInputs("email_placeholder"),
              value: form.values.email,
              onChange: form.handleChange,
              onBlur: form.handleBlur,
              error:
                (form?.errors?.email &&
                  form?.touched?.email &&
                  form?.errors?.email) ||
                error?.data?.errors?.email?.[0] === EMAIL_IS_USED
                  ? tInputs("email_is_used")
                  : "",
            }}
          />
          <CheckboxWithLabel
            label={t("confirm_text")}
            checkbox={{
              checked: form.values.confirm === "checked",
              onClick: (e) => {
                form.setFieldValue(
                  "confirm",
                  e.target.getAttribute("data-state") === "checked"
                    ? "unchecked"
                    : "checked"
                );
              },
              error:
                form?.errors?.confirm &&
                form?.touched?.confirm &&
                form?.errors?.confirm,
            }}
          />
          <Button
            type="submit"
            className="uppercase"
            disabled={isLoading}
            onClick={form.handleSubmit}
          >
            {isLoading && (
              <Icon name="SpinnerIcon" iconClassName="animate-spin" />
            )}
            {isLoading
              ? `${t("continue_button_label")}...`
              : t("continue_button_label")}
          </Button>
          <p className="text-tiny text-center">
            {t("sign_in_with_another_account_text")}{" "}
            <Link
              href={LOGOUT_URL}
              target="_top"
              onClick={handleLogOut}
              className="cursor-pointer text-destructive"
            >
              {t("log_out_text")}
            </Link>
          </p>
        </Motion>
      </DialogContent>
    </Dialog>
  );
};
