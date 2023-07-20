/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { bookSearchableFields } from './book.constant';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';

const addBook = async (
  user: JwtPayload,
  payload: IBook,
): Promise<IBook | null> => {
  const isUserExist = await User.isUserExist(user.email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
  }

  //@ts-ignore
  payload.addedBy = isUserExist._id;

  const result = await (await Book.create(payload)).populate('addedBy');
  return result;
};

const getAllBooks = async (filters: IBookFilters): Promise<IBook[]> => {
  const { searchTerm, publicationDate, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (publicationDate) {
    const [startYear, endYear] = publicationDate.split('-').map(Number);
    andConditions.push({
      publicationDate: {
        $gte: startYear,
        $lte: endYear,
      },
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Book.find(whereConditions);
  return result;
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const isBookExist = await Book.findById(id);

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  const result = await Book.findById(id).populate('addedBy');

  return result;
};

const updateBook = async (
  user: JwtPayload,
  id: string,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  const isBookExist = await Book.findOne({ _id: id }).populate('addedBy');

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  //@ts-ignore
  const isAuthorizedUser = isBookExist.addedBy.email;
  if (user.email !== isAuthorizedUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const result = await Book.findOneAndUpdate(
    { _id: isBookExist._id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

const deleteBook = async (
  user: JwtPayload,
  id: string,
): Promise<IBook | null> => {
  const isBookExist = await Book.findOne({ _id: id }).populate('addedBy');

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  //@ts-ignore
  const isAuthorizedUser = isBookExist.addedBy.email;

  if (user.email !== isAuthorizedUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const result = await Book.findOneAndDelete({ _id: isBookExist._id });

  return result;
};

export const BookService = {
  addBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
