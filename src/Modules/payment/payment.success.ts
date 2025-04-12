import { Request, Response } from 'express';
import { Order } from '../Order/order.model';

export const successPayment = async (req: Request, res: Response) => {
  const order = await Order.findOneAndUpdate(
    { transactionId: req.params.tran_id },
    { status: 'paid' },
    { new: true },
  );

  if (order) {
    res.redirect(
      `http://localhost:5173/payment/success/${req.params.tran_Id}`,
    );
  }
};
