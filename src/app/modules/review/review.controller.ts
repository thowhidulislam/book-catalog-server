import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';

const addReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { message } = req.body;
  const user = req.user;
  const result = await ReviewService.addReview(user!, id, message);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Review is added successfully',
    data: result,
  });
});

export const ReviewController = {
  addReview,
};
