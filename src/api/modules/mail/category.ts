import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { Category } from "@/api/interface/mail/category";

/**
 * @name 获取 商品分类 树
 */
export const categoryTree = (params?: any) => {
    return http.get<Category.Entity[]>(`${Server.Product}/category/tree`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 新增商品分类
 */
export const addCategory = (params: Category.Entity) => {
    return http.post<boolean>(`${Server.Product}/category/add`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 修改商品分类
 */
export const updateCategory = (params: Category.Entity) => {
    return http.put<boolean>(`${Server.Product}/category/update`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 删除商品分类
 */
export const delCategory = (params: any) => {
    return http.delete<boolean>(`${Server.Product}/category/${params.id}`);
};
