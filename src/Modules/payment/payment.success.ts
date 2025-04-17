import { Request, Response } from 'express';
import { Order } from '../Order/order.model';
import { frontendBaseUrl } from '../../utils/baseUrl';

export const successPayment = async (req: Request, res: Response) => {
  await Order.findOneAndUpdate(
    { transactionId: req.params.tran_id },
    { status: 'paid' },
    { new: true },
  );

  const redirectUrl = `${frontendBaseUrl}/products/success-payment/${req.params.tran_id}`;

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
