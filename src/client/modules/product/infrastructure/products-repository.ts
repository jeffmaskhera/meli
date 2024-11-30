import {ProductsRepositoryInterface} from "../domain/products-repository.interface";
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {CategoriesProductModel, ProductModel} from "../domain/product-model";
import {switchCases} from "../../../../utils/helpers";

export class ProductsRepository implements ProductsRepositoryInterface {
    protected axiosInstance: AxiosInstance;

    constructor() {
        const config: AxiosRequestConfig = {
            baseURL: 'http://localhost:3000/api', // Base URL
        };
        this.axiosInstance = axios.create(config);
    }

    async searchPaginate(productName: string): Promise<{ products: ProductModel[]; categories: CategoriesProductModel[] }> {
        try {
            const response = await this.axiosInstance.get('/items', {
                params: { query: productName },
            });
            const productsResponse = response.data.items || [];
            const products = productsResponse.map((item: any)=> {
                return builderData(item)
            })

            const rawCategories = response.data.categories || [];
            const categories = rawCategories.reduce((acc: CategoriesProductModel[], categoryArray: any[]) => {
                const processed = categoryArray.map((item: any) => builderCategories(item));
                return [...acc, ...processed];
            }, []);
            return { products, categories };
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
        mainImage: product?.['picture'],
        price: product?.['price']?.['price'],
        priceFormat: product?.['price']?.['priceFormat'],
        title: product?.['title'] || "Unknown Product",
        sellerName: product?.['sellerName'] || "",
        quantitySold: product?.['soldQuantity'] || 0,
        attributes: {
            fullInfo: product?.['attributes']?.map((attr: any) => `${attr.name}: ${attr.value_name}`) || [],
        },
        query: product?.['query'] || "",
        freeShipping: product?.['free_shipping'] || false,
        // Parametros mockeados ya que el API no lo trae
        rating: 3.8,
        totalQualification: 456,
        positionInSales: 2,
        oldPrice: increaseBy40Percent(product?.['price']?.['amount']),
        thumbnailImages: thumbnailImages(product?.['pictures']),
        creditPrice: increaseBy30Percent(product?.['price']?.['amount'])
    }
}

const builderCategories = (product: any): CategoriesProductModel => {
    return {
        valueId: product?.id || 'N/A', // Si `id` no existe, asigna un valor predeterminado
        valueName: product?.value_name || 'Sin nombre', // Usa `value_name` en lugar de `condition`
    };
};

const determineCondition =(condition: string): string=> {
    return switchCases(condition, {
        'new': 'Nuevo',
        'used': 'Usado',
        'default': '',
    }) || '';
}

const thumbnailImages = (pictures: { url: string }[]): string[] => {
    if (!pictures || pictures.length === 0) return [];
    return pictures.map(picture => picture.url);
};

// función incrementar valor para simular precio antiguo
const increaseBy40Percent = (value: number): number => value * 1.4;

// función incrementar valor para simular crédito
const increaseBy30Percent = (value: number): number => value * 1.3;