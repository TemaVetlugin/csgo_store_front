"use client";

import {Suspense, useEffect, useMemo, useState} from "react";
import {useTranslation} from "@/services/i18n/client";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setSelectedProfileTab} from "@/redux/features/mainSlice";
import {useFormik} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {AUTHENTICATION_STATUS} from "@/redux/features/authSlice";
import {
    useLazyGetUserTransactionsQuery,
    useLazyVerifyEmailQuery,
    useUpdateAuthenticatedUserMutation,
} from "@/redux/services/userApi";

import {ListRestart, MoveLeft, MoveRight} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {AvatarLabel} from "@/components/avatar-label";
import {DropdownWithLabel} from "@/components/dropdowns/dropdown-with-label";
import {Icon} from "@/components/icon";
import {InputWithIcon} from "@/components/inputs/input-with-icon";
import {TransactionsTable} from "@/components/tables/transactions";
import {Button, buttonVariants} from "@/components/ui/button";
import {CustomTooltip} from "@/components/custom-tooltip";
import {useToast} from "@/components/ui/use-toast";
import {TransactionCard} from "@/components/transaction-card";
import {PageWrapper} from "@/components/page-wrapper";
import {Input} from "@/components/ui/input";
import {AlertWarning} from "@/components/alerts/warning";
import ScrollToTop from "@/components/auto-scroll-to-top";

import {cn} from "@/lib/utils";
import {profileSchema} from "@/lib/validations";
import {LOGOUT_URL} from "@/lib/constants/config";
import {getCurrencySymbolByCode} from "@/lib/utils/currencies";

import ProfileImage from "@/public/assets/rules_img.webp";
import {useLazyGetPaymentStatusQuery} from "@/redux/services/paymentsApi";

const ITEMS_PER_PAGE = 7;
const DEFAULT_FILTERS = {
    search: "",
    type: "",
    status: "",
};

