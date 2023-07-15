import { Model, Types } from 'mongoose';

export type IBookReview = {
  book: Types.ObjectId;
  user: Types.ObjectId;
  message: string;
};

export type ReviewModel = Model<IBookReview, Record<string, unknown>>;
