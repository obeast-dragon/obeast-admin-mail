import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { ResPage } from "@/api/interface/common";
import { MailAttr } from "@/api/interface/mail/attr";

/**
 * @name 获取 规格属性 分页
 */
export const attrPages = (params?: any) => {
    return http.get<ResPage<MailAttr.Entity[]>>(`${Server.Product}/attr/page`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 新增规格属性
 */
export const addAttr = (params: MailAttr.Entity) => {
    return http.post<boolean>(`${Server.Product}/attr/add`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 修改规格属性
 */
export const updateAttr = (params: MailAttr.Entity) => {
    return http.put<boolean>(`${Server.Product}/attr/update`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 删除规格属性
 */
export const delAttr = (params: any) => {
    return http.delete<boolean>(`${Server.Product}/attr/${params.id}`);
};

/**
 * @name 获取 规格属性 分页
 */
export const attrSaleListCategoryId = (categoryId: number) => {
    return http.get<MailAttr.Entity[]>(`${Server.Product}/attr//sale/list/${categoryId}`, {
        headers: { noLoading: true }
    });
};