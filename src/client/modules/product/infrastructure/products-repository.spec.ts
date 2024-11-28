import {ProductsRepository} from "./products-repository";
import axios from "axios";
import axiosMockAdapter from "axios-mock-adapter";

// Mock de los datos
const mockProductData = {
    items: [
        {
            id: '1',
            condition: 'new',
            picture: 'http://image.url',
            price: { amount: 100 },
            title: 'Product 1',
            sellerName: 'Seller 1',
            soldQuantity: 10,
            attributes: [{ name: 'color', value_name: 'red' }],
            query: 'Product query',
            free_shipping: true,
            pictures: [{ url: 'http://thumbnail.url' }],
        }
    ]
};

describe('ProductsRepository', () => {
    let repository: ProductsRepository;
    let mockAxios: axiosMockAdapter;

    beforeEach(() => {
        // Creamos una instancia del mock para cada test
        mockAxios = new axiosMockAdapter(axios);
        repository = new ProductsRepository();
    });

    afterEach(() => {
        // Resetear mocks después de cada prueba
        mockAxios.reset();
    });

    it('should return a list of products when searchPaginate is called', async () => {
        // Mockeamos la respuesta de la API
        mockAxios.onGet('/items').reply(200, mockProductData);

        const products = await repository.searchPaginate('Product 1');

        expect(products).toHaveLength(1);
        expect(products[0]).toHaveProperty('id', '1');
        expect(products[0]).toHaveProperty('title', 'Product 1');
        expect(products[0].condition).toBe('Nuevo');
        expect(products[0].price).toBe(100);
        expect(products[0].thumbnailImages).toEqual(['http://thumbnail.url']);
    });

    it('should handle errors gracefully in searchPaginate', async () => {
        // Simulamos un error en la respuesta
        mockAxios.onGet('/items').reply(500);

        try {
            await repository.searchPaginate('Product 1');
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toBe('Failed to fetch product data');
            } else {
                throw new Error('Unexpected error type');
            }
        }
    });

    it('should return a single product when get is called', async () => {
        const mockProductDetail = {
            items: [
                {
                    id: '1',
                    condition: 'new',
                    picture: 'http://image.url',
                    price: { amount: 200 },
                    title: 'Product Detail',
                    sellerName: 'Seller 1',
                    soldQuantity: 20,
                    attributes: [{ name: 'size', value_name: 'large' }],
                    query: 'Product Detail query',
                    free_shipping: true,
                    pictures: [{ url: 'http://detail-image.url' }],
                }
            ]
        };

        mockAxios.onGet('/product').reply(200, mockProductDetail);

        const product = await repository.get('1');
        expect(product).toHaveProperty('id', '1');
        expect(product).toHaveProperty('title', 'Product Detail');
        expect(product.condition).toBe('Nuevo');
        expect(product.price).toBe(200);
        expect(product.thumbnailImages).toEqual(['http://detail-image.url']);
    });

    it('should handle errors gracefully in get', async () => {
        mockAxios.onGet('/product').reply(500);
        try {
            await repository.get('1');
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toBe('Failed to fetch product data');
            } else {
                throw new Error('Unexpected error type');
            }
        }
    });
});