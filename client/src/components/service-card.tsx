import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Service } from "@shared/schema";
import { useCart } from "@/lib/cart-context";
import { SiInstagram, SiTiktok, SiFacebook, SiYoutube, SiSpotify, SiNetflix, SiHbo } from "react-icons/si";
import { motion } from "framer-motion";

const platformIcons = {
  instagram: SiInstagram,
  tiktok: SiTiktok,
  facebook: SiFacebook,
  youtube: SiYoutube,
  spotify: SiSpotify,
  netflix: SiNetflix,
  hbo: SiHbo
};

export function ServiceCard({ service }: { service: Service }) {
  const { dispatch } = useCart();
  const Icon = platformIcons[service.platform as keyof typeof platformIcons];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="w-full h-full backdrop-blur-sm bg-card/80 border-2 hover:border-primary/50 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-lg">
              {service.quantity.toLocaleString()} {service.type}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-3xl font-bold text-primary">
            {Number(service.price).toLocaleString()} dh
          </p>
          {service.description && (
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full"
            onClick={() => dispatch({ type: "ADD_ITEM", payload: service })}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}