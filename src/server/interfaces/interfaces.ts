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

export interface ItemInterface {
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

export interface ApiResponseInterface {
    author: {
        name: string;
        lastname: string;
    };
    items: ItemInterface[];
}