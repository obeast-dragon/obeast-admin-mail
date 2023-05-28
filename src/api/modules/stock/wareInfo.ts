import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { ResPage } from "@/api/interface/common";
import { WareInfo } from "@/api/interface/stock/wareInfo";

/**
 * @name 获取仓库分页
 */
export const wareInfoPages = (params?: any) => {
    return http.get<ResPage<WareInfo.Entity[]>>(`${Server.Ware}/wareInfo/page`, params);
};
/**
 * @name 新增仓库属性
 */
export const addWareInfo = (params: WareInfo.Entity) => {
    return http.post<boolean>(`${Server.Ware}/wareInfo/add`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 修改仓库属性
 */
export const updateWareInfo = (params: WareInfo.Entity) => {
    return http.put<boolean>(`${Server.Ware}/wareInfo/update`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 删除仓库属性
 */
export const delWareInfo = (params: any) => {
    return http.delete<boolean>(`${Server.Ware}/wareInfo/${params.id}`);
};