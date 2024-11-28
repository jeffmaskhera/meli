import {UserUseCase} from './user.use-case';
import {UserRepositoryInterface} from '../domain/user-repository.interface';
import {UserModel} from '../domain/user-model';
import {TypePurchaseEnum} from "../domain/user-enum";

// Creamos un mock de UserRepositoryInterface
class MockUserRepository implements UserRepositoryInterface {
    get(): Promise<UserModel> {
        // Simulamos una respuesta que devuelve un UserModel
        return Promise.resolve({
            id: '123',
            numberCreditCard: 1234567890123456,
            typeBank: 'BankType',
            typePurchase: TypePurchaseEnum.CREDIT, // Asegúrate de que sea un valor válido de TypePurchaseEnum
        });
    }
}

describe('UserUseCase', () => {
    let userUseCase: UserUseCase;
    let userRepository: MockUserRepository;

    beforeEach(() => {
        userRepository = new MockUserRepository(); // Inicializamos el mock
        userUseCase = new UserUseCase(userRepository); // Creamos una instancia de UserUseCase
    });

    it('should return a user from the repository', async () => {
        const user = await userUseCase.get();
        expect(user).toBeDefined();
        expect(user.id).toBe('123');
        expect(user.numberCreditCard).toBe(1234567890123456);
        expect(user.typeBank).toBe('BankType');
        expect(user.typePurchase).toBe('credit');
    });

    it('should handle errors gracefully', async () => {
        userRepository.get = jest.fn().mockRejectedValue(new Error('Failed to fetch user'));
        try {
            await userUseCase.get();
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toBe('Failed to fetch user');
            } else {
                throw error;
            }
        }
    });
});