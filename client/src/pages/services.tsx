import { Layout } from "@/components/layout";
import { PlatformTabs } from "@/components/platform-tabs";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { motion } from "framer-motion";

export default function Services() {
  const { data: services } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Services
        </motion.h1>
        
        {services && <PlatformTabs services={services} />}
      </div>
    </Layout>
  );
}
