import Cookies from "js-cookie";
const TokenKey = "obeast-access-token";
const RefreshTokenKey = "obeast-refresh-token";
export function getToken() {
	return Cookies.get(TokenKey);
}

export function setToken(token: string) {
	return Cookies.set(TokenKey, token);
}

export function getRefreshToken() {
	return Cookies.get(RefreshTokenKey);
}

export function setRefreshToken(token: string) {
	return Cookies.set(RefreshTokenKey, token);
}

export function removeToken() {
	return Cookies.remove(TokenKey);
}

export function removeRefreshToken() {
	return Cookies.remove(RefreshTokenKey);
}
