import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { SysToken } from "@/api/interface/admin/token";
import { ResPage } from "@/api/interface/common";

/**
 * 分页查询 token table
 */
export const getTokenPages = (params: SysToken.PageParams) => {
    return http.get<ResPage<SysToken.Entity[]>>(`${Server.Admin}/token/page`, params);
};

/**
 * 删除 token
 */
export const deleteToken = (params: { id: string[] }) => {
    return http.delete(`${Server.Admin}/token/${params.id}`);
};