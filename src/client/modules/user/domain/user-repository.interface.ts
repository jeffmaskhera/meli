import {UserModel} from "./user-model";


export interface UserRepositoryInterface {
    get(): Promise<UserModel>
}