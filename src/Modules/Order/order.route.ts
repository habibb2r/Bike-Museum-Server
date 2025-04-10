import  { Router } from "express"
import { OrderController } from "./order.controller"

const OrderRoutes = Router()

OrderRoutes.post("/", OrderController.createOrder)
OrderRoutes.get("/revenue", OrderController.getRevenue)

export default OrderRoutes;
