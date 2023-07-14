import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AuthService.createUser(userData);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'User is created successfully',
    data: result,
  });
});

export const AuthController = {
  createUser,
};
