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
  const platform = location.split('/store/')[1] || 'all';

  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

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
        className="container mx-auto px-4 py-8 space-y-12"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Choose Your Services
          </h1>
          <p className="text-xl text-muted-foreground">
            Select from our wide range of social media and streaming services
          </p>
        </motion.div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : services && services.length > 0 ? (
          <PlatformTabs services={services} initialPlatform={platform} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services available at the moment.</p>
          </div>
        )}
      </motion.div>
    </Layout>
  );
}