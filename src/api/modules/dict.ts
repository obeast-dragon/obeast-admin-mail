import http from "@/api";
import { System } from "../config/serviceName";
import { SysDictItem, SysDict } from "../interface/dict";
import { ResPage } from "../interface/common";

/**
 * 根据key获取字典
 * @param key key 
 * @returns 
 */
export const getDictionarys = (key: string) => {
    return http.get<SysDict.Entity>(`${System.BASE}/dict/key${key}`, {
        headers: { noLoading: true }
    });
};

/**
 * 查询 dict list
 */
export const getDictList = (params: { "name"?: string }) => {
    return http.get<SysDict.Entity[]>(`${System.BASE}/dict/list`, params);
};

/**
 * 分页查询 dictItem Page 
 */
export const getDictItemPages = (params: SysDictItem.PageParams) => {
    return http.get<ResPage<SysDictItem.Entity[]>>(`${System.BASE}/dict/item/page`, params, {
        headers: { noLoading: true }
    });
};
