import { z } from 'zod';

const orderValidationSchema = z.object({
  user: z
    .string({
      required_error: 'User ID is required',
    })
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format')
    .optional(),

  product: z
    .string({
      required_error: 'Product ID is required',
    })
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID format'),

  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),

  totalPrice: z
    .number({
      required_error: 'Total price is required',
      invalid_type_error: 'Total price must be a number',
    })
    .min(0, 'Total price cannot be negative')
    .default(0),

  address: z
    .string({
      required_error: 'Address is required',
    })
    .min(1, 'Address cannot be empty'),

  phone: z
    .number({
      required_error: 'Phone number is required',
      invalid_type_error: 'Phone number must be a number',
    })
    .min(1000000000, 'Phone number must be at least 10 digits')
    .max(9999999999, 'Phone number must not exceed 12 digits'),

  estimatedDeliveryDate: z
    .date({
      required_error: 'Estimated delivery date is required',
    })
    .default(new Date()),
  status: z.enum(['pending', 'paid', 'cancelled']).default('pending'),
  transactionId: z
    .number({
      required_error: 'Transaction ID is required',
    })
});

export const OrderValidation = { orderValidationSchema };
