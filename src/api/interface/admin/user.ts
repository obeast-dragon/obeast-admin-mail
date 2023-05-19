import { ReqPage } from "../common";
import { Post } from "./post";
import { Role } from "./role";

// * 登录模块
export namespace Login {
	export interface Params {
		username: string;
		password: string;
	}
	export interface From extends Params {
		code: string;
	}
	export interface Result {
		sub: string;
		clientId: string;
		iss: string;
		token_type: string;
		access_token: string;
		refresh_token: string;
		aud: string;
		license: string;
		nbf: string;
		user_info: LoginInfo;
		scope: string;
		exp: string;
		expires_in: string;
		iat: string;
		jti: string;
	}
	export interface ResAuthButtons {
		[key: string]: string[];
	}
	export interface LoginInfo {
		password?: string;
		username?: string;
		authorities?: Authority[];
		accountNonExpired?: boolean;
		accountNonLocked?: boolean;
		credentialsNonExpired?: boolean;
		enabled?: boolean;
		attributes?: [];
		id?: string;
		deptId?: string;
		phone?: string;
		name?: string;
		avatar?: string;
		email?: string;
	}
	export interface Authority {
		authority: string;
	}
}
// * 用户管理模块
export namespace User {
	export interface Entity {
		/**
		 * 主键ID
		 */
		userId: number;
		/**
		 * 手机号
		 */
		name: string;
		/**
		 * 头像
		 */
		nickName: string;
		/**
		 * 用户名
		 */
		username: string;
		/**
		 * 密码
		 */
		password: string;
		/**
		 * 随机盐
		 */
		salt?: string;
		/**
		 * 锁定标记
		 */
		lockFlag?: string;
		/**
		 * 手机号
		 */
		phone?: string;
		/**
		 * 头像
		 */
		avatar?: string;
		/**
		 * 头像
		 */
		email: string;
		/**
		 * 部门ID
		 */
		deptId: number;
		/**
		 * 0-正常，1-删除
		 */
		delFlag: string;
	}
	export interface UserVO {
		/**
		 * 主键ID
		 */
		userId: number;

		/**
		 * 用户名
		 */
		username: string;

		/**
		 * 密码
		 */
		password: string;

		/**
		 * 创建时间
		 */
		createTime: string;

		/**
		 * 修改时间
		 */
		updateTime: string;

		/**
		 * 0-正常，1-删除
		 */
		delFlag: string;

		/**
		 * 锁定标记
		 */
		lockFlag: string;

		/**
		 * 手机
		 */
		phone: string;

		/**
		 * 头像
		 */
		avatar: string;

		/**
		 * 姓名
		 */
		name: string;

		/**
		 * 昵称
		 */
		nickName: string;

		/**
		 * 头像
		 */
		email: string;

		/**
		 * 部门ID
		 */
		deptId: number;

		/**
		 * 部门名称
		 */
		deptName: string;

		/**
		 * 角色列表
		 */
		roleList: Role.Res[];

		/**
		 * 岗位列表
		 */
		postList: Post.Res[];
	}

	export interface UserPageParams extends ReqPage {
		deptId?: number;
		name?: string;
		phone?: string;
	}

	export interface UserAddParams extends User.Entity {
		/**
		 * 角色ID
		 */
		roleList?: number[];

		/**
		 * 岗位ID
		 */
		postList?: number[];

		/**
		 * 新密码
		 */
		newpassword1?: string;

		/**
		 * 验证码
		 */
		code?: string;
	}

	// ---------------------------------------------------------------------------

	export interface ReqUserParams extends ReqPage {
		username: string;
		gender: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string[];
		status: number;
	}
	export interface ResUserList {
		userId: string;
		username: string;
		gender: number;
		user: {
			detail: {
				age: number;
			};
		};
		idCard: string;
		email: string;
		address: string;
		createTime: string;
		status: number;
		avatar: string;
		photo: any[];
		children?: ResUserList[];
	}
	export interface ResStatus {
		userLabel: string;
		userValue: number;
	}
	export interface ResGender {
		genderLabel: string;
		genderValue: number;
	}
	export interface ResDepartment {
		id: string;
		name: string;
		children?: ResDepartment[];
	}
	export interface ResRole {
		id: string;
		name: string;
		children?: ResDepartment[];
	}
}
