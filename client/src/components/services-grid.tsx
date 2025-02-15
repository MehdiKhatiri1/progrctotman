import { ServiceCard } from "./service-card";
import { Service } from "@shared/schema";

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
