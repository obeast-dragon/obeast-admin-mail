import http from "@/api";
import { ResPage } from "../interface/common";
import { User } from "../interface/user";
import { System } from "../config/serviceName";

/**
 * 分页查询用户table
 */
export const getUserPages = (params: User.UserPageParams) => {
	return http.get<ResPage<User.UserVO>>(`${System.BASE}/user/page`, params);
};

/**
 * 查询用户 by token
 */
export const getUserVoByToken = () => {
	return http.get<User.UserVO>(`${System.BASE}/user/info`, {
		headers: { noLoading: true }
	});
};

/**
 * 新增用户
 */
export const addUser = (userVO: User.UserVO) => {
	const params: User.UserAddParams = {
		roleList: userVO.roleList.flatMap(item => item.roleId),
		deptId: userVO.deptId,
		postList: userVO.postList.flatMap(item => item.postId),
		name: userVO.name,
		nickName: userVO.nickName,
		username: userVO.username,
		password: userVO.password,
		phone: userVO.phone,
		avatar: userVO.avatar,
		email: userVO.email,
		delFlag: userVO.delFlag,
		userId: userVO.userId
	}
	return http.post(`${System.BASE}/user/add`, params);
};

/**
 * 编辑用户
 */
export const updateUser = (userVO: User.UserVO) => {
	const params: User.UserAddParams = {
		roleList: userVO.roleList.flatMap(item => item.roleId),
		deptId: userVO.deptId,
		postList: userVO.postList.flatMap(item => item.postId),
		name: userVO.name,
		nickName: userVO.nickName,
		username: userVO.username,
		password: userVO.password,
		phone: userVO.phone,
		avatar: userVO.avatar,
		email: userVO.email,
		delFlag: userVO.delFlag,
		userId: userVO.userId
	}
	// console.log(params);
	return http.put(`${System.BASE}/user/update`, params);
};

/**
 * 删除用户
 */
export const deleteUser = (params: { id: number[] }) => {
	return http.delete(`${System.BASE}/user/${params.id}`);
};
