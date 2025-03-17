"use client";

import { useTranslation } from "@/services/i18n/client";
import Image from "next/image";
import { Badge } from "./ui/badge";

export const transactionStatusVariant = {
  accepted: "accepted",
  creating_trade: "contraband",
  waiting_accept: "high grade",
  pending: "industrial grade",
};

export const TransactionCard = ({
  lng,
  name = "",
  image = "",
  details = "",
  type = "",
  transactionId = "",
  status = { label: "", value: "" },
  price = "",
  date = "",
}) => {
  const { t } = useTranslation(lng, "transaction-card");

  return (
    <li className="grid grid-cols-3 gap-5 rounded-lg bg-secondary-300 px-7 py-6">
      <div>
        <Image
          src={image}
          width={77}
          height={46}
          alt={`The image of ${name}`}
        />
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <span className="text-tiny text-white text-opacity-20">
          {t("details")}
        </span>
        <span className="text-tiny">{details}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-tiny text-white text-opacity-20">
          {t("type")}
        </span>
        <span className="text-tiny capitalize">{type}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-tiny text-white text-opacity-20">
          {t("transaction_id")}
        </span>
        <span className="text-tiny">{transactionId}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-tiny text-white text-opacity-20">
          {t("status")}
        </span>
        {status?.value ? (
          <Badge
            variant={transactionStatusVariant[status?.value] || "extraordinary"}
            className="w-max capitalize"
          >
            {status?.label}
          </Badge>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-tiny text-white text-opacity-20">
          {t("price")}
        </span>
        <span className="text-tiny">{price}</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-tiny text-white text-opacity-20">
          {t("date")}
        </span>
        <span className="text-tiny">{date}</span>
      </div>
    </li>
  );
};
