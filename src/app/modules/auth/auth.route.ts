import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/create-user',
  // validateRequest(AuthValidation.createUserZodSchema),
  AuthController.createUser,
);

export const AuthRoutes = router;
