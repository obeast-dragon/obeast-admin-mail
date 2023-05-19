import http from "@/api";
import { Server } from "../../config/serviceName";
import { ResPage } from "../../interface/common";
import { Client } from "../../interface/admin/client";

/**
 * 分页查询 客户端 table
 */
export const getClientPages = (params: Client.PageParams) => {
    return http.get<ResPage<Client.Entity[]>>(`${Server.Admin}/client/page`, params);
};

/**
 * 新增 客户端
 */
export const addClient = (params: any) => {
    return http.post(`${Server.Admin}/client/add`, params);
};

/**
 * 更新 客户端
 */
export const updateClient = (params: any) => {
    return http.put(`${Server.Admin}/client/update`, params);
};

/**
 * 删除 客户端
 */
export const deleteClient = (params: { id: string[] }) => {
    return http.delete(`${Server.Admin}/client/${params.id}`, params);
};