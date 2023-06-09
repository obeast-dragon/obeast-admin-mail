import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { ResPage } from "@/api/interface/common";
import { Brand } from "@/api/interface/mail/brand";

/**
 * @name 获取 查询 所有 品牌 
 */
export const brandList = () => {
    return http.get<Brand.Entity[]>(`${Server.Product}/brand/list`, {
        headers: { noLoading: true }
    });
};

/**
 * @name 获取 品牌 分页
 */
export const brandPages = (params?: any) => {
    return http.get<ResPage<Brand.Entity[]>>(`${Server.Product}/brand/page`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 新增品牌
 */
export const addBrand = (params: Brand.Entity) => {
    return http.post<boolean>(`${Server.Product}/brand/add`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 修改品牌
 */
export const updateBrand = (params: Brand.Entity) => {
    return http.put<boolean>(`${Server.Product}/brand/update`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 删除品牌
 */
export const delBrand = (params: any) => {
    return http.delete<boolean>(`${Server.Product}/brand/${params.id}`);
};

/**
 * @name 更新品牌管理属性
 */
export const updateCategoryBrandRel = (brandId: number, categoryBrandRels: Brand.BrandCategoryRels[]) => {
    let params = {
        brandId,
        categoryBrandRels: categoryBrandRels
    }
    return http.put<boolean>(`${Server.Product}/categoryBrandRel/updateRels`, params);
}

/**
 * @name 查询品牌管理属性
 */
export const listRelsByBrandId = (brandId: number) => {
    return http.get<Brand.BrandCategoryRels[]>(`${Server.Product}/categoryBrandRel/listRel`, { brandId }, {
        headers: { noLoading: true }
    });
}

/**
 * @name 查询品牌管理属性
 */
export const listRelsByCategoryId = (categoryId: number) => {
    return http.get<Brand.BrandCategoryRels[]>(`${Server.Product}/categoryBrandRel/listRel/category/${categoryId}`, {
        headers: { noLoading: true }
    });
}