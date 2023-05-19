export namespace Category {
    export interface Entity {
        id: number;
        parentId: number;
        weight: number;
        name: string;
        icon: string;
        showStatus: number;
        productUnit: string;
        productCount: number;
        catLevel: number;
        children: Category.Entity[];
    }

}
