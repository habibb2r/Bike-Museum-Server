import { z } from 'zod';
import { Request, Response } from 'express';
import SSLCommerzPayment from 'sslcommerz-lts';
import { Product } from '../Products/products.model';
import { createUserModel } from '../User/user.model';
import { backendBaseUrl } from '../../utils/baseUrl';

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false;

const initiatePaymentResponseSchema = z.object({
  GatewayPageURL: z.string().url(),
});

type InitiatePaymentResponse = z.infer<typeof initiatePaymentResponseSchema>;

export const initiatePayment = async (req: Request, res: Response) => {
  const orderData = req.body;
  const orderProduct = await Product.findById(orderData.product);
  const tran_id = orderData.transactionId;
  const currentUser = await createUserModel.findById(orderData.user)
  const name = currentUser?.name
  const email = currentUser?.email

  const data = {
    total_amount: tran_id,
    currency: 'BDT',
    tran_id: tran_id,
    success_url: `${backendBaseUrl}/api/payment/success/${tran_id}`,
    fail_url: `${backendBaseUrl}/api/payment/failed/${tran_id}`,
    cancel_url: `${backendBaseUrl}/api/payment/cancel/${tran_id}`,
    ipn_url: `${backendBaseUrl}/ipn`,
    shipping_method: 'Courier',
    product_name: orderProduct?.name,
    product_category: orderProduct?.category,
    product_profile: 'general',
    cus_name: name,
    cus_email: email,
    cus_add1: orderData.address,
    cus_add2: orderData.address,
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: orderData.phone,
    cus_fax: '01711111111',
    ship_add1: orderData.address,
    ship_name: name,
    ship_city: 'dhaka',
    ship_postcode: '1000',
    ship_country: 'bd',
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  sslcz
    .init(data)
    .then((apiResponse: InitiatePaymentResponse) => {
      const parseResult = initiatePaymentResponseSchema.safeParse(apiResponse);

      if (!parseResult.success) {
        return res.status(500).json({
          message: 'Invalid API response',
          error: parseResult.error.errors,
        });
      }

      const { GatewayPageURL } = parseResult.data;
      res.status(200).json({ url: GatewayPageURL });
    })
    .catch((error: any) => {
      res.status(500).json({ message: 'Payment initiation failed', error });
    });
};
