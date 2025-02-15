import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ServicesGrid } from "@/components/services-grid";
import { useLanguage } from "@/lib/language-context";

export function PlatformTabs() {
  const { t } = useLanguage();
  const [platform, setPlatform] = useState("all");

  return (
    <Tabs defaultValue="all" className="w-full" onValueChange={setPlatform}>
      <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
        <TabsTrigger value="all">{t("platforms.all")}</TabsTrigger>
        <TabsTrigger value="social">{t("platforms.social")}</TabsTrigger>
        <TabsTrigger value="streaming">{t("platforms.streaming")}</TabsTrigger>
        <TabsTrigger value="gaming">{t("platforms.gaming")}</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <ServicesGrid filter="all" />
      </TabsContent>
      <TabsContent value="social">
        <ServicesGrid filter="social" />
      </TabsContent>
      <TabsContent value="streaming">
        <ServicesGrid filter="streaming" />
      </TabsContent>
      <TabsContent value="gaming">
        <ServicesGrid filter="gaming" />
      </TabsContent>
    </Tabs>
  );
}