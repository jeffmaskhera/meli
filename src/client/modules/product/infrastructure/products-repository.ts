import {ProductsRepositoryInterface} from "../domain/products-repository.interface";
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {ProductModel} from "../domain/product-model";
import {switchCases} from "../../../../utils/helpers";

export class ProductsRepository implements ProductsRepositoryInterface {
    protected axiosInstance: AxiosInstance;

    constructor() {
        const config: AxiosRequestConfig = {
            baseURL: 'http://localhost:3000/api', // Base URL
        };
        this.axiosInstance = axios.create(config);
    }

    async searchPaginate(productName: string): Promise<ProductModel[]> {
        try {
            const response = await this.axiosInstance.get('/items', {
                params: { query: productName },
            });
            const productsResponse = response.data.items || [];
            const products = productsResponse.map((item: any)=> {
                return builderData(item)
            })
            return products;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw new Error('Failed to fetch product data');
        }
    }

    async get(productId: string): Promise<ProductModel> {
        try {
            const response = await this.axiosInstance.get('/product', {
                params: { id: productId },
            });
            const productResponse = response.data.items[0] || {};
            return builderData(productResponse);
        } catch (error) {
            console.error('Error fetching product:', error);
            throw new Error('Failed to fetch product data');
        }
    }
}

const builderData =(product: any): ProductModel=> {
    return {
        id: product?.['id'],
        condition: determineCondition(product?.['condition']),
        image: product?.['picture'],
        price: product?.['price']?.['amount'] || '',
        title: product?.['title'] || "Unknown Product",
        sellerName: product?.['seller']?.['name'] || "Sin vendedor",
        quantitySold: product?.['sold_quantity'] || 0,
        attributes: product?.['attributes']?.map((attr: any) => `${attr.name}: ${attr.value}`) || [],
        query: product?.['query'] || "",
    }
}

const determineCondition =(condition: string): string=> {
    return switchCases(condition, {
        'new': 'Nuevo',
        'used': 'Usado',
        'default': '',
    }) || '';
}
