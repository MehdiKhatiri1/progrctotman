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
          // Instagram Services
          {
            id: 1,
            platform: "instagram",
            type: "followers",
            quantity: 1000,
            price: "30",
            category: "social",
            description: "1K Instagram Followers"
          },
          {
            id: 2,
            platform: "instagram",
            type: "followers",
            quantity: 3000,
            price: "90",
            category: "social",
            description: "3K Instagram Followers"
          },
          {
            id: 3,
            platform: "instagram",
            type: "followers",
            quantity: 5000,
            price: "130",
            category: "social",
            description: "5K Instagram Followers"
          },
          {
            id: 4,
            platform: "instagram",
            type: "likes",
            quantity: 1000,
            price: "15",
            category: "social",
            description: "1K Instagram Likes"
          },
          // TikTok Services
          {
            id: 5,
            platform: "tiktok",
            type: "followers",
            quantity: 1000,
            price: "30",
            category: "social",
            description: "1K TikTok Followers"
          },
          {
            id: 6,
            platform: "tiktok",
            type: "followers",
            quantity: 3000,
            price: "80",
            category: "social",
            description: "3K TikTok Followers"
          },
          // Facebook Services
          {
            id: 7,
            platform: "facebook",
            type: "followers",
            quantity: 1000,
            price: "30",
            category: "social",
            description: "1K Facebook Followers"
          },
          {
            id: 8,
            platform: "facebook",
            type: "likes",
            quantity: 1000,
            price: "15",
            category: "social",
            description: "1K Facebook Likes"
          },
          // YouTube Services
          {
            id: 9,
            platform: "youtube",
            type: "followers",
            quantity: 1000,
            price: "120",
            category: "social",
            description: "1K YouTube Subscribers"
          },
          {
            id: 10,
            platform: "youtube",
            type: "views",
            quantity: 5000,
            price: "120",
            category: "social",
            description: "5K YouTube Views"
          },
          // Streaming Services
          {
            id: 11,
            platform: "spotify",
            type: "premium",
            quantity: 1,
            price: "29.99",
            category: "streaming",
            description: "Spotify Premium Subscription"
          },
          {
            id: 12,
            platform: "netflix",
            type: "premium",
            quantity: 1,
            price: "39.99",
            category: "streaming",
            description: "Netflix Premium Subscription"
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