import { Model, Types } from 'mongoose';

export type IReadingList = {
  book: Types.ObjectId;
  user?: Types.ObjectId;
  isReading: boolean;
};

export type ReadingListModel = Model<IReadingList, Record<string, unknown>>;
