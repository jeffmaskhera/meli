
export interface ProductModel {
    id: string;
    condition: string;
    mainImage: string;
    price: string;
    title: string;
    sellerName: string;
    quantitySold: number;
    attributes: attributesProduct;
    query: string;
    // SIMULANDO OTROS CAMPOS
    rating?: number;
    totalQualification?: number;
    positionInSales?: number;
    oldPrice?: number;
    thumbnailImages?: string[];
    creditPrice?: number;
}


interface attributesProduct {
    fullInfo: string[]
}