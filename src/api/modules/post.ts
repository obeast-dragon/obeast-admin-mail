import http from "@/api";
import { System } from "../config/serviceName";
import { ResPage } from "../interface/common";
import { Post } from "../interface/post";

/**
 * 分页查询 岗位 table
 */
export const getPostPages = (params: Post.PageParams) => {
    return http.get<ResPage<Post.Res[]>>(`${System.BASE}/post/page`, params);
};

/**
 * 查询 岗位 
 */
export const getPostList = () => {
    return http.get<Post.Res[]>(`${System.BASE}/post/list`);
};

/**
 * 新增 岗位
 */
export const addPost = (params: any) => {
    return http.post(`${System.BASE}/post/add`, params);
};

/**
 * 更新 岗位
 */
export const updatePost = (params: any) => {
    return http.put(`${System.BASE}/post/update`, params);
};

/**
 * 删除 岗位
 */
export const deletePost = (params: { id: number[] }) => {
    return http.delete(`${System.BASE}/post/${params.id}`);
};