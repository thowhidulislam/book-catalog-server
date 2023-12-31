import { Model, Types } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: string;
  addedBy?: Types.ObjectId;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  publicationDate?: string;
  title?: string;
  author?: string;
  genre?: string;
};
