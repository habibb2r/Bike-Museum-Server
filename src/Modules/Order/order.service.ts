import { ProductServices } from '../Products/products.service';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const order = new Order(orderData);
  const productId = order.product;
  const isProductExist =
    await ProductServices.getSpecificProductFromDB(productId);
  if (!isProductExist) {
    throw new Error('Resource not found');
  }
  if (isProductExist.inStock && isProductExist.quantity >= order.quantity) {
    const updateQuantity = isProductExist.quantity - order.quantity;
    const updateData = {
      quantity: updateQuantity,
      inStock: updateQuantity > 0,
    };
    await ProductServices.updateSpecificProductFromDB(productId, updateData);
    const result = await order.save();
    return result;
  } else {
    throw new Error('Insufficient stock');
  }
};

const getRevenueFromDB = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $toDouble: '$totalPrice' } },
      },
    },
  ]);
  const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
  return totalRevenue;
};

export const OrderServices = {
  createOrderIntoDB,
  getRevenueFromDB,
};
