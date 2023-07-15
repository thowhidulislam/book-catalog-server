import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { BookRoutes } from '../app/modules/book/book.route';
import { ReviewRoutes } from '../app/modules/review/review.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/book',
    route: BookRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
