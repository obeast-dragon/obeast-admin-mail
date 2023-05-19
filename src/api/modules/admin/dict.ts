import http from "@/api";
import { Server } from "../../config/serviceName";
import { SysDict, SysDictItem } from "@/api/interface/admin/dict";
import { ResPage } from "@/api/interface/common";

/**
 * 根据key获取字典
 * @param key key 
 * @returns 
 */
export const getDictionarys = (key: string) => {
    return http.get<SysDict.Entity>(`${Server.Admin}/dict/key${key}`, {
        headers: { noLoading: true }
    });
};

/**
 * 查询 dict list
 */
export const getDictList = (params: { "name"?: string }) => {
    return http.get<SysDict.Entity[]>(`${Server.Admin}/dict/list`, params);
};

/**
 * 分页查询 dictItem Page 
 */
export const getDictItemPages = (params: SysDictItem.PageParams) => {
    return http.get<ResPage<SysDictItem.Entity[]>>(`${Server.Admin}/dict/item/page`, params, {
        headers: { noLoading: true }
    });
};
