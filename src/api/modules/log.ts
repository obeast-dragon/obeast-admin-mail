import http from "@/api";
import { System } from "../config/serviceName";
import { ResPage } from "../interface/common";
import { Log } from "../interface/log";

/**
 * 分页查询 日志 table
 */
export const getLogPages = (params: Log.PageParams) => {
    return http.get<ResPage<Log.Entity[]>>(`${System.BASE}/log/page`, params);
};

/**
 * 删除 日志
 */
export const deleteLog = (params: { id: string[] }) => {
    return http.delete(`${System.BASE}/log/${params.id}`);
};