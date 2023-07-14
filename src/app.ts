import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './routes';

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use('/api/v1', routes);

app.use(globalErrorHandler);

export default app;
