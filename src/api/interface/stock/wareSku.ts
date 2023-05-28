export namespace WareSku {
    export interface Entity {
        id?: number;
        skuId?: number;
        wareId?: number;
        stock?: number;
        skuName?: string;
        stockLocked?: number;
    }
}
