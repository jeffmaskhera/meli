import {UserRepository} from "./user-repository";
import {UserUseCase} from "../application/user.use-case";


const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);

export { userUseCase }