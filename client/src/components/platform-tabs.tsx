import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ServicesGrid } from "./services-grid";
import { Service } from "@shared/schema";
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

export function PlatformTabs({ services }: { services: Service[] }) {
  return (
    <Tabs defaultValue="social" className="w-full">
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
          <Tabs defaultValue="instagram" className="w-full">
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
          <Tabs defaultValue="spotify" className="w-full">
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