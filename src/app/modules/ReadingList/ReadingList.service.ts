/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { Book } from '../book/book.model';
import { User } from '../user/user.model';
import { IReadingList } from './ReadingList.interface';
import { ReadingList } from './ReadingList.model';

const addBook = async (
  user: JwtPayload,
  payload: string,
): Promise<IReadingList | null> => {
  const isBookExist = await Book.findOne({
    _id: payload,
  });

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  const isUserExist = await User.isUserExist(user.email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Yore are not authorized');
  }
  // @ts-ignore
  const isAuthorizedUser = isUserExist._id;

  const readingListDetails = {
    book: isBookExist._id,
    user: isAuthorizedUser,
  };

  const newBook = await ReadingList.create(readingListDetails);

  const result = await ReadingList.findOne({ _id: newBook._id })
    .populate('book')
    .populate('user');

  return result;
};

const getBooksFromReadingList = async (
  user: JwtPayload,
): Promise<IReadingList[]> => {
  const isUserExist = await User.isUserExist(user.email);
  if (!isUserExist) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to perform this action',
    );
  }

  // @ts-ignore
  const isAuthorizedUser = isUserExist._id;

  const result = await ReadingList.find({ user: isAuthorizedUser })
    .populate('book')
    .populate('user');

  return result;
};

const updateBookStatus = async (
  user: JwtPayload,
  id: string,
): Promise<IReadingList | null> => {
  const isBookExist = await ReadingList.findOne({
    book: id,
  });

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  const isUserExist = await User.isUserExist(user.email);
  if (!isUserExist) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to perform this action',
    );
  }

  if (isBookExist.isReading) {
    isBookExist.isReading = false;
  } else {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Book is already read');
  }

  const updatedBook = await ReadingList.findOneAndUpdate(
    { _id: isBookExist._id },
    isBookExist,
    { new: true },
  );
  const result = await ReadingList.findOne({ _id: updatedBook?._id })
    .populate('book')
    .populate('user');
  return result;
};

export const ReadingListService = {
  addBook,
  getBooksFromReadingList,
  updateBookStatus,
};
