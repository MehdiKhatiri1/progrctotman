import { useQuery } from "@tanstack/react-query";
import { PlatformTabs } from "@/components/platform-tabs";
import type { Service } from "@shared/schema";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
//import { Phone } from "lucide-react"; // Removed import

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

export default function Home() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Boost Your Digital Presence
          </h1>
          <p className="text-xl text-muted-foreground">
            Get more engagement on social media and access to premium streaming services
          </p>
        </motion.div>

        <div className="container flex flex-col items-center justify-center min-h-screen py-12 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="w-full h-full"> {/* Replacement div */}
              <h1>Welcome Home</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Your one-stop shop for digital services
            </p>
          </motion.div>

          <div className="flex gap-4">
            <Button asChild>
              <Link href="/services">
                Browse Services
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">
                {/*<PhoneIcon className="w-4 h-4 mr-2" />  Removed PhoneIcon*/}
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}