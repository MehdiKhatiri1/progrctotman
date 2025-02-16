import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import type { Service } from "@shared/schema";
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
import { useLocation } from "wouter";
import React from 'react';

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

export function PlatformTabs({ services, initialPlatform = "all" }: PlatformTabsProps) {
  const [_, setLocation] = useLocation();
  const category = platforms.streaming.includes(initialPlatform) ? "streaming" : "social";

  const handlePlatformChange = (platform: string) => {
    setLocation(`/store/${platform}`);
  };

  const ServiceCard = ({ service }: { service: Service }) => (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        {platformIcons[service.platform as keyof typeof platformIcons] && 
          React.createElement(platformIcons[service.platform as keyof typeof platformIcons], {
            className: "w-6 h-6"
          })
        }
        <h3 className="text-lg font-semibold">{service.description}</h3>
      </div>
      <div className="text-2xl font-bold">${service.price}</div>
      <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition">
        Purchase
      </button>
    </Card>
  );

  const renderPlatformServices = (platform: string) => {
    const platformServices = services.filter(s => s.platform === platform);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platformServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    );
  };

  return (
    <Tabs defaultValue={category} className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="social">Social Media</TabsTrigger>
        <TabsTrigger value="streaming">Streaming</TabsTrigger>
      </TabsList>

      <TabsContent value="social">
        <Tabs 
          defaultValue={initialPlatform} 
          className="w-full"
          onValueChange={handlePlatformChange}
        >
          <TabsList className="grid grid-cols-4 gap-4 mb-6">
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
              {renderPlatformServices(platform)}
            </TabsContent>
          ))}
        </Tabs>
      </TabsContent>

      <TabsContent value="streaming">
        <Tabs 
          defaultValue={initialPlatform} 
          className="w-full"
          onValueChange={handlePlatformChange}
        >
          <TabsList className="grid grid-cols-3 gap-4 mb-6">
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
              {renderPlatformServices(platform)}
            </TabsContent>
          ))}
        </Tabs>
      </TabsContent>
    </Tabs>
  );
}