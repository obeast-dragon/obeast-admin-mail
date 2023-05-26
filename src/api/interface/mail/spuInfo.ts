export namespace SpuInfo {
    export interface Vo {
        spuName: string;
        spuDescription: string;
        categoryId: number;
        brandId: number;
        weight: number;
        publishStatus: number;
        descImgs: string[];
        goodsImgs: string[];
        bounds: Bounds;
        baseAttrs: [];
        skus: Sku[];
    }
    export interface Bounds {
        buyBounds: number;
        growBounds: number;
    }
    export interface Sku {
        attr: Attr[];
        skuName: string;
        price: number;
        skuTitle: string;
        skuSubtitle: string;
        images: Images[];
        descar: string[];
        fullCount: number;
        discount: number;
        countStatus: number;
        fullPrice: number;
        reducePrice: number;
        priceStatus: number;
        memberPrice: MemberPrice[];
    }
    export interface BaseAttrs {
        attrId: number;
        attrValues: string;
        showDesc: number;
    }
    export interface Attr {
        attrId: number;
        attrName: string;
        attrValue: string;
    }
    export interface Images {
        imgUrl: string;
        defaultImg: number;
    }
    export interface MemberPrice {
        id: number;
        name: string;
        price: number;
    }
}
