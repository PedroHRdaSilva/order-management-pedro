export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  customerDocument: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: Date;
  cancelledAt?: Date;
  cancelledBy?: string;
  deletedAt?: Date;
}
