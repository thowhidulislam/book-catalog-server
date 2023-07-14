import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks();

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'All Books are fetched successfully',
    data: result,
  });
});

export const BookController = {
  getAllBooks,
};
