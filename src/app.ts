import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './Modules/Products/products.route';
import { OrderRoutes } from './Modules/Order/order.route';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { routeNotFoundHandler } from './middlewares/routeNotFound';
import AuthRouter from './Modules/Auth/auth.route';
const app: Application = express();
import cookieParser from 'cookie-parser';
import UserRouter from './Modules/User/user.route';
<<<<<<< HEAD
import { payementRoutes } from './Modules/payment/payment.routes';
=======
import bodyParser from 'body-parser';
>>>>>>> 47d342e7c05e8623cb795981dfb7827a92bc5d01
//parser

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5000', 'https://bike-museum.vercel.app'],
    credentials: true,
  }),
);
app.use(bodyParser.json());

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/auth', AuthRouter);
app.use('/api/user', UserRouter);
app.use('/api/payment', payementRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use('*', routeNotFoundHandler);

export default app;
