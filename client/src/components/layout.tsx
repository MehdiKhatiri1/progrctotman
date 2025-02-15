import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { CartDrawer } from "./cart-drawer";
import { Phone, Menu, ShoppingCart, Globe, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import {
  SiInstagram,
  SiTiktok,
  SiFacebook,
  SiYoutube,
  SiSpotify,
  SiNetflix,
} from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    category: "Main",
    items: [
      { icon: ShoppingCart, label: "Store", href: "/store" },
      { icon: MessageSquare, label: "Contact", href: "/contact" }
    ]
  },
  {
    category: "Social Media",
    items: [
      { icon: SiInstagram, label: "Instagram", href: "/store?platform=instagram" },
      { icon: SiTiktok, label: "TikTok", href: "/store?platform=tiktok" },
      { icon: SiFacebook, label: "Facebook", href: "/store?platform=facebook" },
      { icon: SiYoutube, label: "YouTube", href: "/store?platform=youtube" },
    ]
  },
  {
    category: "Streaming",
    items: [
      { icon: SiSpotify, label: "Spotify", href: "/store?platform=spotify" },
      { icon: SiNetflix, label: "Netflix", href: "/store?platform=netflix" },
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
  const { language, setLanguage, translations } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // Update document direction based on language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-background/80 backdrop-blur shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </motion.button>

      <div className="flex min-h-screen">
        <AnimatePresence mode="wait">
          {(isMobileMenuOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 border-r bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                "lg:relative lg:translate-x-0",
                language === "ar" ? "right-0 left-auto" : "left-0"
              )}
            >
              <div className="p-6">
                <Link href="/">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="w-8 h-8 text-primary">
                      <ShoppingCart className="w-full h-full" />
                    </div>
                    <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                      Trend Shop
                    </span>
                  </motion.div>
                </Link>
              </div>

              <nav className="px-4 py-2 space-y-6 flex-grow">
                {menuItems.map((category) => (
                  <div key={category.category}>
                    <h3 className="px-4 text-sm font-semibold text-muted-foreground mb-2">
                      {translations?.[category.category.toLowerCase()] ?? category.category}
                    </h3>
                    {category.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = location === item.href;

                      return (
                        <Link key={item.href} href={item.href}>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 rounded-lg mb-1 transition-colors cursor-pointer",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-secondary"
                            )}
                          >
                            <Icon className="w-5 h-5" />
                            <span>{translations?.[item.label.toLowerCase()] ?? item.label}</span>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>

              <div className="p-4">
                <Button
                  className="w-full flex items-center gap-2"
                  variant="outline"
                  asChild
                >
                  <a href="https://wa.me/212669056627" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4" />
                    {translations?.contactSupport ?? "Contact Support"}
                  </a>
                </Button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col">
          <header className="border-b sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                {translations?.[location.substring(1)] ?? "Trend Shop"}
              </h1>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Globe className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setLanguage("en")}>
                      🇺🇸 English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("fr")}>
                      🇫🇷 Français
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("ar")}>
                      🇸🇦 العربية
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <motion.a
                  href="https://wa.me/212669056627"
                  className="hidden md:flex items-center gap-2 text-sm"
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

          <main
            className={cn(
              "flex-1 container mx-auto px-4 py-8",
              language === "ar" ? "rtl" : "ltr"
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}