import {
  type Service,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
} from "@shared/schema";

export interface IStorage {
  getServices(): Promise<Service[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
}

export class MemStorage implements IStorage {
  private services: Service[];
  private orders: Order[];
  private orderItems: OrderItem[];
  private currentId: number;

  constructor() {
    this.services = [
      { id: 1, platform: "instagram", type: "Followers", quantity: 1000, price: "30" },
      { id: 2, platform: "instagram", type: "Followers", quantity: 3000, price: "90" },
      { id: 3, platform: "instagram", type: "Likes", quantity: 1000, price: "15" },
      { id: 4, platform: "instagram", type: "Views", quantity: 5000, price: "20" },
      { id: 5, platform: "tiktok", type: "Followers", quantity: 1000, price: "30" },
      { id: 6, platform: "tiktok", type: "Likes", quantity: 5000, price: "50" },
      { id: 7, platform: "tiktok", type: "Views", quantity: 10000, price: "20" },
      { id: 8, platform: "facebook", type: "Followers", quantity: 1000, price: "30" },
      { id: 9, platform: "facebook", type: "Likes", quantity: 5000, price: "35" },
      { id: 10, platform: "facebook", type: "Views", quantity: 60000, price: "150" },
      { id: 11, platform: "youtube", type: "Followers", quantity: 1000, price: "120" },
      { id: 12, platform: "youtube", type: "Likes", quantity: 5000, price: "70" },
      { id: 13, platform: "youtube", type: "Views", quantity: 10000, price: "230" },
    ];
    this.orders = [];
    this.orderItems = [];
    this.currentId = 1;
  }

  async getServices(): Promise<Service[]> {
    return this.services;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentId++;
    const order: Order = { ...insertOrder, id };
    this.orders.push(order);
    return order;
  }

  async createOrderItem(insertItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.currentId++;
    const item: OrderItem = { ...insertItem, id };
    this.orderItems.push(item);
    return item;
  }
}

export const storage = new MemStorage();
