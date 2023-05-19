import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { Menu } from "@/api/interface/admin/menu";

/**
 * @name 获取前端菜单列表树
 */
export const getMenuList = () => {
	return http.get<Menu.MenuOptions[]>(`${Server.Admin}/menu/infos`, {
		headers: { noLoading: true }
	});
};

/**
 * 查询 角色与菜单关系
 */
export const getMenuRelsByRoleId = (roleId: number) => {
	return http.get<number[]>(`${Server.Admin}/menu/rels/${roleId}`);
};

/**
 * @name 获取菜单树
 */
export const menuTree = (params: Menu.MenuPageParams) => {
	return http.get<Menu.Res[]>(`${Server.Admin}/menu/tree`, params, {
		headers: { noLoading: true }
	});
};

/**
 * @name 新增菜单
 */
export const addMenu = (params: Menu.Entity) => {
	return http.post<Menu.Res>(`${Server.Admin}/menu/add`, params, {
		headers: { noLoading: true }
	});
};

/**
 * @name 修改菜单
 */
export const updateMenu = (params: Menu.Entity) => {
	return http.put<boolean>(`${Server.Admin}/menu/update`, params, {
		headers: { noLoading: true }
	});
};

/**
 * @name 删除菜单
 */
export const delMenu = (id: number) => {
	return http.delete<boolean>(`${Server.Admin}/menu/${id}`, {
		headers: { noLoading: true }
	});
};