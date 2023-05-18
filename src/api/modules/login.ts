import { Auth } from "@/api/config/serviceName";
import qs from "qs";
import http from "@/api";
import { Login } from "../interface/user";
import { CLIENTID_AND_SECRET } from "@/config/constant";
import { GrantType, Scope } from "@/enums/oauth";
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
		`${Auth.BASE}/oauth2/token?randomStr=${randomStr}&code=${params.code}&grant_type=${GrantType.password}&scope=${Scope.server}`,
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
	return http.delete(`${Auth.BASE}/token/logout`);
};
