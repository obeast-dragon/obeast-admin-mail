import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { ResPage } from "@/api/interface/common";
import { SkuInfo } from "@/api/interface/mail/skuInfo";

/**
 * @name 获取Sku分页
 */
export const skuInfoPages = (params?: any) => {
    return http.get<ResPage<SkuInfo.Entity[]>>(`${Server.Product}/skuInfo/page`, params, {
        headers: { noLoading: true }
    });
};