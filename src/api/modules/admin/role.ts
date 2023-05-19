import http from "@/api";
import { System } from "@/api/config/serviceName";
import { Role } from "@/api/interface/admin/role";
import { ResPage } from "@/api/interface/common";

/**
 * 分页查询 角色 table
 */
export const getRolePages = (params: Role.PageParams) => {
    return http.get<ResPage<Role.Res[]>>(`${System.BASE}/role/page`, params);
};

/**
 * 查询 角色
 */
export const getRoleList = () => {
    return http.get<Role.Res[]>(`${System.BASE}/role/list`);
};

/**
 * 新增 角色
 */
export const addRole = (params: any) => {
    return http.post(`${System.BASE}/role/add`, params);
};

/**
 * 更新 角色
 */
export const updateRole = (params: any) => {
    return http.put(`${System.BASE}/role/update`, params);
};

/**
 * 删除 角色
 */
export const deleteRole = (params: any) => {
    return http.delete(`${System.BASE}/role/${params.id}`);
};

/**
 * 给 角色 授权 菜单
 */
export const authorizeMenu = (params: any) => {
    let roleVo = {
        "menuIds": params.menuIds,
        "roleId": params.roleId
    }
    return http.put(`${System.BASE}/role/rels/update`, roleVo);
};