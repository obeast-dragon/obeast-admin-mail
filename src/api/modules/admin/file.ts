import http from "@/api";
import { Server } from "@/api/config/serviceName";
import { SysFile } from "@/api/interface/admin/file";
import { ResPage } from "@/api/interface/common";

/**
 * @name 文件上传模块
 * @param param file
 */
export const upload = (params: FormData) => {
    return http.post<SysFile.Entity>(`${Server.Admin}/sysFile/upload`, params);
};

/**
 * @name 文件上传模块
 * @param param file
 */
export const uploads = (params: FormData) => {
    return http.post<SysFile.Entity>(`${Server.Admin}/sysFile/uploads`, params);
};

/**
 * 分页查询 文件 table
 */
export const getFilePages = (params: any) => {
    return http.get<ResPage<SysFile.Entity[]>>(`${Server.Admin}/sysFile/page`, params);
};

/**
 * 分页查询 文件 table
 */
export const delFile = (params: any) => {
    return http.delete<boolean>(`${Server.Admin}/sysFile/${params.id}`);
};

/**
 * 获取文件url
 * @param params 
 * @returns 
 */
export const getFileUrl = (params: any) => {
    return http.get<string>(`${Server.Admin}/sysFile/online/${params.bucketName}/${params.fileName}`);
};