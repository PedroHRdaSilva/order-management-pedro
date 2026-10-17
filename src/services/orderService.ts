import type { Order, OrderItem } from "../models/OrderItem.js";
import { Errors } from "../errors/errors.js";
import { formatDocument } from "../util/formatters.js";

const ordersList: (Order & { id: string })[] = [];

function checkStock(productId: string, requestedQuantity: number): boolean {
  const stockAvailable = 100;

  return requestedQuantity <= stockAvailable;
}

export async function createOrder(orderData: {
  customerDocument: string;
  items: OrderItem[];
}) {
  const { customerDocument, items } = orderData;

  const cleanDocument = customerDocument.replace(/\D/g, "");

  if (cleanDocument.length !== 11 && cleanDocument.length !== 14) {
    throw Errors.INVALID_CUSTOMER_DOCUMENT();
  }

  if (!items || items.length === 0) {
    throw Errors.ORDER_WITHOUT_ITEMS();
  }

  for (const item of items) {
    const hasStock = checkStock(item.productId, item.quantity);

    if (!hasStock) {
      throw Errors.INSUFFICIENT_STOCK(item.productId);
    }
  }

  let totalAmount = 0;

  for (const item of items) {
    totalAmount += item.quantity * item.unitPrice;
  }

  const newOrder = {
    id: `order-${Date.now()}`,
    customerDocument: cleanDocument,
    items,
    totalAmount,
    createdAt: new Date(),
  };

  ordersList.push(newOrder);

  return newOrder;
}

export async function getOrdersByCustomerDocument(customerDocument: string) {
  const cleanDocument = customerDocument.replace(/\D/g, "");

  const customerOrders = ordersList.filter(
    (item) => item.customerDocument.replace(/\D/g, "") === cleanDocument,
  );

  if (!customerOrders || customerOrders.length === 0) {
    throw Errors.ORDER_NOT_FOUND();
  }

  customerOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const formattedOrders = customerOrders.map((order) => ({
    ...order,
    customerDocument: formatDocument(order.customerDocument),
  }));

  return formattedOrders;
}

export async function getOrderById(id: string) {
  const order = ordersList.find((item) => item.id === id);

  if (!order) {
    throw Errors.ORDER_NOT_FOUND();
  }

  return {
    ...order,
    customerDocument: formatDocument(order.customerDocument),
  };
}

export async function cancelOrder(id: string, cancelledByUserId: string) {
  if (!cancelledByUserId || cancelledByUserId.trim() === "") {
    throw Errors.CANCELLED_BY_REQUIRED();
  }

  const order = ordersList.find((item) => item.id === id);

  if (!order) {
    throw Errors.ORDER_NOT_FOUND();
  }

  if (order.cancelledAt) {
    throw Errors.ORDER_ALREADY_CANCELLED();
  }

  order.cancelledAt = new Date();
  order.cancelledBy = cancelledByUserId;

  return order;
}
