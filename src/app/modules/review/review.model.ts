import { Schema, model } from 'mongoose';
import { IBookReview, ReviewModel } from './review.interface';

const reviewSchema = new Schema<IBookReview, ReviewModel>({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
    required: true,
  },
});

export const Review = model<IBookReview, ReviewModel>('Review', reviewSchema);
