import { z } from 'zod';

const addReadingListZodSchema = z.object({
  body: z.object({
    book: z.string({
      required_error: 'Book Id is required',
    }),
  }),
});

export const ReadingListValidation = {
  addReadingListZodSchema,
};
