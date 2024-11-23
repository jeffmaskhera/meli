import {ProductsRepositoryInterface} from "../domain/products-repository.interface";

export class ProductsUseCase {
    constructor(private productRepository: ProductsRepositoryInterface) {
    }

    async searchPaginate(productName: string) {
        return await this.productRepository.searchPaginate(productName)
    }

    async get(productId: string) {
        return await this.productRepository.get(productId)
    }
}