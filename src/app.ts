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
import bodyParser from 'body-parser';
<<<<<<< HEAD
import { paymentRoutes } from './Modules/payment/payment.routes';
//parser
=======
>>>>>>> 70f42d4dfe8c610bb8a88cb120409bccb5112c74

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
app.use('/api/payment', paymentRoutes );

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use('*', routeNotFoundHandler);

export default app;
