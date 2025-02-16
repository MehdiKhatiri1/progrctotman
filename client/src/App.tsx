import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./lib/cart-context";
import { LanguageProvider } from "./lib/language-context";
import { AuthProvider } from "./hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";

import Landing from "@/pages/landing";
import Store from "@/pages/store";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import Auth from "@/pages/auth";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/store" component={Store} />
      <Route path="/services" component={Services} />
      <Route path="/contact" component={Contact} />
      <Route path="/auth" component={Auth} />

      {/* Platform-specific store routes with query parameters */}
      <Route path="/store/:platform?" component={Store} />

      {/* Catch-all route for 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <Router />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}