// Tipos para los parámetros y respuesta

export interface QueryParamsInterface {
    query: string;
    id?: string;
}

export interface PriceInterface {
    currency: string;
    amount: number;
    decimal: number;
    price: number;
    priceFormat: string;
}

export interface ApiResponseItemsInterface {
    author: {
        name: string;
        lastname: string;
    };
    categories: any;
    items: ProductInterface[];
}

export interface ProductInterface {
    id: string;
    query: string;
    title: string;
    picture: string;
    price: PriceInterface;
    condition: string;
    free_shipping: boolean;
    sellerName: string;
    attributes: any[];
    pictures?: [];
    soldQuantity?: number;
    status?: string
}

export interface ApiResponseProductInterface {
    author: {
        name: string;
        lastname: string;
    };
    items: ProductInterface[];
}