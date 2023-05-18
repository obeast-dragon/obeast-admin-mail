import { BaseEntity, ReqPage } from "./common";

export namespace Role {
	export interface Res extends BaseEntity {
		roleId: number;
		roleName: string;
		roleCode: string;
		roleDesc: string;
		delFlag: string;
		menuIds?: number[]
	}
	export interface PageParams extends ReqPage {
		roleName: string;
	}
}
