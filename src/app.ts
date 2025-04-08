import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './Modules/Products/products.route';
import { OrderRoutes } from './Modules/Order/order.route';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { routeNotFoundHandler } from './middlewares/routeNotFound';
const app: Application = express();

//parser

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler)
app.use("*", routeNotFoundHandler)

export default app;
