import { z } from 'zod';

const ProductValidation = z.object({
  name: z
    .string()
    .trim()
    .max(30, 'Product name must be at most 30 characters')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'Product name must be capitalized',
      },
    ),
  brand: z
    .string()
    .trim()
    .max(30, 'Product brand must be at most 30 characters'),
  price: z.number().min(1, 'Product price must be at least 1'),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric']),
  description: z.string(),
  quantity: z.number().min(1, 'Product quantity must be at least 1'),
  inStock: z.boolean().default(true),
  isDeleted: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default ProductValidation;
