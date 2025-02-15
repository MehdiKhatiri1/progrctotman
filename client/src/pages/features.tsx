import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "High-Quality Social Media Growth",
    description: "Get real, engaged followers that help grow your brand authentically."
  },
  {
    title: "Premium Streaming Services",
    description: "Access top-tier streaming platforms with premium quality content."
  },
  {
    title: "24/7 Customer Support",
    description: "Our dedicated team is always ready to assist you with any questions."
  },
  {
    title: "Secure Payment Methods",
    description: "Multiple secure payment options to choose from for your convenience."
  },
  {
    title: "Instant Delivery",
    description: "Get instant access to your purchased services and start growing."
  },
  {
    title: "Money-Back Guarantee",
    description: "100% satisfaction guaranteed or your money back."
  }
];

export default function Features() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Features
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="p-6 rounded-lg bg-card hover:bg-card/80 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
