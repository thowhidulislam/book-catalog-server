/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { Book } from '../book/book.model';
import { User } from '../user/user.model';
import { IBookReview } from './review.interface';
import { Review } from './review.model';

const addReview = async (
  user: JwtPayload,
  id: string,
  payload: string,
): Promise<IBookReview> => {
  const isBookExist = await Book.findById(id);

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  //@ts-ignore
  const isUserExist = await User.isUserExist(user.email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const reviewDetails = {
    book: isBookExist._id,
    //@ts-ignore
    user: isUserExist._id,
    message: payload,
  };

  const result = (
    await (await Review.create(reviewDetails)).populate('book')
  ).populate('user');

  return result;
};

export const ReviewService = {
  addReview,
};
