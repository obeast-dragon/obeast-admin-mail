import http from "@/api";
import { Server } from "../../config/serviceName";
import { Department } from "@/api/interface/admin/dept";

/**
 * @name 获取用户部门树
 */
export const deptTree = (params: Department.DeptPageParams) => {
	return http.get<Department.Res[]>(`${Server.Admin}/dept/tree`, params, {
		headers: { noLoading: true }
	});
};

/**
 * 新增 部门
 */
export const addDept = (params: any) => {
	return http.post(`${Server.Admin}/dept/add`, params);
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
	return http.put(`${Server.Admin}/dept/update`, sysDept);
};

/**
 * 删除 部门
 */
export const deleteDept = (params: { id: number[] }) => {
	return http.delete(`${Server.Admin}/dept/${params.id}`);
};