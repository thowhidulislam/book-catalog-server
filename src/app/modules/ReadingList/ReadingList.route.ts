import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReadingListController } from './ReadingList.controller';
import { ReadingListValidation } from './ReadingList.validation';

const router = express.Router();

router.post(
  '/addBook',
  validateRequest(ReadingListValidation.addReadingListZodSchema),
  auth(ENUM_USER_ROLE.USER),
  ReadingListController.addBook,
);

router.get(
  '/getBooks',
  auth(ENUM_USER_ROLE.USER),
  ReadingListController.getBooksFromReadingList,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  ReadingListController.updateBookStatus,
);

export const ReadingListRoutes = router;
