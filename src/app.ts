import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './Modules/Products/products.route';
import { OrderRoutes } from './Modules/Order/order.route';
import AuthRouter from './Modules/Auth/auth.route';
const app: Application = express();

//parser

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/auth', AuthRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
