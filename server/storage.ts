import {
  type User,
  type InsertUser,
  type Service,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
  users,
  services,
  orders,
  orderItems,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Service methods
  getServices(): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  createService(service: Service): Promise<Service>;

  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrdersByUserId(userId: number): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | undefined>;

  // Order items methods
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
  getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]>;

  // Session store
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (error) {
      console.error("Error getting user by username:", error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.email, email));
      return user;
    } catch (error) {
      console.error("Error getting user by email:", error);
      throw error;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db.insert(users).values(insertUser).returning();
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    try {
      return await db.select().from(services);
    } catch (error) {
      console.error("Error getting services:", error);
      throw error;
    }
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    try {
      const [service] = await db.select().from(services).where(eq(services.id, id));
      return service;
    } catch (error) {
      console.error("Error getting service by id:", error);
      throw error;
    }
  }

  async createService(service: Service): Promise<Service> {
    try {
      const [createdService] = await db.insert(services).values(service).returning();
      return createdService;
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    try {
      const [order] = await db.insert(orders).values(insertOrder).returning();
      return order;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  async getOrdersByUserId(userId: number): Promise<Order[]> {
    try {
      return await db.select().from(orders).where(eq(orders.userId, userId));
    } catch (error) {
      console.error("Error getting orders by user id:", error);
      throw error;
    }
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    try {
      const [order] = await db.select().from(orders).where(eq(orders.id, id));
      return order;
    } catch (error) {
      console.error("Error getting order by id:", error);
      throw error;
    }
  }

  // Order items methods
  async createOrderItem(insertItem: InsertOrderItem): Promise<OrderItem> {
    try {
      const [item] = await db.insert(orderItems).values(insertItem).returning();
      return item;
    } catch (error) {
      console.error("Error creating order item:", error);
      throw error;
    }
  }

  async getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    try {
      return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
    } catch (error) {
      console.error("Error getting order items:", error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();