import { NextFunction, Request, Response } from 'express';
import CustomError from '../models/customError';

// https://www.becomebetterprogrammer.com/how-to-use-error-handler-middleware-with-express-js-and-typescript/#How_to_Write_a_Custom_Error_Handler_in_Expressjs_using_TypeScript

function errorHandler(err: CustomError, _req: Request, res: Response, _next: NextFunction) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError('Server error. Please try again');
  }

  res.status((customError as CustomError).status).json(customError);
}

export default errorHandler;
