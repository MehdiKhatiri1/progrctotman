import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { CartDrawer } from "./cart-drawer";
import { Phone, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import {
  SiInstagram,
  SiTiktok,
  SiFacebook,
  SiYoutube,
  SiSpotify,
  SiNetflix,
  SiHbo,
} from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { 
    category: "Social Media",
    items: [
      { icon: SiInstagram, label: "Instagram", href: "/" },
      { icon: SiTiktok, label: "TikTok", href: "/tiktok" },
      { icon: SiFacebook, label: "Facebook", href: "/facebook" },
      { icon: SiYoutube, label: "YouTube", href: "/youtube" },
    ]
  },
  {
    category: "Streaming",
    items: [
      { icon: SiSpotify, label: "Spotify", href: "/spotify" },
      { icon: SiNetflix, label: "Netflix", href: "/netflix" },
      { icon: SiHbo, label: "HBO", href: "/hbo" },
    ]
  }
];

const sidebarVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  closed: {
    x: "-100%",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile menu button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-background/80 backdrop-blur shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        <motion.aside
          initial="closed"
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={sidebarVariants}
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 border-r bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            "lg:relative lg:translate-x-0"
          )}
        >
          <div className="p-6">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">S</span>
                </div>
                <span className="font-bold text-xl">SocialBoost</span>
              </motion.div>
            </Link>
          </div>

          <nav className="px-4 py-2 space-y-6">
            {menuItems.map((category) => (
              <div key={category.category}>
                <h3 className="px-4 text-sm font-semibold text-muted-foreground mb-2">
                  {category.category}
                </h3>
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;

                  return (
                    <Link key={item.href} href={item.href}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-lg mb-1 transition-colors cursor-pointer",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-secondary"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </motion.aside>
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1">
        <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Welcome to SocialBoost</h1>
            <div className="flex items-center gap-4">
              <motion.a
                href="tel:+212669056627"
                className="flex items-center gap-2 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="h-4 w-4" />
                +212 669-056627
              </motion.a>
              <CartDrawer />
            </div>
          </div>
        </header>

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}