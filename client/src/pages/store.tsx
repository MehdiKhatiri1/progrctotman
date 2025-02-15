import { useQuery } from "@tanstack/react-query";
import { PlatformTabs } from "@/components/platform-tabs";
import type { Service } from "@shared/schema";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "wouter";

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-12 w-48 mx-auto" />
        <Skeleton className="h-4 w-64 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4 p-4 border rounded-lg">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Store() {
  const [location] = useLocation();
  const platform = new URLSearchParams(window.location.search).get('platform')?.toLowerCase() || 'instagram';

  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const filteredServices = services?.filter(service => 
    service.platform.toLowerCase() === platform
  );

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Services</h2>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12 container mx-auto px-4 md:px-6 py-8"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            {platform.charAt(0).toUpperCase() + platform.slice(1)} Services
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Select from our premium {platform} services
          </p>
        </motion.div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredServices && filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-lg bg-card hover:bg-card/80 transition-colors border"
              >
                <h3 className="text-xl font-semibold mb-2">{service.type}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">${service.price}</span>
                  <span className="text-sm text-muted-foreground">
                    Quantity: {service.quantity}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services available for {platform}.</p>
          </div>
        )}
      </motion.div>
    </Layout>
  );
}