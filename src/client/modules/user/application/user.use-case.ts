import {UserRepositoryInterface} from "../domain/user-repository.interface";


export class UserUseCase {
    constructor(private userRepository: UserRepositoryInterface) {
    }

    async get() {
        return await this.userRepository.get()
    }
}