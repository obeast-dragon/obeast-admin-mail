import { BaseEntity, ReqPage } from "./common";

export namespace Log {
    export interface Entity extends BaseEntity {
        id: string,
        type: string,
        title: string,
        remoteAddr: string,
        userAgent: string,
        requestUri: string,
        method: string,
        params: string,
        time: string,
        exception: string,
        serviceId: string,
        delFlag: string
    }
    export interface PageParams extends ReqPage {
        roleName?: string;
    }
}
