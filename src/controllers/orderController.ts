import { type NextFunction, type Request, type Response } from "express";
import * as orderService from "../services/orderService.js";
import { Errors } from "../errors/errors.js";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const orderData = req.body;
    const createdOrder = await orderService.createOrder(orderData);

    return res.status(201).json({
      order: createdOrder,
    });
  } catch (error) {
    next(error);
  }
}

export async function getByCustomerDocument(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { customerDocument } = req.params;

    if (!customerDocument || typeof customerDocument !== "string") {
      throw Errors.INVALID_CUSTOMER_DOCUMENT();
    }

    const orders =
      await orderService.getOrdersByCustomerDocument(customerDocument);

    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      throw Errors.INVALID_ORDER_ID();
    }

    const order = await orderService.getOrderById(id);

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

export async function cancel(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { cancelledBy } = req.body;

    if (!id || typeof id !== "string") {
      throw Errors.INVALID_ORDER_ID();
    }

    const cancelledOrder = await orderService.cancelOrder(id, cancelledBy);

    return res.status(200).json({
      message: "Pedido cancelado com sucesso!",
      order: cancelledOrder,
    });
  } catch (error) {
    next(error);
  }
}
