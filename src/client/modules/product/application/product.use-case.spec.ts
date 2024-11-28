import {ProductsUseCase} from './products.use-case';
import {ProductsRepositoryInterface} from '../domain/products-repository.interface';
import {ProductModel} from '../domain/product-model';

describe('ProductsUseCase', () => {
    let productsUseCase: ProductsUseCase;
    let productRepositoryMock: jest.Mocked<ProductsRepositoryInterface>;

    beforeEach(() => {
        productRepositoryMock = {
            get: jest.fn().mockResolvedValue({} as ProductModel), // Mock de get
            searchPaginate: jest.fn().mockResolvedValue([] as ProductModel[]), // Mock de searchPaginate
        };

        // Creamos una instancia de ProductsUseCase con el mock
        productsUseCase = new ProductsUseCase(productRepositoryMock);
    });

    describe('searchPaginate', () => {
        it('should call productRepository.searchPaginate with the correct product name', async () => {
            const productName = 'Test Product';
            const mockResult: ProductModel[] = [{
                id: '1',
                condition: 'new',
                mainImage: 'image_url',
                price: 100,
                title: 'Test Product',
                sellerName: 'Test Seller',
                quantitySold: 50,
                attributes: { fullInfo: ['Red', 'Large'] },
                query: 'test-query',
                freeShipping: true,
            }];

            productRepositoryMock.searchPaginate.mockResolvedValue(mockResult);
            const result = await productsUseCase.searchPaginate(productName);
            expect(productRepositoryMock.searchPaginate).toHaveBeenCalledWith(productName);
            expect(result).toEqual(mockResult);
        });

        it('should return the correct products from searchPaginate', async () => {
            const productName = 'Test Product';
            const mockResult: ProductModel[] = [{
                id: '1',
                condition: 'new',
                mainImage: 'image_url',
                price: 100,
                title: 'Test Product',
                sellerName: 'Test Seller',
                quantitySold: 50,
                attributes: { fullInfo: ['Red', 'Large'] },
                query: 'test-query',
                freeShipping: true,
            }];

            productRepositoryMock.searchPaginate.mockResolvedValue(mockResult);
            const result = await productsUseCase.searchPaginate(productName);
            expect(result).toEqual(mockResult);
        });
    });

    describe('get', () => {
        it('should call productRepository.get with the correct productId', async () => {
            const productId = '1';
            const mockResult: ProductModel = {
                id: '1',
                condition: 'new',
                mainImage: 'image_url',
                price: 100,
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

        it('should return the correct product from get', async () => {
            const productId = '1';
            const mockResult: ProductModel = {
                id: '1',
                condition: 'new',
                mainImage: 'image_url',
                price: 100,
                title: 'Test Product',
                sellerName: 'Test Seller',
                quantitySold: 50,
                attributes: { fullInfo: ['Red', 'Large'] },
                query: 'test-query',
                freeShipping: true,
            };

            productRepositoryMock.get.mockResolvedValue(mockResult);
            const result = await productsUseCase.get(productId);
            expect(result).toEqual(mockResult);
        });
    });
});
