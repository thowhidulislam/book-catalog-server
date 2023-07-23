import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { WishlistService } from './wishlist.service';

const addBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.body;
  const user = req.user;

  const result = await WishlistService.addBook(user!, bookId);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book is added successfully',
    data: result,
  });
});

const getBooksFromWishlist = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await WishlistService.getBooksFromWishlist(user!);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Books are fetched successfully',
    data: result,
  });
});

const deleteBookFromWishlist = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    const result = await WishlistService.deleteBookFromWishlist(user!, id);

    sendResponse(res, {
      success: true,
      status: httpStatus.OK,
      message: 'Book is removed from the wishlist successfully',
      data: result,
    });
  },
);

export const WishlistController = {
  addBook,
  getBooksFromWishlist,
  deleteBookFromWishlist,
};
