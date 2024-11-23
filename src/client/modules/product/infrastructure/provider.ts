import {ProductsRepository} from "./products-repository";
import {ProductsUseCase} from "../application/products.use-case";


const productRepository = new ProductsRepository();
const productUseCase = new ProductsUseCase(productRepository);

export { productUseCase }