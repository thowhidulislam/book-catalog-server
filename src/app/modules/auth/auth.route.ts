import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(AuthValidation.createUserZodSchema),
  AuthController.createUser,
);

export const AuthRoutes = router;
