import { BaseEntity, ReqPage } from "../common";

export namespace SysDict {
    export interface Entity extends BaseEntity {
        id: string,
        dictKey: string,
        description: string,
        systemFlag: string,
        remark: string,
        delFlag: string
    }
    export interface PageParams extends ReqPage {
        name?: string;
    }
}
export namespace SysDictItem {
    export interface Entity extends BaseEntity {
        id: number,
        dictId: number,
        dictKey: string,
        value: string,
        label: string,
        type: string,
        description: string,
        sortOrder: number,
        remark: string,
        delFlag: string
    }
    export interface PageParams extends ReqPage {
        dictId?: number;
        dictKey?: string;
    }
}