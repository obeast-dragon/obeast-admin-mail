import { BaseEntity } from "../common";

export namespace SysFile {
    export interface Entity extends BaseEntity {
        id: number,
        fileName: string,
        original: string,
        bucketName: string,
        type: string,
        fileSize: string,
        delFlag: number
    }

}
