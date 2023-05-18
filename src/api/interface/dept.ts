import { ReqPage } from "./common";

export namespace Department {
	export interface Entity {
		deptId: number;

		/**
		 * 部门名称
		 */
		name: string;

		/**
		 * 排序
		 */
		sortOrder: number;

		/**
		 * 父级部门id
		 */
		parentId: number;

		/**
		 * 是否删除 -1：已删除 0：正常
		 */
		delFlag?: string;
	}
	export interface Res {
		/**
		 * Id
		 */
		id: number;
		/**
		 * 父级部门id
		 */
		parentId: number;
		/**
		 * 部门名称
		 */
		name: string;
		/**
		 * weight
		 */
		weight?: string;
		/**
		 * 创建时间
		 */
		createTime?: string;
		/**
		 * 排序
		 */
		sortOrder: number;
		/**
		 * 儿子
		 */
		children: Res[];
	}
	export interface DeptPageParams extends ReqPage {
		deptName?: string;
	}
}
