import {UserRepositoryInterface} from "../domain/user-repository.interface";
import {UserModel} from "../domain/user-model";

export class UserRepository implements UserRepositoryInterface {

    async get(): Promise<UserModel> {
        return muckData()
    }
}

const muckData =(): UserModel=> {
    return {
        id: '123',
        numberCreditCard: 6789,
        typeBank: 'Dinner'
    }
}