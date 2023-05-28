export namespace Purchase {
    export interface Entity {
        id?: number;
        assigneeId?: number;
        assigneeName?: string;
        phone?: string;
        priority?: number;
        status?: number;
        wareId?: number;
        amount?: number;
        createTime?: string;
        updateTime?: string;
    }
    export interface Demand {
        id?: number;
        purchaseId?: number;
        skuId?: number;
        skuNum?: number;
        skuPrice?: number;
        wareId?: number;
        status?: number; //状态[0新建，1已分配，2正在采购，3已完成，4采购失败]
    }
}
