require('dotenv').config;
import express, { NextFunction, Request, Response, response } from 'express';
import config from 'config';
import cors from 'cors';
// import morgan from 'morgan';
import AppError from './utils/app-error';
import { globalError } from './utils/global-error';

//! Quotation
import quotationreRouter from './routes/quotation.routes';
// Cost
import costRouter from './routes/cost.routes';
// Customer
import customerRouter from './routes/customer.routes';

function buildServer() {
  const app = express();
  //! TEMPLATE ENGINE
  app.set('view engine', 'pug');
  app.set('views', `${__dirname}/views`);
  app.use(express.static('public'));

  //! MIDDLEWARE

  // 1.Body Parser
  app.use(express.json({ limit: '10kb' }));

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
  //* Quotation
  app.use('/api/quotation', quotationreRouter);
  // Cost
  app.use('/api/cost', costRouter);
  app.use('/api/customer', customerRouter);

  //! Testing
  app.get('/', (_, res: Response) => {
    res.status(200).json({
      status: 'Success',
      message: 'Success Welcome Exim Nello',
    });
  });

  //! UNHANDLED ROUTES
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    // next(new AppError(404, `Route ${req.originalUrl} not found`));
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
