import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertOrderSchema, type Service } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express) {
  // Initialize services with default data if empty
  const initializeServices = async () => {
    try {
      const services = await storage.getServices();
      if (!services || services.length === 0) {
        const initialServices: Service[] = [
          {
            id: 1,
            platform: "instagram",
            type: "followers",
            quantity: 1000,
            price: "9.99",
            category: "social",
            description: "Get 1000 Instagram followers"
          },
          {
            id: 2,
            platform: "tiktok",
            type: "likes",
            quantity: 5000,
            price: "19.99",
            category: "social",
            description: "Get 5000 TikTok likes"
          },
          {
            id: 3,
            platform: "youtube",
            type: "subscribers",
            quantity: 1000,
            price: "24.99",
            category: "social",
            description: "Get 1000 YouTube subscribers"
          },
          {
            id: 4,
            platform: "spotify",
            type: "premium",
            quantity: 1,
            price: "29.99",
            category: "streaming",
            description: "1 Month Spotify Premium"
          },
          {
            id: 5,
            platform: "netflix",
            type: "premium",
            quantity: 1,
            price: "39.99",
            category: "streaming",
            description: "1 Month Netflix Premium"
          }
        ];

        // Insert initial services
        for (const service of initialServices) {
          await storage.createService(service);
        }
        return initialServices;
      }
      return services;
    } catch (error) {
      console.error("Error initializing services:", error);
      throw error;
    }
  };

  // Services endpoint
  app.get("/api/services", async (_req, res) => {
    try {
      const services = await initializeServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ 
        message: "Failed to fetch services",
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  });

  // Get service by ID
  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getServiceById(parseInt(req.params.id));
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Orders endpoint
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid order data",
          errors: error.errors
        });
        return;
      }
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Get user orders
  app.get("/api/orders", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const orders = await storage.getOrdersByUserId(req.user.id);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}