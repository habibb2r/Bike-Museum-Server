import { ProductServices } from "../Products/products.service"
import type { TOrder } from "./order.interface"
import { Order } from "./order.model"
import AppError from "../../ErrorHandlers/AppError"
import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"

/**
 * Checks if a product has sufficient stock for an order
 */
const checkStockAvailability = async (productId: string, quantity: number) => {
  const product = await ProductServices.getSingleProduct(productId)

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found")
  }

  if (!product.inStock) {
    throw new AppError(StatusCodes.BAD_REQUEST, `Product "${product.name}" is currently out of stock`)
  }

  if (product.quantity < quantity) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Insufficient stock for "${product.name}". Requested: ${quantity}, Available: ${product.quantity}`,
    )
  }

  return product
}

const createOrderIntoDB = async (orderData: TOrder) => {
  // Start a session for transaction
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const productId = orderData.product.toString()

    // Check stock availability within the transaction
    const product = await checkStockAvailability(productId, orderData.quantity)

    // Calculate total price dynamically based on product price and quantity
    const calculatedTotalPrice = product.price * orderData.quantity

    // Create order with calculated total price
    const orderWithPrice = {
      ...orderData,
      totalPrice: calculatedTotalPrice,
    }

    // Update product quantity atomically within the transaction
    const updateQuantity = product.quantity - orderData.quantity
    const updateData = {
      quantity: updateQuantity,
      inStock: updateQuantity > 0,
    }

    await ProductServices.updateProduct(productId, updateData)

    // Create and save order
    const order = new Order(orderWithPrice)
    const result = await order.save({ session })

    // Commit the transaction
    await session.commitTransaction()
    session.endSession()

    return result
  } catch (error) {
    // If anything fails, abort the transaction
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

const getRevenueFromDB = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $toDouble: "$totalPrice" } },
      },
    },
  ])
  const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0
  return totalRevenue
}

export const OrderServices = {
  createOrderIntoDB,
  getRevenueFromDB,
  checkStockAvailability,
}
