import { useQuery } from "@tanstack/react-query";
import { PlatformTabs } from "@/components/platform-tabs";
import { CartDrawer } from "@/components/cart-drawer";
import { Phone } from "lucide-react";
import type { Service } from "@shared/schema";

export default function Home() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-[200px]"></div>
          <div className="h-4 bg-gray-200 rounded w-[150px]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Social Boost</h1>
          <div className="flex items-center gap-4">
            <a
              href="tel:+212669056627"
              className="flex items-center gap-2 text-sm"
            >
              <Phone className="h-4 w-4" />
              +212 669-056627
            </a>
            <CartDrawer />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Boost Your Social Presence
          </h2>
          <p className="text-muted-foreground">
            Get more followers, likes, and views for your social media accounts
          </p>
        </div>

        {services && <PlatformTabs services={services} />}
      </main>
    </div>
  );
}
