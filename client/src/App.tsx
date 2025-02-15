
import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./lib/cart-context";
import { LanguageProvider } from "./lib/language-context";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
import Landing from "@/pages/landing";
import Store from "@/pages/store";
import Features from "@/pages/features";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/store" component={Store} />
      <Route path="/features" component={Features} />
      <Route path="/services" component={Services} />
      <Route path="/contact" component={Contact} />
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
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CartProvider>
          <Router />
          <Toaster />
        </CartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
