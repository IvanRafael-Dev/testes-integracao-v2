import InvalidParamError from '../../errors/invalid-param-error';
import { User } from '../../service/interfaces/IUserService';
import IUserValidations from './interface/user-validations';

export default class UserValidations implements IUserValidations {
  validateUsername = (username: string): void => {
    if (username.length <= 3) {
      throw new InvalidParamError('username precisa ter mais que 3 caracteres');
    }
  };

  validateEmail = (email: string): void => {
    const emailValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailValidation.test(email)) {
      throw new InvalidParamError('email deve ser um email válido');
    }
  };

  validatePassword = (password: string): void => {
    if (password.length < 6) {
      throw new InvalidParamError('password deve ter ao menos 6 caracteres');
    }
  };

  validateUser(user: User): void {
    this.validateUsername(user.username);
    this.validateEmail(user.email);
    this.validatePassword(user.password);
  }
}
