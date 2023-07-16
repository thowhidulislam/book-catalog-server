import { z } from 'zod';

const addBookToWishlistZodSchema = z.object({
  body: z.object({
    book: z.string({
      required_error: 'Book Id is required',
    }),
  }),
});

export const WishlistValidation = {
  addBookToWishlistZodSchema,
};
