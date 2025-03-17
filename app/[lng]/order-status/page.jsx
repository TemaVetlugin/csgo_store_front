'use client'

import Image from "next/image";
import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {CustomTooltip} from "@/components/custom-tooltip";
import {Motion} from "@/components/motion/motion";
import {Icon} from "@/components/icon";
import {useGetOrderDetailsQuery, useLazyGetProductsQuery} from "@/redux/services/productsApi";
import {useEffect} from "react";
import {useGetPaymentStatusQuery, useLazyGetPaymentStatusQuery} from "@/redux/services/paymentsApi";
import {useSearchParams} from "next/navigation";
import {useTranslation} from "@/services/i18n";

export default function OrderStatus() {
    const searchParams = useSearchParams();
    const uuid = searchParams.get("uuid");

    const [
        getPaymentStatus,
        {
            data: dataStatus,
            error: errorStatus,
            isLoading: isLoadingStatus,
        }
    ] = useLazyGetPaymentStatusQuery();
    const {
        data: dataOrderDetails,
        error: errorOrderDetails,
        isLoading: isLoadingOrderDetails
    } = useGetOrderDetailsQuery({params: {uuid: uuid}});

    useEffect(() => {
        const intervalId = setInterval(() => {
            getPaymentStatus({params: {uuid: uuid}});
        }, 5000);

        return () => clearInterval(intervalId);
    }, [getPaymentStatus]);

    useEffect(() => {
        getPaymentStatus({params: {uuid: uuid}});
    }, []);

    return (
        <>
            {!isLoadingOrderDetails ?
                <div className="max-w-3xl mx-auto p-6 bg-transparent">
                    <h1 className="text-2xl font-black text-center text-white mb-2">Order status</h1>
                    <div className="bg-secondary-200 pt-3 rounded-lg shadow">
                        <p className="text-white text-center md:text-left  font-semibold pb-2 pl-4 pr-4 text-sm mb-2 border-b border-gray-700">ID <span
                            className="font-semibold">{uuid}</span></p>

                        {dataOrderDetails?.products?.map(product =>

                            <div className=" border-r-0  border-b border-gray-700 bg-secondary-200">
                                <CardContent className="p-4 flex justify-between items-center">
                                    <div className="max-w-[70%]">
                                        <CardTitle
                                            className=" inline-block !text-mini-semibold max-w-[100%]  sm:max-w-none font-bold cursor-pointer truncate text-center md:text-left"
                                        >
                                            {product?.name}
                                        </CardTitle>
                                        <CardDescription
                                            className="!text-tiny max-w-[100%]   mt-1.5 text-left mb-1 text-secondary-700">
                                            {product?.extra?.quality} / {product?.extra?.type}
                                        </CardDescription>
                                        <Badge
                                            className="m-auto w-max capitalize md:m-0"
                                            variant={product?.extra?.rarity?.toLowerCase()}
                                        >
                                            {product?.extra?.rarity}
                                        </Badge>
                                        <div className="text-mini-semibold mt-1 ">€{product?.price}</div>
                                    </div>
                                    <div
                                        className="relative flex h-full flex-col items-center justify-center rounded-2xl bg-secondary-600 px-1.5 py-3.5 shadow-inner">
                                        <Image
                                            src={`https://api.steamapis.com/image/item/730/${product?.name}`}
                                            alt="AK-47"
                                            width={64}
                                            height={64}
                                            className="rounded"
                                        />
                                    </div>
                                </CardContent>
                            </div>)
                        }

                        <div className="text-white text-[14px] sm:text-[16px] font-bold flex justify-between px-4 pt-4">
                            <span>Total amount due:</span>
                            <span className="">€{dataOrderDetails?.price}</span>
                        </div>

                        <div
                            className={`text-white text-[14px] sm:text-[16px] font-bold flex justify-between px-4 pt-2 `}>
                            <span>Payment status:</span>
                            <span className={` ${dataStatus?.status === 'processed' ? 'text-green' : 'text-orange'}`}>
                        {dataStatus?.status === 'processed' && 'Created'}
                                {dataStatus?.status === 'failed' && 'Failed'}
                                {(!dataStatus || !dataStatus?.status || dataStatus?.status === 'pending') && 'Pending'}
                    </span>
                        </div>

                        <div
                            className="text-white text-[14px] sm:text-[16px] font-bold flex justify-between px-4 pb-4 pt-2 border-b border-gray-700">
                            <span>Trade status: </span>
                            <span
                                className={` ${dataStatus?.trade === 'Accepted' ? 'text-green' : 'text-orange'}`}>{dataStatus?.trade ?? 'Creating trade'}</span>
                        </div>

                        <div className=" p-4 text-orange rounded-lg text-sm">
                            {dataStatus?.description}
                        </div>

                    </div>

                    {dataStatus?.status === 'processed' && <div
                        className="flex justify-start items-center text-green gap-2 p-4 mb-6 rounded-lg border border-green mt-4">
                        {/*<Icon name={'Clock'}/>*/}
                        <div
                            className="w-4 h-4 text-sm rounded-full flex justify-center items-center border border-green">!
                        </div>
                        Payment complete
                    </div>}
                </div>
                :
                <div className="mt-16 flex items-center justify-center">
                    <div
                        className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-secondary-600 border-t-primary"/>
                    Loading...
                </div>
            }
        </>
    );
}
