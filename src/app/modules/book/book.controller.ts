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

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getSingleBook(id);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book is fetched successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const user = req.user;
  const result = await BookService.updateBook(user!, id, updatedData);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book is updated successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const result = await BookService.deleteBook(user!, id);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book is deleted successfully',
    data: result,
  });
});

export const BookController = {
  addBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
