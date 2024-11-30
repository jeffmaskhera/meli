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
            price: { price: 1000, priceFormat: '1.000' },
            title: 'Product 1',
            sellerName: 'Seller 1',
            soldQuantity: 10,
            attributes: [{ name: 'color', value_name: 'red' }],
            query: 'Product query',
            free_shipping: true,
            pictures: [{ url: 'http://thumbnail.url' }],
        }
    ],
    categories: [
        [
            { id: '1', value_name: 'Category 1' },
            { id: '2', value_name: 'Category 2' },
        ]
    ]
};

describe('ProductsRepository', () => {
    let repository: ProductsRepository;
    let mockAxios: axiosMockAdapter;
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        // Espejeamos el console.error para que no imprima nada durante las pruebas
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        // Creamos una instancia del mock para cada test
        mockAxios = new axiosMockAdapter(axios);
        repository = new ProductsRepository();
    });

    afterEach(() => {
        // Resetear mocks después de cada prueba
        mockAxios.reset();
        consoleSpy.mockRestore();
    });


    it('should return products and categories when searchPaginate is called', async () => {
        // Mockeamos la respuesta de la API
        mockAxios.onGet('/items').reply(200, mockProductData);
        const { products, categories } = await repository.searchPaginate('Product 1');

        // Verificar productos
        expect(products).toHaveLength(1);
        expect(products[0]).toHaveProperty('id', '1');
        expect(products[0]).toHaveProperty('title', 'Product 1');
        expect(products[0].condition).toBe('Nuevo');
        expect(products[0].price).toBe(1000);
        expect(products[0].priceFormat).toBe('1.000');
        expect(products[0].thumbnailImages).toEqual(['http://thumbnail.url']);

        // Verificar categorías
        expect(categories).toHaveLength(2);
        expect(categories[0]).toHaveProperty('valueId', '1');
        expect(categories[0]).toHaveProperty('valueName', 'Category 1');
        expect(categories[1]).toHaveProperty('valueId', '2');
        expect(categories[1]).toHaveProperty('valueName', 'Category 2');
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
                    price: { price: 1000, priceFormat: '1.000' },
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
        expect(product.price).toBe(1000);
        expect(product.priceFormat).toBe('1.000');
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