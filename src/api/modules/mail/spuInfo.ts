import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { SpuInfo } from "@/api/interface/mail/spuInfo";

/**
 * 商品新增
 * @param params 
 * @returns 
 */
export const saveSpuInfo = (params?: SpuInfo.Vo) => {
    return http.post<boolean>(`${Server.Product}/spuInfo/add`, params);
};
