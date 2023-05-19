import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { Post } from "@/api/interface/admin/post";
import { ResPage } from "@/api/interface/common";

/**
 * 分页查询 岗位 table
 */
export const getPostPages = (params: Post.PageParams) => {
    return http.get<ResPage<Post.Res[]>>(`${Server.Admin}/post/page`, params);
};

/**
 * 查询 岗位 
 */
export const getPostList = () => {
    return http.get<Post.Res[]>(`${Server.Admin}/post/list`);
};

/**
 * 新增 岗位
 */
export const addPost = (params: any) => {
    return http.post(`${Server.Admin}/post/add`, params);
};

/**
 * 更新 岗位
 */
export const updatePost = (params: any) => {
    return http.put(`${Server.Admin}/post/update`, params);
};

/**
 * 删除 岗位
 */
export const deletePost = (params: { id: number[] }) => {
    return http.delete(`${Server.Admin}/post/${params.id}`);
};