import { User } from '../../../service/interfaces/IUserService';

export default interface IUserValidations {
  validateUsername(username: string): void
  validateEmail(email: string): void
  validatePassword(password: string): void
  validateUser(user: User): void
}
