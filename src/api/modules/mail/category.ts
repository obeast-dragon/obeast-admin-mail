import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { Category } from "@/api/interface/mail/category";

/**
 * @name 获取前端菜单列表树
 */
export const categoryTree = () => {
    return http.get<Category.Entity[]>(`${Server.Admin}/menu/infos`, {
        headers: { noLoading: true }
    });
};
