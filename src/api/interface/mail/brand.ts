export namespace Brand {
    export interface Entity {
        brandId: number,
        name: string,
        logo: string,
        description: string,
        showStatus: number,
        firstLetter: string,
        sort: number
    }
    export interface BrandCategoryRels {
        id?: number;
        brandId: number;
        catelogId: number;
        catelogName: string;
        brandName: string;
    }
}
