import { pgTable, text, serial, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(),
  type: text("type").notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price").notNull(),
  category: text("category").notNull().default("social"), // 'social' or 'streaming'
  description: text("description"),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  total: decimal("total").notNull(),
  status: text("status").notNull().default("pending"),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  serviceId: integer("service_id").notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price").notNull(),
});

export const insertServiceSchema = createInsertSchema(services);
export const insertOrderSchema = createInsertSchema(orders);
export const insertOrderItemSchema = createInsertSchema(orderItems);

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;