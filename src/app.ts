import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './Modules/Products/products.route';
import { OrderRoutes } from './Modules/Order/order.route';
import AuthRouter from './Modules/Auth/auth.route';
const app: Application = express();
import cookieParser from 'cookie-parser'
//parser

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173','http://localhost:5000',], credentials: true }));

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/auth', AuthRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
