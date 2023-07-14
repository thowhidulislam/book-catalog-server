import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createUser = async (payload: IUser) => {
  const { email } = payload;

  const isExist = await User.findOne({ email: email });

  if (isExist) {
    throw new Error('Email is already exist');
  }

  const result = await User.create(payload);

  return result;
};

export const AuthService = {
  createUser,
};
