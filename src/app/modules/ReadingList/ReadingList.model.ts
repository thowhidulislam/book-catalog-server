import { Schema, model } from 'mongoose';
import { IReadingList, ReadingListModel } from './ReadingList.interface';

const readingListSchema = new Schema<IReadingList, ReadingListModel>({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isReading: {
    type: Boolean,
    default: false,
  },
});

export const ReadingList = model<IReadingList>(
  'ReadingList',
  readingListSchema,
);
