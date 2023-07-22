import { z } from 'zod';

const addBookToWishlistZodSchema = z.object({
  body: z.object({
    bookId: z.string({
      required_error: 'Book Id is required',
    }),
  }),
});

export const WishlistValidation = {
  addBookToWishlistZodSchema,
};
