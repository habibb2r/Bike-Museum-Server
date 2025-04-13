import { Request, Response } from "express";
import { Order } from "../Order/order.model";
import { frontendBaseUrl } from "../../utils/baseUrl";


export const successPayment = async (req: Request, res: Response) => {
    await Order.findOneAndUpdate(
      { transactionId: req.params.tran_id },
      { status: 'paid' },
      { new: true },
    );
  
  res.redirect(`${frontendBaseUrl}/products/success-payment/${req.params.tran_id}`) //after successfully payment it will redirect to frontend(local)
  };