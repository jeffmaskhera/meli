import {UserModel} from "./user-model";


export interface UserRepositoryInterface {
    get(productId: string): Promise<UserModel>
}