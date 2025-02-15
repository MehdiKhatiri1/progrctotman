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
      // Social Media Services
      { 
        id: 1, 
        platform: "instagram", 
        type: "Followers", 
        quantity: 1000, 
        price: "30",
        category: "social",
        description: "High-quality Instagram followers" 
      },
      { id: 2, platform: "instagram", type: "Followers", quantity: 3000, price: "90", category: "social", description: "High-quality Instagram followers" },
      { id: 3, platform: "instagram", type: "Likes", quantity: 1000, price: "15", category: "social", description: "High-quality Instagram likes" },
      { id: 4, platform: "instagram", type: "Views", quantity: 5000, price: "20", category: "social", description: "High-quality Instagram views" },
      { id: 5, platform: "tiktok", type: "Followers", quantity: 1000, price: "30", category: "social", description: "High-quality TikTok followers" },
      { id: 6, platform: "tiktok", type: "Likes", quantity: 5000, price: "50", category: "social", description: "High-quality TikTok likes" },
      { id: 7, platform: "tiktok", type: "Views", quantity: 10000, price: "20", category: "social", description: "High-quality TikTok views" },
      { id: 8, platform: "facebook", type: "Followers", quantity: 1000, price: "30", category: "social", description: "High-quality Facebook followers" },
      { id: 9, platform: "facebook", type: "Likes", quantity: 5000, price: "35", category: "social", description: "High-quality Facebook likes" },
      { id: 10, platform: "facebook", type: "Views", quantity: 60000, price: "150", category: "social", description: "High-quality Facebook views" },
      { id: 11, platform: "youtube", type: "Followers", quantity: 1000, price: "120", category: "social", description: "High-quality YouTube followers" },
      { id: 12, platform: "youtube", type: "Likes", quantity: 5000, price: "70", category: "social", description: "High-quality YouTube likes" },
      { id: 13, platform: "youtube", type: "Views", quantity: 10000, price: "230", category: "social", description: "High-quality YouTube views" },

      // Streaming Services
      { 
        id: 14, 
        platform: "spotify", 
        type: "Premium", 
        quantity: 1, 
        price: "40",
        category: "streaming",
        description: "1 Month Spotify Premium Subscription" 
      },
      { 
        id: 15, 
        platform: "spotify", 
        type: "Family", 
        quantity: 6, 
        price: "80",
        category: "streaming",
        description: "1 Month Spotify Family Plan (up to 6 accounts)" 
      },
      { 
        id: 16, 
        platform: "netflix", 
        type: "Standard", 
        quantity: 1, 
        price: "90",
        category: "streaming",
        description: "1 Month Netflix Standard HD Plan" 
      },
      { 
        id: 17, 
        platform: "netflix", 
        type: "Premium", 
        quantity: 1, 
        price: "120",
        category: "streaming",
        description: "1 Month Netflix Premium 4K Plan" 
      },
      { 
        id: 18, 
        platform: "hbo", 
        type: "Standard", 
        quantity: 1, 
        price: "70",
        category: "streaming",
        description: "1 Month HBO Max Subscription" 
      }
    ];
    this.orders = [];
    this.orderItems = [];
    this.currentId = 19;
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