export default function Profile({params: {lng}}) {
    const dispatch = useAppDispatch();
    const {toast} = useToast();

    const {t} = useTranslation(lng, "profile-page");
    const {t: tInputs} = useTranslation(lng, "inputs");
    const {t: tDropdowns} = useTranslation(lng, "dropdowns");
    const {t: tToasts} = useTranslation(lng, "toasts");

    const tabs = t("tabs", {returnObjects: true});

    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [page, setPage] = useState(1);

    const [
        getUserTransactions,
        {data: userTransactionsData, isSuccess: isSuccessUserTransactionsData},
    ] = useLazyGetUserTransactionsQuery();
    const [updateAuthenticatedUser, {isLoading, isSuccess, isError}] =
        useUpdateAuthenticatedUserMutation();
    const [
        verifyEmail,
        {
            data: dataStatus,
            isLoading: isLoadingStatus,
            isSuccess: isSuccessLoading,
        }
    ] = useLazyVerifyEmailQuery({});

    const ddStatusItems = tDropdowns("statuses.items", {
        returnObjects: true,
    });

    const modifiedTransactionsData = !isSuccessUserTransactionsData
        ? []
        : userTransactionsData?.transactions?.map(
            ({
                 id,
                 product: {name},
                 status,
                 type,
                 payed_amount,
                 payed_in_currency,
                 created_at,
             }) => ({
                id,
                name,
                details: name,
                image: `https://api.steamapis.com/image/item/730/${name}`,
                transactionId: id,
                status: {
                    label: ddStatusItems.find((s) => s.value === status)?.text || "",
                    value: status,
                },
                type: type,
                price: `${getCurrencySymbolByCode(
                    payed_in_currency
                )} ${payed_amount}`,
                date: created_at,
            })
        );

    const selectedProfileTab = useAppSelector(
        ({main}) => main.selectedProfileTab
    );
    const {user, authenticationStatus} = useAppSelector(({auth}) => auth);

    const form = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: user?.email || "",
            tradeLink: user?.steam_trade_link || "",
        },
        validationSchema: toFormikValidationSchema(profileSchema(tInputs)),
        onSubmit: async (values, actions) => {
            try {
                const {email, tradeLink} = values;

                actions.setSubmitting(true);

                const validatedUpdatedUserBody = handleValidateUpdatedUserBody(user, {
                    email,
                    steam_trade_link: tradeLink,
                });

                updateAuthenticatedUser({body: validatedUpdatedUserBody});
            } catch (error) {
                console.error("error", error);
            } finally {
                actions.setSubmitting(false);
            }
        },
    });

    const selectedTabIndex = useMemo(
        () => tabs.findIndex(({value}) => value === selectedProfileTab),
        [selectedProfileTab, tabs]
    );

    useEffect(() => {
        if(!isLoadingStatus&&isSuccessLoading){
            toast({
                description: "A verification letter has been sent to your email",
            });
        }
    }, [
        isLoadingStatus,
        isSuccessLoading]);

    const handleValidateUpdatedUserBody = (curUser, updatedUser) => {
        const updatedUserBody = {};

        if (curUser.email !== updatedUser.email) {
            updatedUserBody["email"] = updatedUser.email;
        }

        if (curUser.steam_trade_link !== updatedUser.steam_trade_link) {
            updatedUserBody["steam_trade_link"] = updatedUser.steam_trade_link;
        }

        return updatedUserBody;
    };

    useEffect(() => {
        if (!isLoading && isSuccess) {
            toast({
                description: tToasts("profile_success_message"),
            });
        }
    }, [isLoading, isSuccess, tToasts, toast]);

    useEffect(() => {
        const name = filters.search;
        const type = filters.type;
        const status = filters.status;

        const params = {
            page,
            per_page: ITEMS_PER_PAGE,
            ...(name && {product_name: name}),
            ...(type && {type}),
            ...(status && {status}),
        };

        getUserTransactions({params});
    }, [getUserTransactions, filters.search, page, filters.type, filters.status]);

    useEffect(() => {
        dispatch(setSelectedProfileTab(localStorage.getItem("selectedProfileTab")));
    }, [dispatch]);

    return (
        <PageWrapper className="grid grid-cols-1 gap-6 md:mt-8 md:grid-cols-4 lg:gap-10">
            <Suspense>
                <ScrollToTop/>
                <div className="grid h-max grid-cols-3 gap-2 rounded-lg bg-secondary-200 p-2 py-4 md:flex md:flex-col">
                    {tabs.map(({text, value, icon}, index) => {
                        return (
                            <div
                                key={text}
                                className={cn(
                                    "flex cursor-pointer flex-col gap-2 rounded-lg border border-transparent p-2 transition-all duration-300 ease-in-out md:flex-row md:items-center",
                                    selectedTabIndex === index &&
                                    "border border-[#E24E4E] border-opacity-30 bg-primary bg-opacity-10 text-[#E24E4E]"
                                )}
                                onClick={() => {
                                    dispatch(setSelectedProfileTab(value));
                                }}
                            >
                                <Icon name={icon} className="m-auto md:m-0"/>
                                <CustomTooltip text={text}>
                                    <p className="text-mini truncate text-center">{text}</p>
                                </CustomTooltip>
                            </div>
                        );
                    })}
                </div>
                {authenticationStatus === AUTHENTICATION_STATUS.AUTHENTICATED && (
                    <div className="col-span-1 md:col-span-3">
                        {/* User Info */}
                        <div
                            className={cn(
                                "grid grid-flow-row auto-rows-max gap-7",
                                selectedTabIndex !== 0 && "hidden"
                            )}
                        >
                            <ul className="flex flex-col gap-4 rounded-lg bg-secondary-200 px-4 py-9 shadow-sm md:px-7">
                                <li className="grid grid-cols-1 items-center md:grid-cols-4">
                                    <div className="grid grid-cols-1 items-center gap-2 md:col-span-3 md:grid-cols-3">
                    <span className="text-paragraph">
                      {t("user_info.profile.title")}
                    </span>
                                        <AvatarLabel user={user} avatar={user?.avatar}/>
                                    </div>
                                </li>
                                <li className="text-mini grid grid-cols-1 md:grid-cols-4">
                                    <div className="grid grid-cols-2 items-center gap-2 md:col-span-3 md:grid-cols-3">
                                        <span>{t("user_info.profile.registration")}</span>
                                        <span>{user?.registered_at || "-"}</span>
                                    </div>
                                </li>
                                <li className="text-mini grid grid-cols-1 md:grid-cols-4">
                                    <div className="grid grid-cols-2 items-center gap-2 md:col-span-3 md:grid-cols-3">
                                        <span>{t("user_info.profile.trades")}</span>
                                        <span className="md:col-span-2">
                      {user?.trades_amount || "-"}
                    </span>
                                    </div>
                                </li>
                                <li className="text-mini relative grid grid-cols-1 md:grid-cols-4">
                                    <div className="grid grid-cols-2 items-center gap-2 md:col-span-3 md:grid-cols-3">
                    <span className="break-words">
                      {t("user_info.profile.email")}
                    </span>
                                        <Input
                                            size="sm"
                                            type="email"
                                            name="email"
                                            className="-ml-3 md:col-span-2"
                                            inputClassName={cn(
                                                "text-tiny truncate disabled:bg-secondary-200"
                                            )}
                                            placeholder={tInputs("email_placeholder")}
                                            value={form.values.email}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                            error={
                                                form?.errors?.email &&
                                                form?.touched?.email &&
                                                form?.errors?.email
                                            }
                                        />
                                    </div>
                                </li>
                            </ul>

                            <div
                                className="flex flex-col gap-4 rounded-lg bg-secondary-200 px-4 py-9 shadow-sm md:px-7">
                                <p className="text-paragraph">
                                    {t("user_info.general_information.title")}
                                </p>
                                <ul className="flex flex-col gap-4">
                                    <li className="text-mini grid grid-cols-1 items-center md:grid-cols-4">
                                        <div
                                            className="grid grid-cols-2 items-center gap-2 md:col-span-4 md:grid-cols-4">
                      <span>
                        {t("user_info.general_information.trade_link")}
                      </span>
                                            <div
                                                className="col-span-2 grid grid-cols-3 gap-2 md:col-span-3 md:grid-cols-3">
                                                <Input
                                                    size="sm"
                                                    name="tradeLink"
                                                    className="col-span-2 -ml-3 md:col-span-2"
                                                    inputClassName={cn(
                                                        "text-mini truncate disabled:bg-secondary-200"
                                                    )}
                                                    placeholder={tInputs("trade_link_placeholder")}
                                                    value={form.values.tradeLink}
                                                    onChange={form.handleChange}
                                                    onBlur={form.handleBlur}
                                                    error={
                                                        (form?.errors?.tradeLink &&
                                                            form?.touched?.tradeLink &&
                                                            form?.errors?.tradeLink) ||
                                                        (isError && tInputs("trade_link_is_invalid"))
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="text-mini grid grid-cols-1 items-center md:grid-cols-4">
                                        <div
                                            className="grid grid-cols-2 items-center gap-2 md:col-span-4 md:grid-cols-4">
                      <span>
                        {t("user_info.general_information.steam_id64")}
                      </span>
                                            <CustomTooltip text={user?.steam_id}>
                        <span className="truncate md:col-span-2">
                          {user?.steam_id}
                        </span>
                                            </CustomTooltip>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {!user?.email_verified && (
                                <>
                                    <AlertWarning description="Please, verify your email."/>
                                    <Button
                                        className="w-fit px-7"
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            verifyEmail({})
                                        }}
                                        aria-label="Verifi email"
                                    >
                                        Verify email
                                    </Button>
                                </>
                            )}

                            <Button
                                className="w-fit px-7"
                                onClick={form.handleSubmit}
                                disabled={isLoading}
                                aria-label="Save profile information"
                            >
                                {isLoading && (
                                    <Icon name="SpinnerIcon" iconClassName="animate-spin"/>
                                )}
                                {isLoading
                                    ? t("user_info.save_button_in_process_label")
                                    : t("user_info.save_button_label")}
                            </Button>
                        </div>

                        {/* Transactions */}
                        <div
                            className={cn(
                                "rounded-lg bg-secondary-200 pb-6 pt-9 shadow-sm",
                                selectedTabIndex !== 1 && "hidden"
                            )}
                        >
                            <h2 className="text-body px-7">{t("transactions.title")}</h2>
                            <div className="mt-4 grid grid-cols-1 px-7 md:grid-cols-2">
                                <InputWithIcon
                                    input={{
                                        placeholder: tInputs("search_placeholder"),
                                        size: "sm",
                                        value: filters.search,
                                        onChange: ({target}) => {
                                            setFilters((prev) => ({
                                                ...prev,
                                                search: target.value,
                                            }));
                                            setPage(1);
                                        },
                                    }}
                                    icon={{name: "SearchIcon"}}
                                />
                                <div className="mt-5 flex justify-center gap-2 md:mt-0 md:justify-end">
                                    <DropdownWithLabel
                                        label={tDropdowns("statuses.label")}
                                        items={tDropdowns("statuses.items", {
                                            returnObjects: true,
                                        })}
                                        selectedItem={
                                            filters.status ? {text: filters.status} : null
                                        }
                                        onItemClick={(el) => {
                                            setFilters((prev) => ({
                                                ...prev,
                                                status: el.value.toLowerCase(),
                                            }));
                                            setPage(1);
                                        }}
                                    />
                                    <DropdownWithLabel
                                        label={tDropdowns("types.label")}
                                        items={tDropdowns("types.items", {returnObjects: true})}
                                        selectedItem={filters.type ? {text: filters.type} : null}
                                        onItemClick={(el) => {
                                            setFilters((prev) => ({
                                                ...prev,
                                                type: el.text.toLowerCase(),
                                            }));
                                            setPage(1);
                                        }}
                                    />
                                    <Button
                                        size="icon-sm"
                                        variant="ghost"
                                        onClick={() => {
                                            setFilters(DEFAULT_FILTERS);
                                            setPage(1);
                                        }}
                                    >
                                        <ListRestart/>
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-7 hidden px-4 lg:block">
                                <Suspense>
                                    <TransactionsTable
                                        data={modifiedTransactionsData}
                                        columns={t("transactions.table.columns", {
                                            returnObjects: true,
                                        })}
                                    />
                                </Suspense>
                            </div>
                            <ul className="mx-4 mt-4 flex flex-col gap-2 lg:hidden">
                                {modifiedTransactionsData.map((transaction) => {
                                    return (
                                        <TransactionCard
                                            lng={lng}
                                            key={transaction.id}
                                            {...transaction}
                                        />
                                    );
                                })}
                            </ul>

                            <div className="justify-right mx-4 mt-4 flex gap-2">
                                <Button
                                    className="px-2 py-0"
                                    size="sm"
                                    variant="ghost"
                                    disabled={page === 1}
                                    onClick={() => setPage((prev) => (prev === 1 ? 1 : prev - 1))}
                                >
                                    <MoveLeft/>{" "}
                                    <span className="ml-2">
                    {t("transactions.prev_button_label")}
                  </span>
                                </Button>
                                <Button
                                    className="px-2 py-0"
                                    size="sm"
                                    variant="ghost"
                                    disabled={
                                        userTransactionsData?.transactions?.length !==
                                        ITEMS_PER_PAGE
                                    }
                                    onClick={() => setPage((prev) => prev + 1)}
                                >
                  <span className="mr-2">
                    {t("transactions.next_button_label")}
                  </span>{" "}
                                    <MoveRight/>
                                </Button>
                            </div>
                        </div>

                        {/* Log out */}
                        <div
                            className={cn(
                                "flex flex-col items-center gap-4 rounded-lg bg-secondary-200 px-10 py-9 shadow-sm",
                                selectedTabIndex !== 2 && "hidden"
                            )}
                        >
                            <h2 className="text-body">{t("log_out.title")}</h2>
                            <p className="text-mini">{t("log_out.text")}</p>
                            <Link
                                href={LOGOUT_URL}
                                target="_top"
                                // onClick={handleLogOut}
                                className={buttonVariants({size: "lg"})}
                            >
                                {t("log_out.log_out_button_label")}
                            </Link>
                            <Image
                                src={ProfileImage}
                                width={390}
                                height={262}
                                alt="The logo with a soldier wielding a gun for CS:GO store"
                                placeholder="blur"
                                className="rules__image"
                            />
                        </div>
                    </div>
                )}
            </Suspense>
        </PageWrapper>
    );
}
