import express from "express"
import { OrderController } from "./order.controller"
import validateRequest from "../../middlewares/validateRequest"
import { OrderValidation } from "./order.validation"

const router = express.Router()

router.post("/create-order", validateRequest(OrderValidation.orderValidationSchema), OrderController.createOrder)
router.get("/", OrderController.getOrders);
router.get("/get-user-order-data/:id", OrderController.getUserOrdersByUserId);
router.delete('/delete-order/:id', OrderController.deleteOrder)
router.get("/revenue", OrderController.getRevenue)

export const OrderRoutes = router