// Tipos para los parámetros y respuesta

export interface QueryParamsInterface {
    query: string;
    id?: string;
}

export interface PriceInterface {
    currency: string;
    amount: number;
    decimals: number;
}

export interface ItemsInterface {
    id: string;
    query: string;
    title: string;
    picture: string;
    price: PriceInterface;
    condition: string;
    free_shipping: boolean;
    sellerName: string;
    attributes: any[];
}

export interface ApiResponseItemsInterface {
    author: {
        name: string;
        lastname: string;
    };
    items: ItemsInterface[];
}

export interface ProductInterface {
    id: string;
    query: string;
    title: string;
    picture: string;
    pictures: [];
    price: PriceInterface;
    condition: string;
    free_shipping: boolean;
    sellerName: string;
    attributes: any[];
    soldQuantity: number;
    status: string
}

export interface ApiResponseProductInterface {
    author: {
        name: string;
        lastname: string;
    };
    items: ProductInterface[];
}