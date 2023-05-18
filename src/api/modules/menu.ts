import http from "@/api";
import { System } from "../config/serviceName";
import { Menu } from "../interface/menu";

/**
 * @name 获取前端菜单列表树
 */
export const getMenuList = () => {
	return http.get<Menu.MenuOptions[]>(`${System.BASE}/menu/infos`, {
		headers: { noLoading: true }
	});
};

/**
 * 查询 角色与菜单关系
 */
export const getMenuRelsByRoleId = (roleId: number) => {
	return http.get<number[]>(`${System.BASE}/menu/rels/${roleId}`);
};

/**
 * @name 获取菜单树
 */
export const menuTree = (params: Menu.MenuPageParams) => {
	return http.get<Menu.Res[]>(`${System.BASE}/menu/tree`, params, {
		headers: { noLoading: true }
	});
};

/**
 * @name 新增菜单
 */
export const addMenu = (params: Menu.Entity) => {
	return http.post<Menu.Res>(`${System.BASE}/menu/add`, params, {
		headers: { noLoading: true }
	});
};

/**
 * @name 修改菜单
 */
export const updateMenu = (params: Menu.Entity) => {
	return http.put<boolean>(`${System.BASE}/menu/update`, params, {
		headers: { noLoading: true }
	});
};

/**
 * @name 删除菜单
 */
export const delMenu = (id: number) => {
	return http.delete<boolean>(`${System.BASE}/menu/${id}`, {
		headers: { noLoading: true }
	});
};