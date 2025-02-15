import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ServicesGrid } from "./services-grid";
import type { Service } from "@shared/schema";
import { type TabsProps } from "@/components/ui/tabs";
import { 
  SiInstagram, 
  SiTiktok, 
  SiFacebook, 
  SiYoutube,
  SiSpotify,
  SiNetflix,
  SiHbo
} from "react-icons/si";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";

const useSearchParams = () => {
  const [location] = useLocation();
  return new URLSearchParams(location.search);
};

const platforms = {
  social: ["instagram", "tiktok", "facebook", "youtube"],
  streaming: ["spotify", "netflix", "hbo"]
};

const platformIcons = {
  instagram: SiInstagram,
  tiktok: SiTiktok,
  facebook: SiFacebook,
  youtube: SiYoutube,
  spotify: SiSpotify,
  netflix: SiNetflix,
  hbo: SiHbo
};

interface PlatformTabsProps {
  services: Service[];
  initialPlatform?: string;
}

export function PlatformTabs({ services, initialPlatform = "instagram" }: PlatformTabsProps) {
  const category = platforms.streaming.includes(initialPlatform) ? "streaming" : "social";

  return (
    <Tabs defaultValue={category} className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="social">Social Media</TabsTrigger>
        <TabsTrigger value="streaming">Streaming</TabsTrigger>
      </TabsList>

      <TabsContent value="social">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Tabs defaultValue={initialPlatform} className="w-full">
            <TabsList className="grid grid-cols-4 gap-4">
              {platforms.social.map(platform => {
                const Icon = platformIcons[platform as keyof typeof platformIcons];
                return (
                  <TabsTrigger 
                    key={platform} 
                    value={platform}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-5 h-5" />
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {platforms.social.map(platform => (
              <TabsContent key={platform} value={platform}>
                <ServicesGrid 
                  services={services.filter(s => 
                    s.platform === platform && s.category === "social"
                  )} 
                />
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </TabsContent>

      <TabsContent value="streaming">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Tabs defaultValue={initialPlatform} className="w-full">
            <TabsList className="grid grid-cols-3 gap-4">
              {platforms.streaming.map(platform => {
                const Icon = platformIcons[platform as keyof typeof platformIcons];
                return (
                  <TabsTrigger 
                    key={platform} 
                    value={platform}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-5 h-5" />
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {platforms.streaming.map(platform => (
              <TabsContent key={platform} value={platform}>
                <ServicesGrid 
                  services={services.filter(s => 
                    s.platform === platform && s.category === "streaming"
                  )} 
                />
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
}