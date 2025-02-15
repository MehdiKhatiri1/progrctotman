import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, X } from "lucide-react";
import { CheckoutForm } from "./checkout-form";

export function CartDrawer() {
  const { state, dispatch } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {state.items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
              {state.items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-200px)] py-4">
          {state.items.map(item => (
            <div
              key={item.service.id}
              className="flex justify-between items-center p-4 border-b"
            >
              <div>
                <p className="font-medium">
                  {item.service.platform} {item.service.type}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} x {Number(item.service.price)} dh
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  dispatch({ type: "REMOVE_ITEM", payload: item.service.id })
                }
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </ScrollArea>
        <div className="mt-4">
          <p className="text-lg font-bold mb-4">
            Total: {state.total.toLocaleString()} dh
          </p>
          {state.items.length > 0 && <CheckoutForm />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
