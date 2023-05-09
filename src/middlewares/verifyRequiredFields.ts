import { Request, Response, NextFunction } from 'express';
import MissingParamError from '../errors/missing-param-error';

const requestRequiredFields = {
  user: ['username', 'email', 'password'],
};

const verifyRequiredFields = (key: keyof typeof requestRequiredFields) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const requiredFields = requestRequiredFields[key];
    for (let i = 0; i < requiredFields.length; i += 1) {
      if (!req.body[requiredFields[i]]) {
        throw new MissingParamError(`${requiredFields[i]} é obrigatório`);
      }
    }
    next();
  };

export default verifyRequiredFields;
