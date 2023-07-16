import { z } from 'zod';

const addReviewZodSchema = z.object({
  body: z.object({
    message: z.string({
      required_error: 'Message is required',
    }),
  }),
});

export const ReviewValidation = {
  addReviewZodSchema,
};
