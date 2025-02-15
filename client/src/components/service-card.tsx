import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Service } from "@shared/schema";
import { useCart } from "@/lib/cart-context";
import { SiInstagram, SiTiktok, SiFacebook, SiYoutube } from "react-icons/si";

const platformIcons = {
  instagram: SiInstagram,
  tiktok: SiTiktok,
  facebook: SiFacebook,
  youtube: SiYoutube
};

export function ServiceCard({ service }: { service: Service }) {
  const { dispatch } = useCart();
  const Icon = platformIcons[service.platform as keyof typeof platformIcons];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="w-6 h-6" />
          <CardTitle className="text-lg">
            {service.quantity.toLocaleString()} {service.type}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">
          {Number(service.price).toLocaleString()} dh
        </p>
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
  );
}
