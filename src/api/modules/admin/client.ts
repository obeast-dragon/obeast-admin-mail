import http from "@/api";
import { System } from "../../config/serviceName";
import { ResPage } from "../../interface/common";
import { Client } from "../../interface/admin/client";

/**
 * 分页查询 客户端 table
 */
export const getClientPages = (params: Client.PageParams) => {
    return http.get<ResPage<Client.Entity[]>>(`${System.BASE}/client/page`, params);
};

/**
 * 新增 客户端
 */
export const addClient = (params: any) => {
    return http.post(`${System.BASE}/client/add`, params);
};

/**
 * 更新 客户端
 */
export const updateClient = (params: any) => {
    return http.put(`${System.BASE}/client/update`, params);
};

/**
 * 删除 客户端
 */
export const deleteClient = (params: { id: string[] }) => {
    return http.delete(`${System.BASE}/client/${params.id}`, params);
};