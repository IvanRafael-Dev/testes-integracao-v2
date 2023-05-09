import { Request, Response, NextFunction } from 'express';
import IUserService from '../service/interfaces/IUserService';
import IUserController from './interfaces/user-controller';

export default class UserController implements IUserController {
  private _userService: IUserService;

  constructor(userService: IUserService) {
    this._userService = userService;
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user = await this._userService.getById(+req.params.id)
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const newUser = await this._userService.create(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
}
