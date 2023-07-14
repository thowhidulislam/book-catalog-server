/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { User } from '../user/user.model';
import { IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AuthService.createUser(userData);

  const { password, ...others } = result;

  const resultWithoutPassword = await User.findById({
    _id: result._id,
  });

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'User is created successfully',
    data: resultWithoutPassword,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;

  const result = await AuthService.loginUser(userData);

  const { refreshToken, ...others } = result;

  const options = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, options);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'User is logged in successfully',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  const options = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, options);

  sendResponse<IRefreshTokenResponse>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Token is refreshed successfully',
    data: result,
  });
});

export const AuthController = {
  createUser,
  loginUser,
  refreshToken,
};
