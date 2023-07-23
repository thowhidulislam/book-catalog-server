import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { WishlistController } from './wishlist.controller';
import { WishlistValidation } from './wishlist.validation';

const router = express.Router();

router.post(
  '/addBook',
  validateRequest(WishlistValidation.addBookToWishlistZodSchema),
  auth(ENUM_USER_ROLE.USER),
  WishlistController.addBook,
);

router.get(
  '/getBooks',
  auth(ENUM_USER_ROLE.USER),
  WishlistController.getBooksFromWishlist,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  WishlistController.deleteBookFromWishlist,
);

export const WishlistRoutes = router;
