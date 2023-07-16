import express from 'express';
import { ReadingListRoutes } from '../app/modules/ReadingList/ReadingList.route';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { BookRoutes } from '../app/modules/book/book.route';
import { ReviewRoutes } from '../app/modules/review/review.route';
import { WishlistRoutes } from '../app/modules/wishlist/wishlist.route';

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
  {
    path: '/wishlist',
    route: WishlistRoutes,
  },
  {
    path: '/readingList',
    route: ReadingListRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
