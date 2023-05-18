import http from "@/api";
import { System } from "../config/serviceName";
import { SysFile } from "../interface/file";
import { ResPage } from "../interface/common";

/**
 * @name 文件上传模块
 * @param param file
 */
export const upload = (params: FormData) => {
    return http.post<SysFile.Entity>(`${System.BASE}/sysFile/upload`, params);
};

/**
 * 分页查询 文件 table
 */
export const getFilePages = (params: any) => {
    return http.get<ResPage<SysFile.Entity[]>>(`${System.BASE}/sysFile/page`, params);
};

/**
 * 分页查询 文件 table
 */
export const delFile = (params: any) => {
    return http.delete<boolean>(`${System.BASE}/sysFile/${params.id}`);
};

/**
 * 获取文件url
 * @param params 
 * @returns 
 */
export const getFileUrl = (params: any) => {
    return http.get<string>(`${System.BASE}/sysFile/online/${params.bucketName}/${params.fileName}`);
};