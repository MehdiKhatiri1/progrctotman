import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";

export default function Dashboard() {
  const { data: services } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const totalServices = services?.length || 0;
  const socialMediaServices = services?.filter(s => s.category === "social").length || 0;
  const streamingServices = services?.filter(s => s.category === "streaming").length || 0;

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalServices}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Social Media Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{socialMediaServices}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streaming Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{streamingServices}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
