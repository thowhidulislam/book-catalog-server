import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

process.on('uncaughtException', error => {
  console.log('Uncaught Exception', error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database is connected successfully.');

    server = app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('Failed to connect to database');
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log('unhandledRejection', error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  if (server) {
    server.close();
  }
});
