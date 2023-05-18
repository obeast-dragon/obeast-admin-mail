// * 请求响应参数(不包含data)
export interface Result {
	code: string;
	msg: string;
	success: boolean;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T;
}

// * 分页响应参数
export interface ResPage<T> {
	records: T[];
	current: number;
	size: number;
	total: number;
	orders: OrderItem[];
	optimizeCountSql: boolean;
	searchCount: boolean;
	maxLimit: number;
	countId: string;
	pages: number;
}

/**
 * 响应共有参数
 */
export interface BaseEntity {
	createBy: string;
	createTime: string;
	updateBy: string;
	updateTime: string;
}

// * 分页请求参数
export interface ReqPage {
	current?: number;
	size?: number;
}
export interface OrderItem {
	column: string;
	asc: boolean;
}

// 验证码
export interface VerificationCode {
	key: string;
	img: string;
	len?: number;
}
