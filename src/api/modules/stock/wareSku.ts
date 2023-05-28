import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { ResPage } from "@/api/interface/common";
import { WareSku } from "@/api/interface/stock/wareSku";

/**
 * @name 获取商品库存分页
 */
export const wareSkuPages = (params?: any) => {
    return http.get<ResPage<WareSku.Entity[]>>(`${Server.Ware}/wareSku/page`, params);
};
/**
 * @name 新增商品库存属性
 */
export const addWareSku = (params: WareSku.Entity) => {
    return http.post<boolean>(`${Server.Ware}/wareSku/add`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 修改商品库存属性
 */
export const updateWareSku = (params: WareSku.Entity) => {
    return http.put<boolean>(`${Server.Ware}/wareSku/update`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 删除商品库存属性
 */
export const delWareSku = (params: any) => {
    return http.delete<boolean>(`${Server.Ware}/wareSku/${params.id}`);
};