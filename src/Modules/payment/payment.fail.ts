import { frontendBaseUrl } from '../../utils/baseUrl';
import { Order } from '../Order/order.model';
import { Product } from '../Products/products.model';
import { Request, Response } from 'express';

export const failedPayment = async (req: Request, res: Response) => {
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

  const redirectUrl = `${frontendBaseUrl}/products/failed-payment/${req.params.tran_id}`;

  const html = `
      <html>
        <head>
          <meta http-equiv="refresh" content="0; URL='${redirectUrl}'" />
          <script>window.location.href='${redirectUrl}'</script>
        </head>
        <body>
          Redirecting...
        </body>
      </html>
    `;

  res.status(200).send(html);
};
