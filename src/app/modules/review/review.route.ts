import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/:id',
  validateRequest(ReviewValidation.addReviewZodSchema),
  auth(ENUM_USER_ROLE.USER),
  ReviewController.addReview,
);

export const ReviewRoutes = router;
