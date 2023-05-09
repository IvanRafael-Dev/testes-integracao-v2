import UserModel from '../../database/models/UserModel';
import ConflictError from '../../errors/conflict-error';
import NotFoundError from '../../errors/not-found-error';
import { User, UserWithId } from '../../service/interfaces/IUserService';
import IUserRepository from '../interface/IUserRepository';

export default class UserSequelizeRepository implements IUserRepository {
  constructor(private _userModel = UserModel) {}

  async getById(id: number): Promise<UserWithId> {
    const user = await this._userModel.findByPk(id)
    if (!user) throw new NotFoundError('usuário não encontrado')
    return user
  }

  // update

  async create(user: User): Promise<UserWithId> {
    const isUser = await this._userModel.findOne({ where: { email: user.email } });
    if (isUser) throw new ConflictError('Usuário já existe');
    return this._userModel.create(user);
  }
}
