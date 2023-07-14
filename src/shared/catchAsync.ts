import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (fn: RequestHandler) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      // res.status(400).json({
      //   success: false,
      //   err: error,
      // });
      next(error);
    }
  };
};

export default catchAsync;
