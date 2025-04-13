import express from "express"
import { OrderController } from "./order.controller"
import validateRequest from "../../middlewares/validateRequest"
import { OrderValidation } from "./order.validation"

const router = express.Router()

router.post("/create-order", validateRequest(OrderValidation.orderValidationSchema), OrderController.createOrder)
router.get("/email/:email", OrderController.getOrdersByEmail)
router.get("/:id", OrderController.getSingleOrder)
router.get("/", OrderController.getOrders)
router.delete('/delete-order/:id', OrderController.deleteOrder);
router.get("/revenue", OrderController.getRevenue)

export const OrderRoutes = router
