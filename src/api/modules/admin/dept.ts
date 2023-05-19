import http from "@/api";
import { System } from "../../config/serviceName";
import { Department } from "@/api/interface/admin/dept";

/**
 * @name 获取用户部门树
 */
export const deptTree = (params: Department.DeptPageParams) => {
	return http.get<Department.Res[]>(`${System.BASE}/dept/tree`, params, {
		headers: { noLoading: true }
	});
};

/**
 * 新增 部门
 */
export const addDept = (params: any) => {
	return http.post(`${System.BASE}/dept/add`, params);
};

/**
 * 更新 部门
 */
export const updateDept = (params: Department.Res) => {
	let sysDept: Department.Entity = {
		deptId: params.id,
		name: params.name,
		sortOrder: params.sortOrder,
		parentId: params.parentId
	}
	return http.put(`${System.BASE}/dept/update`, sysDept);
};

/**
 * 删除 部门
 */
export const deleteDept = (params: { id: number[] }) => {
	return http.delete(`${System.BASE}/dept/${params.id}`);
};