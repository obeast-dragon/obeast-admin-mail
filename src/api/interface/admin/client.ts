import { BaseEntity, ReqPage } from "../common";

export namespace Client {
    export interface Entity extends BaseEntity {
        /**
         * 客户端ID
         */
        clientId: string;

        /**
         * 客户端密钥
         */
        clientSecret: string;

        /**
         * 资源ID
         */
        resourceIds: string;

        /**
         * 作用域
         */
        scope: string;

        /**
         * 授权方式（A,B,C）
         */
        authorizedGrantTypes: string;

        /**
         * 回调地址
         */
        webServerRedirectUri: string;

        /**
         * 权限
         */
        authorities: string;

        /**
         * 请求令牌有效时间
         */
        accessTokenValidity: number;

        /**
         * 刷新令牌有效时间
         */
        refreshTokenValidity: number;

        /**
         * 扩展信息
         */
        additionalInformation: string;

        /**
         * 是否自动放行
         */
        autoapprove: string;
    }

    export interface PageParams extends ReqPage {
        clientId?: string;
    }
}