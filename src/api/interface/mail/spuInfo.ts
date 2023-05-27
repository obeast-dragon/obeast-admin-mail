export namespace SpuInfo {
    export interface Entity {
        /**
         * 商品id
         */
        id: number;
        /**
         * 商品名称
         */
        spuName: string;
        /**
         * 商品描述
         */
        spuDescription: string;
        /**
         * 所属分类id
         */
        categoryId: number;
        /**
         * 品牌id
         */
        brandId: number;
        /**
         * 
         */
        weight: number;

        /**
         * 上架状态[0 - 下架，1 - 上架]
         */
        publishStatus: number;
        createTime: string;
        updateTime: string;
    }
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
        baseAttrs: BaseAttrs[];
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
        skuDesc: string;
        discount: number;
        countStatus: number;
        fullPrice: number;
        reducePrice: number;
        priceStatus: number;
        memberPrice: MemberPrice[];
    }
    export interface BaseAttrs {
        attrId: number;
        attrValue: string;
        showDesc: number;
        attrSort: number;
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
