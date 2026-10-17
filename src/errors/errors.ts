import { AppError } from "./AppError.js";

export const Errors = {
  ORDER_NOT_FOUND: () => new AppError("Pedido não encontrado.", 404),

  ORDER_ALREADY_CANCELLED: () => new AppError("Pedido já cancelado.", 409),

  ORDER_WITHOUT_ITEMS: () =>
    new AppError("O pedido deve conter pelo menos um item.", 400),

  INSUFFICIENT_STOCK: (productId: string) =>
    new AppError(`Estoque insuficiente para o produto: ${productId}`, 409),

  CANCELLED_BY_REQUIRED: () =>
    new AppError("Obrigatória a identificação de quem cancelou.", 400),

  INVALID_CUSTOMER_DOCUMENT: () =>
    new AppError("Documento do cliente inválido ou ausente.", 400),

  INVALID_ORDER_ID: () =>
    new AppError("ID de pedido inválido ou ausente.", 400),
};
