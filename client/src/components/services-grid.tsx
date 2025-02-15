import { ServiceCard } from "./service-card";
import { Service } from "@shared/schema";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6"
    >
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </motion.div>
  );
}