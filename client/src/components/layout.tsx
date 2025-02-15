import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { CartDrawer } from "./cart-drawer";
import { Phone } from "lucide-react";
import {
  SiInstagram,
  SiTiktok,
  SiFacebook,
  SiYoutube,
  SiSpotify,
  SiNetflix,
  SiHbo,
} from "react-icons/si";
import { motion } from "framer-motion";

const menuItems = [
  { icon: SiInstagram, label: "Instagram", href: "/category/instagram" },
  { icon: SiTiktok, label: "TikTok", href: "/category/tiktok" },
  { icon: SiFacebook, label: "Facebook", href: "/category/facebook" },
  { icon: SiYoutube, label: "YouTube", href: "/category/youtube" },
  { icon: SiSpotify, label: "Spotify", href: "/category/spotify" },
  { icon: SiNetflix, label: "Netflix", href: "/category/netflix" },
  { icon: SiHbo, label: "HBO", href: "/category/hbo" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 border-r bg-card"
      >
        <div className="p-6">
          <Link href="/">
            <a className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl">SocialBoost</span>
            </a>
          </Link>
        </div>

        <nav className="px-4 py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <a
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg mb-1 transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              </Link>
            );
          })}
        </nav>
      </motion.aside>

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

        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </div>
  );
}
