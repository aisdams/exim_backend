require('dotenv').config;
import express, { NextFunction, Request, Response, response } from 'express';
import config from 'config';
import cors from 'cors';
// import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import AppError from './utils/app-error';
import { globalError } from './utils/global-error';

//! auth
import authRouter from './routes/auth/auth.routes';

//! Quotation
import quotationreRouter from './routes/quotation.routes';
// Cost
import costRouter from './routes/cost.routes';
// Customer
import customerRouter from './routes/customer.routes';
// Port
import portRouter from './routes/port.routes';
// Job Order
import jobOrderRouter from './routes/jobOrder.routes';
// JOC
import jocRouter from './routes/joc.routes';
// User
import userRouter from './routes/user.routes';

function buildServer() {
  const app = express();
  //! TEMPLATE ENGINE
  app.set('view engine', 'pug');
  app.set('views', `${__dirname}/views`);
  app.use(express.static('public'));

  //! MIDDLEWARE

  // 1.Body Parser
  app.use(express.json({ limit: '10kb' }));

  // 2. Cookie Parser
  app.use(cookieParser());

  // 3. Cors
  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://127.0.0.1:5173'],
      credentials: true,
    })
  );

  // 4. Logger
  // if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

  //! ROUTES
  //! Master Data
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  //* Quotation
  app.use('/api/quotation', quotationreRouter);
  // Cost
  app.use('/api/cost', costRouter);
  // Customer
  app.use('/api/customer', customerRouter);
  // Port
  app.use('/api/port', portRouter);
  // Job Order
  app.use('/api/jo', jobOrderRouter);
  // JOC
  app.use('/api/joc', jocRouter);

  //! Testing
  app.get('/', (_, res: Response) => {
    res.status(200).json({
      status: 'Success',
      message: 'Welcome to Exim NELLO',
    });
  });

  //! UNHANDLED ROUTES
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
  });

  //! GLOBAL ERROR HANDLER
  app.use(globalError);
  app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  });

  return app;
}

export default buildServer;
