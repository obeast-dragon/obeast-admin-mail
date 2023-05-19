import http from "@/api";
import { Login, User } from "@/api/interface/admin/user";
import { CLIENTID_AND_SECRET } from "@/config/constant";
import { Server } from "@/api/config/serviceName";
import qs from "qs";
import { GrantType, Scope } from "@/enums/oauth";
import { ResPage } from "@/api/interface/common";

/**
 * 分页查询用户table
 */
export const getUserPages = (params: User.UserPageParams) => {
	return http.get<ResPage<User.UserVO>>(`${Server.Admin}/user/page`, params);
};

/**
 * 查询用户 by token
 */
export const getUserVoByToken = () => {
	return http.get<User.UserVO>(`${Server.Admin}/user/info`, {
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
	return http.post(`${Server.Admin}/user/add`, params);
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
	return http.put(`${Server.Admin}/user/update`, params);
};

/**
 * 删除用户
 */
export const deleteUser = (params: { id: number[] }) => {
	return http.delete(`${Server.Admin}/user/${params.id}`);
};

/**
 * @name 登录模块
 */
export const loginByPassword = (params: Login.From, randomStr: string) => {
	const headers = {
		headers: {
			Authorization: "Basic " + window.btoa(CLIENTID_AND_SECRET)
		}
	};
	return http.postToken<Login.Result>(
		`${Server.Auth}/oauth2/token?randomStr=${randomStr}&code=${params.code}&grant_type=${GrantType.password}&scope=${Scope.server}`,
		qs.stringify({
			username: params.username,
			password: params.password
		}),
		headers
	);
};

/**
 * @name 用户退出登录
 */
export const logoutApi = () => {
	return http.delete(`${Server.Auth}/token/logout`);
};