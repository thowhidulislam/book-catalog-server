import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReadingListService } from './ReadingList.service';

const addBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.body;
  const user = req.user;

  const result = await ReadingListService.addBook(user!, bookId);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book is added successfully',
    data: result,
  });
});

const getBooksFromReadingList = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    const result = await ReadingListService.getBooksFromReadingList(user!);

    sendResponse(res, {
      success: true,
      status: httpStatus.OK,
      message: 'Books are fetched successfully',
      data: result,
    });
  },
);

const updateBookStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  const result = await ReadingListService.updateBookStatus(user!, id);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book status is updated successfully',
    data: result,
  });
});

export const ReadingListController = {
  addBook,
  getBooksFromReadingList,
  updateBookStatus,
};
