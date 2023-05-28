export namespace SkuInfo {
    export interface Entity {
        skuId: number;
        spuId: number;
        skuName: string;
        skuDesc: string;
        categoryId: number;
        brandId: number;
        skuDefaultImg: string;
        skuTitle: string;
        skuSubtitle: string;
        price: number;
        saleCount: number;
    }
}