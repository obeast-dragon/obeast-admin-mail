import { BaseEntity, ReqPage } from "../common";

export namespace Post {
	export interface Res extends BaseEntity {
		/**
		 * 岗位ID
		 */
		postId: number;

		/**
		 * 岗位编码
		 */
		postCode: string;

		/**
		 * 岗位名称
		 */
		postName: string;

		/**
		 * 岗位排序
		 */
		postSort: number;

		/**
		 * 是否删除 -1：已删除 0：正常
		 */
		delFlag: string;

		/**
		 * 备注信息
		 */
		remark: string;
	}
	export interface PageParams extends ReqPage {
		postName: string;
	}
}
