import {ProductsUseCase} from './products.use-case';
import {ProductsRepositoryInterface} from '../domain/products-repository.interface';
import {CategoriesProductModel, ProductModel} from '../domain/product-model';

describe('ProductsUseCase', () => {
    let productsUseCase: ProductsUseCase;
    let productRepositoryMock: jest.Mocked<ProductsRepositoryInterface>;

    beforeEach(() => {
        productRepositoryMock = {
            get: jest.fn().mockResolvedValue({} as ProductModel),
            // Simulamos el objeto con las propiedades products y categories
            searchPaginate: jest.fn().mockResolvedValue({
                products: [] as ProductModel[],
                categories: [] as CategoriesProductModel[],
            }),
        };
        productsUseCase = new ProductsUseCase(productRepositoryMock);
    });

    describe('searchPaginate', () => {
        it('should call productRepository.searchPaginate with the correct product name and return results', async () => {
            const productName = 'Test Product';
            const mockResult = {
                products: [{
                    id: '1',
                    condition: 'new',
                    mainImage: 'image_url',
                    price: 100,
                    priceFormat: '1000',
                    title: 'Test Product',
                    sellerName: 'Test Seller',
                    quantitySold: 50,
                    attributes: { fullInfo: ['Red', 'Large'] },
                    query: 'test-query',
                    freeShipping: true,
                }] as ProductModel[],
                categories: [] as CategoriesProductModel[],
            };

            productRepositoryMock.searchPaginate.mockResolvedValue(mockResult);
            const result = await productsUseCase.searchPaginate(productName);

            expect(productRepositoryMock.searchPaginate).toHaveBeenCalledWith(productName);
            expect(result).toEqual(mockResult);
        });
    });

    describe('get', () => {
        it('should call productRepository.get with the correct productId and return the product', async () => {
            const productId = '1';
            const mockResult: ProductModel = {
                id: '1',
                condition: 'new',
                mainImage: 'image_url',
                price: 100,
                priceFormat: '1000',
                title: 'Test Product',
                sellerName: 'Test Seller',
                quantitySold: 50,
                attributes: { fullInfo: ['Red', 'Large'] },
                query: 'test-query',
                freeShipping: true,
            };

            productRepositoryMock.get.mockResolvedValue(mockResult);
            const result = await productsUseCase.get(productId);

            expect(productRepositoryMock.get).toHaveBeenCalledWith(productId);
            expect(result).toEqual(mockResult);
        });
    });
});
