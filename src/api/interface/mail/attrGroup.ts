import { MailAttr } from "./attr";

export namespace MailAttrGroup {
    export interface Entity {
        attrGroupId: number,
        attrGroupName: string,
        sort: number,
        descript: string,
        icon: string,
        catelogId: number
    }
    export interface AttrAttrGroupRels {
        id?: number;
        attrId: number;
        attrGroupId: number;
        attrSort: number;
    }
    export interface AttrAttrGroupRelsDTO extends AttrAttrGroupRels {
        /**
         * 属性名
         */
        attrName: string;
        /**
         * 可选值列表[用逗号分隔]
         */
        valueSelect: string;
    }
    export interface AttrGroupDTO {
        attrGroup: MailAttrGroup.Entity;
        attrs: MailAttr.Entity[];
    }

}
