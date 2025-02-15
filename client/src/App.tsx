import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { CartProvider } from "./lib/cart-context";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import Landing from "@/pages/landing";
import Store from "@/pages/store";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/store" component={Store} />
      <Route path="/instagram" component={Store} />
      <Route path="/tiktok" component={Store} />
      <Route path="/facebook" component={Store} />
      <Route path="/youtube" component={Store} />
      <Route path="/spotify" component={Store} />
      <Route path="/netflix" component={Store} />
      <Route path="/hbo" component={Store} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  useEffect(() => {
    // Initialize any app-wide effects here
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router />
        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}