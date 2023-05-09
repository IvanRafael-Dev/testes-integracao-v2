import IUserRepository from '../repositories/interface/IUserRepository';
import IUserValidations from '../validations/user/interface/user-validations';
import IUserService, { User, UserWithId } from './interfaces/IUserService';

export default class UserService implements IUserService {
  private _userValidations: IUserValidations;
  private _userRepository: IUserRepository;

  constructor(userValidations: IUserValidations, userRepository: IUserRepository) {
    this._userValidations = userValidations;
    this._userRepository = userRepository;
  }

  async getById(requestedId: number): Promise<Omit<UserWithId, 'password'>> {
    const user = await this._userRepository.getById(requestedId);
    const { username, email, id } = user;
    return { id, username, email };
  }

  async create(user: User): Promise<Omit<UserWithId, 'password'>> {
    this._userValidations.validateUser(user);
    const userWithId = await this._userRepository.create(user);
    const { username, email, id } = userWithId;
    return { id, username, email };
  }
}
