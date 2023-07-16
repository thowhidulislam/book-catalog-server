import { Schema, model } from 'mongoose';
import { IWishlist } from './wishlist.interface';

const wishSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const Wishlist = model<IWishlist>('Wishlist', wishSchema);
