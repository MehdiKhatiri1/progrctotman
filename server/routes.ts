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
            serviceType: "followers",
            quantity: 1000,
            price: "30.00",
            currency: "dh",
            displayNameAr: "المتابعين",
            displayNameEn: "Followers",
            isActive: true
          },
          {
            id: 2,
            platform: "instagram",
            serviceType: "followers",
            quantity: 3000,
            price: "90.00",
            currency: "dh",
            displayNameAr: "المتابعين",
            displayNameEn: "Followers",
            isActive: true
          },
          {
            id: 3,
            platform: "instagram",
            serviceType: "followers",
            quantity: 5000,
            price: "130.00",
            currency: "dh",
            displayNameAr: "المتابعين",
            displayNameEn: "Followers",
            isActive: true
          },
          {
            id: 4,
            platform: "instagram",
            serviceType: "likes",
            quantity: 1000,
            price: "15.00",
            currency: "dh",
            displayNameAr: "الإعجابات",
            displayNameEn: "Likes",
            isActive: true
          },
          // TikTok Services
          {
            id: 5,
            platform: "tiktok",
            serviceType: "followers",
            quantity: 1000,
            price: "30.00",
            currency: "dh",
            displayNameAr: "المتابعين",
            displayNameEn: "Followers",
            isActive: true
          },
          {
            id: 6,
            platform: "tiktok",
            serviceType: "followers",
            quantity: 3000,
            price: "80.00",
            currency: "dh",
            displayNameAr: "المتابعين",
            displayNameEn: "Followers",
            isActive: true
          },
          // Facebook Services
          {
            id: 7,
            platform: "facebook",
            serviceType: "followers",
            quantity: 1000,
            price: "30.00",
            currency: "dh",
            displayNameAr: "المتابعين",
            displayNameEn: "Followers",
            isActive: true
          },
          {
            id: 8,
            platform: "facebook",
            serviceType: "likes",
            quantity: 1000,
            price: "15.00",
            currency: "dh",
            displayNameAr: "الإعجابات",
            displayNameEn: "Likes",
            isActive: true
          },
          // YouTube Services
          {
            id: 9,
            platform: "youtube",
            serviceType: "followers",
            quantity: 1000,
            price: "120.00",
            currency: "dh",
            displayNameAr: "الاشتراكات",
            displayNameEn: "Subscribers",
            isActive: true
          },
          {
            id: 10,
            platform: "youtube",
            serviceType: "views",
            quantity: 5000,
            price: "120.00",
            currency: "dh",
            displayNameAr: "المشاهدات",
            displayNameEn: "Views",
            isActive: true
          },
          // Streaming Services
          {
            id: 11,
            platform: "spotify",
            serviceType: "premium",
            quantity: 1,
            price: "29.99",
            currency: "dh",
            displayNameAr: "اشتراك بريميوم",
            displayNameEn: "Premium Subscription",
            isActive: true
          },
          {
            id: 12,
            platform: "netflix",
            serviceType: "premium",
            quantity: 1,
            price: "39.99",
            currency: "dh",
            displayNameAr: "اشتراك بريميوم",
            displayNameEn: "Premium Subscription",
            isActive: true
          },
          // Add Canva service
          {
            id: 13,
            platform: "canva",
            serviceType: "premium",
            quantity: 1,
            price: "25.99",
            currency: "dh",
            displayNameAr: "اشتراك برو",
            displayNameEn: "Pro Subscription",
            isActive: true
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

  // Services endpoint with error handling and caching
  app.get("/api/services", async (_req, res) => {
    try {
      const services = await storage.getServices();

      // Set cache headers
      res.set('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({
        message: "Failed to fetch services",
        error: process.env.NODE_ENV === "development" ? String(error) : undefined
      });
    }
  });

  // Get service by ID with error handling
  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getServiceById(parseInt(req.params.id));
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      // Set cache headers
      res.set('Cache-Control', 'public, max-age=300');
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Orders endpoint with validation
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

  // Get user orders with authentication check
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