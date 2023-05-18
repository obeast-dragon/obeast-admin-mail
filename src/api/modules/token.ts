import http from "@/api";
import { System } from "../config/serviceName";
import { ResPage } from "../interface/common";
import { SysToken } from "../interface/token";

/**
 * 分页查询 token table
 */
export const getTokenPages = (params: SysToken.PageParams) => {
    return http.get<ResPage<SysToken.Entity[]>>(`${System.BASE}/token/page`, params);
};

/**
 * 删除 token
 */
export const deleteToken = (params: { id: string[] }) => {
    return http.delete(`${System.BASE}/token/${params.id}`);
};