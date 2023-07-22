import { Model } from 'mongoose';

export type IUser = {
  name: string;
  email: string;
  password: string;
  role?: string;
};

export type UserModel = {
  isUserExist: (
    email: string,
  ) => Promise<Pick<IUser, 'email' | 'password' | 'role'>>;
  isPasswordMatched: (
    currentPassword: string,
    savedPassword: string,
  ) => Promise<boolean>;
} & Model<IUser, Record<string, unknown>>;
