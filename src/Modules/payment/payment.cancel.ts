import { Order } from "../Order/order.model";
import { Product } from "../Products/products.model";
import { Request, Response } from "express";

export const cancelPayment = async (req: Request, res: Response) => {
    const updatedOrder = await Order.findOneAndUpdate(
      { transactionId: req.params.tran_id },
      { status: 'cancelled' },
      { new: true },
    );
  
    if (updatedOrder) {
      await Product.findByIdAndUpdate(updatedOrder.product, {
        $inc: { quantity: 1 },
        $set: { inStock: true },
      });
    }
  
if(updatedOrder){
  res.redirect(
    `http://localhost:5173/payment/cancel/${req.params.tran_Id}`,
  );
}
  };
  