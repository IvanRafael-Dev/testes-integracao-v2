import { User, UserWithId } from '../../service/interfaces/IUserService';

export default interface IUserRepository {
  create(user: User): Promise<UserWithId>;
  getById(id: number): Promise<UserWithId>
}
