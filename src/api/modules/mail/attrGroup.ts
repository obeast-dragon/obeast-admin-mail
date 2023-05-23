import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { ResPage } from "@/api/interface/common";
import { MailAttrGroup } from "@/api/interface/mail/attrGroup";

/**
 * @name 获取 规格属性分组 分页
 */
export const attrGroupPages = (params?: any) => {
    return http.get<ResPage<MailAttrGroup.Entity[]>>(`${Server.Product}/attrGroup/page`, params);
};

/**
 * @name 新增规格属性分组
 */
export const addAttrGroup = (params: MailAttrGroup.Entity) => {
    return http.post<boolean>(`${Server.Product}/attrGroup/add`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 修改规格属性分组``
 */
export const updateAttrGroup = (params: MailAttrGroup.Entity) => {
    return http.put<boolean>(`${Server.Product}/attrGroup/update`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 删除规格属性分组
 */
export const delAttrGroup = (params: any) => {
    return http.delete<boolean>(`${Server.Product}/attrGroup/${params.id}`);
};

/**
 * @name 更新属性属性分组关联
 */
export const updateAttrAttrGroupRel = (attrGroupId: number, categoryBrandRels: MailAttrGroup.AttrAttrGroupRels[]) => {
    let params = {
        attrGroupId,
        categoryBrandRels: categoryBrandRels
    }
    return http.put<boolean>(`${Server.Product}/attrAttrGroupRel/updateRels`, params);
}

/**
 * @name 查询属性属性分组关联
 */
export const listRelsByAttrGroupId = (attrGroupId: number) => {
    return http.get<MailAttrGroup.AttrAttrGroupRels[]>(`${Server.Product}/attrAttrGroupRel/listRel`, { attrGroupId }, {
        headers: { noLoading: true }
    });
}
