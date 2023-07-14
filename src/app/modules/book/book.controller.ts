import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.constant';
import { BookService } from './book.service';

const addBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const user = req.user;
  const result = await BookService.addBook(user!, bookData);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book is added successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const result = await BookService.getAllBooks(filters);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'All Books are fetched successfully',
    data: result,
  });
});

export const BookController = {
  addBook,
  getAllBooks,
};
