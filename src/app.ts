import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './routes';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use('/api/v1', routes);

app.use(globalErrorHandler);

//handle not found routes

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: '',
        message: 'Api Not Found',
      },
    ],
  });
  next();
});

export default app;
