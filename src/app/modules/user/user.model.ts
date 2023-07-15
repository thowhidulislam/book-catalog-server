/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, select: 0 },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.statics.isUserExist = async function (email: string) {
  return await User.findOne(
    { email: email },
    { email: 1, password: 1, role: 1, _id: 1 },
  );
};

userSchema.statics.isPasswordMatched = async function (
  currentPassword: string,
  savedPassword: string,
) {
  return await bcrypt.compare(currentPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});
export const User = model<IUser, UserModel>('User', userSchema);
