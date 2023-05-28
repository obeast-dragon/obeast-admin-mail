import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { ResPage } from "@/api/interface/common";
import { SpuInfo } from "@/api/interface/mail/spuInfo";

/**
 * Spu新增
 * @param params 
 * @returns 
 */
export const saveSpuInfo = (params?: SpuInfo.Vo) => {
    return http.post(`${Server.Product}/spuInfo/add`, params);
};

/**
 * @name 获取Spu分页
 */
export const spuInfoPages = (params?: any) => {
    return http.get<ResPage<SpuInfo.Entity[]>>(`${Server.Product}/spuInfo/page`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 更新上架状态Spu
 */
export const updatePublishStatus = (status: number, spuInfoId: number) => {
    return http.put(`${Server.Product}/spuInfo/update/publishStatus/${spuInfoId}/${status}`);
}

/**
 * @name 
 */
export const specification = () => {
    return http.post(`${Server.Product}/spuInfo/specificae`);
}
