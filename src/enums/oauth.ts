/**
 * Oauth2.1授权类型
 */
export enum GrantType {
	password = "password",
	app = "app",
	refreshToken = "refresh_token",
	authorizationCode = "authorization_code",
	clientCredentials = "client_credentials"
}

export enum Scope {
	server = "server"
}
