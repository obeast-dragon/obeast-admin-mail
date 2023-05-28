import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { ResPage } from "@/api/interface/common";
import { Purchase } from "@/api/interface/stock/purchase";

/**
 * @name 获取采购单分页
 */
export const purchasePages = (params?: any) => {
    return http.get<ResPage<Purchase.Entity[]>>(`${Server.Ware}/purchase/page`, params);
};

/**
 * @name 获取所有采购单
 */
export const purchaseList = () => {
    return http.get<Purchase.Entity[]>(`${Server.Ware}/purchase/list`);
};

/**
 * @name 新增采购单属性
 */
export const addPurchase = (params: Purchase.Entity) => {
    return http.post<boolean>(`${Server.Ware}/purchase/add`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 修改采购单属性
 */
export const updatePurchase = (params: Purchase.Entity) => {
    return http.put<boolean>(`${Server.Ware}/purchase/update`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 删除采购单属性
 */
export const delPurchase = (params: any) => {
    return http.delete<boolean>(`${Server.Ware}/purchase/${params.id}`);
};

/**
 * @name 获取采购单需求分页
 */
export const demandPages = (params?: any) => {
    return http.get<ResPage<Purchase.Demand[]>>(`${Server.Ware}/demand/page`, params);
};

/**
 * @name 获取所有采购单需求
 */
export const demandList = () => {
    return http.get<Purchase.Demand[]>(`${Server.Ware}/demand/list`);
};

/**
 * @name 新增采购单需求属性
 */
export const addDemand = (params: Purchase.Demand) => {
    return http.post<boolean>(`${Server.Ware}/demand/add`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 修改采购单需求属性
 */
export const updateDemand = (params: Purchase.Entity) => {
    return http.put<boolean>(`${Server.Ware}/demand/update`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 删除采购单需求属性
 */
export const delDemand = (params: any) => {
    return http.delete<boolean>(`${Server.Ware}/demand/${params.id}`);
};