import { z } from 'zod';

const addBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publicationDate: z.string({
      required_error: 'Publication Date is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
    reviews: z
      .array(
        z.object({
          user: z.string({}),
          message: z.string({}),
        }),
      )
      .optional(),
    addedBy: z.string({
      required_error: 'Added By is required',
    }),
  }),
});

export const BookValidation = {
  addBookZodSchema,
};
