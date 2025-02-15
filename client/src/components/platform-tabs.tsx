import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ServicesGrid } from "./services-grid";
import { Service } from "@shared/schema";
import { SiInstagram, SiTiktok, SiFacebook, SiYoutube } from "react-icons/si";

export function PlatformTabs({ services }: { services: Service[] }) {
  const platforms = ["instagram", "tiktok", "facebook", "youtube"];

  return (
    <Tabs defaultValue="instagram" className="w-full">
      <TabsList className="grid grid-cols-4 gap-4">
        {platforms.map(platform => (
          <TabsTrigger 
            key={platform} 
            value={platform}
            className="flex items-center gap-2"
          >
            {platform === "instagram" && <SiInstagram />}
            {platform === "tiktok" && <SiTiktok />}
            {platform === "facebook" && <SiFacebook />}
            {platform === "youtube" && <SiYoutube />}
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
      {platforms.map(platform => (
        <TabsContent key={platform} value={platform}>
          <ServicesGrid 
            services={services.filter(s => s.platform === platform)} 
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
