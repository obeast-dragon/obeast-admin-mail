import { defineStore } from "pinia";
import { AuthState } from "@/stores/interface";
import { getMenuList } from "@/api/modules/menu";
import { getAllBreadcrumbList, getFlatArr, getShowMenuList } from "@/utils/menu";

// AuthStore
export const AuthStore = defineStore({
	id: "AuthState",
	state: (): AuthState => ({
		// 当前页面的 router name，用来做按钮权限筛选
		routeName: "",
		// 菜单权限列表
		authMenuList: []
	}),
	getters: {
		// 后端返回的菜单列表 ==> 这里没有经过任何处理
		authMenuListGet: state => {
			return state.authMenuList;
		},
		// 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
		showMenuListGet: state => {
			let data = getShowMenuList(state.authMenuList);
			return data;
		},
		// 扁平化之后的一维数组路由，主要用来添加动态路由
		flatMenuListGet: state => {
			let data = getFlatArr(state.authMenuList);
			return data;
		},
		// 所有面包屑导航列表
		breadcrumbListGet: state => {
			let data = getAllBreadcrumbList(state.authMenuList);
			return data;
		}
	},
	actions: {
		// getAuthMenuList
		async getAuthMenuList() {
			const { data } = await getMenuList();
			this.authMenuList = data;
		},
		// setRouteName
		async setRouteName(name: string) {
			this.routeName = name;
		}
	}
});
