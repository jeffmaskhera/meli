import {CategoriesProductModel, ProductModel} from "./product-model";


export interface ProductsRepositoryInterface {
    get(productId: string): Promise<ProductModel>
    searchPaginate(productName: string): Promise<{ products: ProductModel[]; categories: CategoriesProductModel[] }>
}