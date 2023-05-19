import { ReqPage } from "../common";

export namespace SysToken {
    export interface Entity {
        id: string,
        userId: string,
        clientId: string,
        username: string,
        accessToken: string,
        issuedAt: string,
        expiresAt: string
    }
    export interface PageParams extends ReqPage {
        username?: string;
    }
}