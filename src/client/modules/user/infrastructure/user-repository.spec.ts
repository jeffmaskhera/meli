import {UserRepository} from './user-repository';
import {UserModel} from '../domain/user-model';

describe('UserRepository', () => {
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
    });

    it('should return a user with the expected data', async () => {
        const result: UserModel = await userRepository.get();

        expect(result).toBeDefined();
        expect(result.id).toBe('123');
        expect(result.numberCreditCard).toBe(6789);
        expect(result.typeBank).toBe('Dinner');
        expect(result.typePurchase).toBeUndefined();
    });
});
