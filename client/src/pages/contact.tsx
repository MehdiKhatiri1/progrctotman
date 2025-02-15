import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Contact Us
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.a
            href="https://wa.me/212669056627"
            className="flex flex-col items-center gap-4 p-6 rounded-lg bg-card hover:bg-card/80 transition-colors"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-8 h-8 text-primary" />
            <p className="text-lg">WhatsApp</p>
            <p className="text-muted-foreground">+212 669-056627</p>
          </motion.a>
          
          <motion.a
            href="mailto:contact@trendshop.com"
            className="flex flex-col items-center gap-4 p-6 rounded-lg bg-card hover:bg-card/80 transition-colors"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-8 h-8 text-primary" />
            <p className="text-lg">Email</p>
            <p className="text-muted-foreground">contact@trendshop.com</p>
          </motion.a>
          
          <motion.div
            className="flex flex-col items-center gap-4 p-6 rounded-lg bg-card"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <MapPin className="w-8 h-8 text-primary" />
            <p className="text-lg">Location</p>
            <p className="text-muted-foreground">Morocco</p>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <a href="https://wa.me/212669056627">
              Contact Support
            </a>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
