import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { ResPage } from "@/api/interface/common";
import { MemberLevel } from "@/api/interface/vip/memberLevel";

/**
 * @name 获取 会员等级 分页
 */
export const memberLevelPages = (params?: any) => {
    return http.get<ResPage<MemberLevel.Entity[]>>(`${Server.Member}/memberLevel/page`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 新增会员等级
 */
export const addMemberLevel = (params: MemberLevel.Entity) => {
    return http.post<boolean>(`${Server.Member}/memberLevel/add`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 修改会员等级
 */
export const updateMemberLevel = (params: MemberLevel.Entity) => {
    return http.put<boolean>(`${Server.Member}/memberLevel/update`, params, {
        headers: { noLoading: true }
    });
};

/**
 * @name 删除会员等级
 */
export const delMemberLevel = (params: any) => {
    return http.delete<boolean>(`${Server.Member}/memberLevel/${params.id}`);
};

/**
 * @name 获取 会员等级 
 */
export const memberLevelList = () => {
    return http.get<MemberLevel.Entity[]>(`${Server.Member}/memberLevel/list`, {
        headers: { noLoading: true }
    });
};