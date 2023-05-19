import { BaseEntity, ReqPage } from "../common";

export namespace Menu {
    export interface Entity {
        menuId: string;
        parentId: string;
        weight: number;
        name: string;
        path: string;
        keepAlive: string;
        sortOrder: number;
        icon: string;
        permission: string;
        label: string;
        type: string;
        isLink?: string;
        isHide: boolean;
        isFull: boolean;
        isAffix: boolean;
        children?: Entity[];
    }
    /**
     * @description 动态路由参数配置简介 📚
     * @param path ==> 菜单路径
     * @param name ==> 菜单别名
     * @param redirect ==> 重定向地址
     * @param component ==> 视图文件路径
     * @param meta ==> 菜单信息
     * @param meta.icon ==> 菜单图标
     * @param meta.title ==> 菜单标题
     * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
     * @param meta.isLink ==> 是否外链
     * @param meta.isHide ==> 是否隐藏
     * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
     * @param meta.isAffix ==> 是否固定在 tabs nav
     * @param meta.isKeepAlive ==> 是否缓存
     * */
    export interface MenuOptions {
        path: string;
        name: string;
        component?: string | (() => Promise<any>);
        redirect?: string;
        meta: MetaProps;
        children?: MenuOptions[];
    }
    export interface MetaProps {
        icon: string;
        title: string;
        activeMenu?: string;
        isLink?: string;
        isHide: boolean;
        isFull: boolean;
        isAffix: boolean;
        isKeepAlive: boolean;
    }
    export interface Res extends BaseEntity {
        menuId: number;
        parentId: string;
        weight: number;
        name: string;
        path: string;
        keepAlive: string;
        sortOrder: number,
        icon: string;
        permission: string;
        label: string;
        type: string;
        delFlag: string;
        children: Res[];
    }
    export interface MenuPageParams extends ReqPage {
        lazy: boolean;
        menuName?: string;
    }
}
