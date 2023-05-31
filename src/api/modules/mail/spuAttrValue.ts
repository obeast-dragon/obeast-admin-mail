import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { SpuAttrValue } from "@/api/interface/mail/spuAttrValue";

/**
 * @name 获取Spu分页
 */
export const listBySpuId = (params: { spuId: number }) => {
    return http.get<SpuAttrValue.Entity[]>(`${Server.Product}/spuAttrValue/listBySpuId`, params, {
        headers: { noLoading: true }
    });
};