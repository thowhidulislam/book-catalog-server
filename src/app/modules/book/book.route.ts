import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.get('/getAllBooks', BookController.getAllBooks);

export const BookRoutes = router;
