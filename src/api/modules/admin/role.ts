import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { Role } from "@/api/interface/admin/role";
import { ResPage } from "@/api/interface/common";

/**
 * 分页查询 角色 table
 */
export const getRolePages = (params: Role.PageParams) => {
    return http.get<ResPage<Role.Res[]>>(`${Server.Admin}/role/page`, params);
};

/**
 * 查询 角色
 */
export const getRoleList = () => {
    return http.get<Role.Res[]>(`${Server.Admin}/role/list`);
};

/**
 * 新增 角色
 */
export const addRole = (params: any) => {
    return http.post(`${Server.Admin}/role/add`, params);
};

/**
 * 更新 角色
 */
export const updateRole = (params: any) => {
    return http.put(`${Server.Admin}/role/update`, params);
};

/**
 * 删除 角色
 */
export const deleteRole = (params: any) => {
    return http.delete(`${Server.Admin}/role/${params.id}`);
};

/**
 * 给 角色 授权 菜单
 */
export const authorizeMenu = (params: any) => {
    let roleVo = {
        "menuIds": params.menuIds,
        "roleId": params.roleId
    }
    return http.put(`${Server.Admin}/role/rels/update`, roleVo);
};