/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { Book } from '../book/book.model';
import { User } from '../user/user.model';
import { IWishlist } from './wishlist.interface';
import { Wishlist } from './wishlist.model';

const addBook = async (
  user: JwtPayload,
  payload: string,
): Promise<IWishlist | null> => {
  const isBookExist = await Book.findOne({
    _id: payload,
  });

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  const isUserExist = await User.isUserExist(user.email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const wishlistDetails = {
    book: isBookExist._id,
    //@ts-ignore
    user: isUserExist._id,
  };

  const newBook = await Wishlist.create(wishlistDetails);

  const result = await Wishlist.findOne({ _id: newBook._id })
    .populate('book')
    .populate('user');

  return result;
};

const getBooksFromWishlist = async (user: JwtPayload): Promise<IWishlist[]> => {
  const isUserExist = await User.isUserExist(user.email);
  if (!isUserExist) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to perform this action',
    );
  }

  // @ts-ignore
  const isAuthorizedUser = isUserExist._id;

  const result = await Wishlist.find({ user: isAuthorizedUser })
    .populate('book')
    .populate('user');

  return result;
};

export const WishlistService = {
  addBook,
  getBooksFromWishlist,
};
