import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/addBook',
  validateRequest(BookValidation.addBookZodSchema),
  auth(ENUM_USER_ROLE.USER),
  BookController.addBook,
);
router.get('/getAllBooks', BookController.getAllBooks);

router.get('/:id', BookController.getSingleBook);
router.patch('/:id', auth(ENUM_USER_ROLE.USER), BookController.updateBook);

export const BookRoutes = router;
