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
        id?: number,
        attrId: number,
        attrGroupId: number,
        attrSort: number
    }

}
